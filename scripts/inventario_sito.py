#!/usr/bin/env python3
"""Inventario strutturale, senza dipendenze esterne e senza attese numeriche editoriali."""
from __future__ import annotations

import argparse
from collections import Counter
from dataclasses import dataclass, field
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
import sys
from urllib.parse import unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET

BASE = 'https://cpcpcp106-coder.github.io/Per-Me/'
LOCK = 'FONTI/inventario-contenuti.json'
CLINIC = 'FONTI/CENSIMENTO-PATOLOGIE-DIABETE-TIPO-2-2026-10-15.md'
REVIEW = 'verifiche/revisione-normativa-31-guide-2026-10-15.md'
TECHNICAL = {'googled120465f7b693b08.html', 'contatori-personali/index.html',
             'contatori-per-me-41c83f9e6c2a4d08b5f71e236ba0d94c.html', 'monitoraggio/riscontri.html'}
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())


def require(ok, message):
    if not ok:
        raise ValueError(message)


def unique(values, label):
    values = list(values)
    duplicates = sorted(k for k, n in Counter(values).items() if n > 1)
    require(not duplicates, f'{label}: duplicati {duplicates}')
    return values


def same(actual, expected, label):
    a, e = set(unique(actual, label)), set(unique(expected, label + ' (attese)'))
    require(a == e, f'{label}: mancanti {sorted(e-a)}; inattesi {sorted(a-e)}')


@dataclass
class Node:
    tag: str
    attrs: dict = field(default_factory=dict)
    children: list = field(default_factory=list)
    parent: object = None
    order: int = 0
    parts: list = field(default_factory=list)

    def all(self, tag=None, cls=None):
        result = []
        for child in self.children:
            if (tag is None or child.tag == tag) and (cls is None or cls in child.attrs.get('class', '').split()):
                result.append(child)
            result.extend(child.all(tag, cls))
        return result

    def text(self):
        return ' '.join(''.join(self.parts).split())

    def by_id(self, identity):
        nodes = [n for n in self.all() if n.attrs.get('id') == identity]
        require(len(nodes) == 1, f'Identificatore assente o duplicato: {identity}')
        return nodes[0]


class Document(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = Node('document')
        self.stack = [self.root]
        self.serial = 0
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        self.serial += 1
        node = Node(tag, dict(attrs), parent=self.stack[-1], order=self.serial)
        self.stack[-1].children.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                break

    def handle_data(self, data):
        if self.stack[-1].tag not in {'script', 'style'}:
            for node in self.stack:
                node.parts.append(data)


class Source:
    def __init__(self, root, ref=None):
        self.root, self.ref = Path(root).resolve(), ref
        if ref:
            require(re.fullmatch(r'[0-9a-f]{40}', ref), 'Il riferimento base deve essere un SHA completo')
            self.git('cat-file', '-e', ref + '^{commit}')
            self.files = set(self.git('ls-tree', '-rz', '--name-only', ref).split('\0')) - {''}
        else:
            self.files = {p.relative_to(self.root).as_posix() for p in self.root.rglob('*')
                          if p.is_file() and not any(x.startswith('.') or x in {'node_modules', '_site', '__pycache__'}
                                                   for x in p.relative_to(self.root).parts)}

    def git(self, *args):
        result = subprocess.run(['git', '-C', str(self.root), *args], capture_output=True, text=True)
        require(result.returncode == 0, 'Impossibile leggere la base Git: ' + result.stderr.strip())
        return result.stdout

    def read(self, name):
        require(name in self.files, f'File mancante: {name}')
        return self.git('show', f'{self.ref}:{name}') if self.ref else (self.root/name).read_text(encoding='utf-8')

    def json(self, name):
        return json.loads(self.read(name))


def local_path(href, source='index.html'):
    url = urlsplit(urljoin(BASE + source, href))
    if url.scheme != 'https' or url.netloc != urlsplit(BASE).netloc or not url.path.startswith('/Per-Me/'):
        return None
    value = unquote(url.path[len('/Per-Me/'):])
    return value + 'index.html' if not value or value.endswith('/') else value


def collect(source):
    paths = sorted(p for p in source.files if p.endswith(('.html', '.htm')) and p not in TECHNICAL)
    require(paths, 'Inventario delle pagine vuoto')
    docs = {p: Document(source.read(p)).root for p in paths}
    sets = {'pagine': paths}
    catalog = source.json('gradimento-articoli.json')
    unique((r['path'] for r in catalog), 'Catalogo di gradimento')
    for row in catalog:
        require(row['path'] in docs, 'Catalogo: file mancante ' + row['path'])
    rights = docs['agevolazioni-diritti.html'].by_id('contenuto')
    divider = rights.by_id('approfondimenti-locali').order
    cards = rights.all('a', 'a04-guide-card')
    national = [local_path(a.attrs['href'], 'agevolazioni-diritti.html') for a in cards if a.order < divider]
    regional = [local_path(a.attrs['href'], 'agevolazioni-diritti.html') for a in cards if a.order > divider]
    sets['agevolazioni-nazionali'], sets['agevolazioni-regionali'] = national, regional
    for scope, actual in [('nazionale', national), ('regionale', regional)]:
        rows = [dict(r) for r in catalog if (r['category'].startswith('Agevolazioni e diritti') and r['path'] != 'agevolazioni-diritti.html') or 'ambito_agevolazioni' in r or (source.ref and r['path'] in national+regional)]
        # Solo la lettura storica iniziale ammette il catalogo precedente alla migrazione.
        if source.ref:
            for row in rows:
                row.setdefault('ambito_agevolazioni', 'regionale' if row['path'] in regional else 'nazionale')
        require(all(r.get('ambito_agevolazioni') in {'nazionale', 'regionale'} for r in rows), 'Catalogo Agevolazioni: dichiarare ambito nazionale o regionale')
        same(actual, [r['path'] for r in rows if r['ambito_agevolazioni'] == scope], 'Agevolazioni ' + scope)
        require(actual, 'Gruppo Agevolazioni vuoto: ' + scope)

    for family, hub in [('diabete', 'diabete-tipo-2.html'), ('dieta', 'dieta-mediterranea-scientifica.html'), ('debiti', 'debiti-cartelle.html')]:
        pattern = re.compile(rf'^{family}-guida-(\d+)-[^/]+\.html$')
        files = sorted((p for p in docs if pattern.fullmatch(p)), key=lambda p: int(pattern.fullmatch(p)[1]))
        require(files, 'Serie vuota: ' + family)
        numbers = [int(pattern.fullmatch(p)[1]) for p in files]
        require(numbers == list(range(1, len(files)+1)), 'Numerazione non continua o duplicata: ' + family)
        container = docs[hub].by_id('contenuto')
        if family == 'debiti':
            linked = [local_path(n.attrs.get('href', ''), hub) for n in container.all('a', 'debt-guide-card')]
        else:
            linked = []
            for li in container.all('li'):
                first = next((n for n in li.children if n.tag == 'strong'), None)
                if not first or not re.fullmatch(r'Guida \d+:?', first.text()):
                    continue
                found = [local_path(n.attrs.get('href', ''), hub) for n in li.all('a')]
                found = [p for p in found if p and pattern.fullmatch(p)]
                require(len(found) == 1, f'{hub}: ogni voce deve collegare una guida della serie')
                require(int(re.search(r'\d+', first.text())[0]) == int(pattern.fullmatch(found[0])[1]), f'{hub}: numero e destinazione discordanti')
                linked.extend(found)
        same(linked, files, 'Indice ' + family)
        require(linked == files, 'Ordine delle guide errato: ' + family)
        sets[family] = files

    clinic_raw = source.read(CLINIC).split('## Revisioni critiche finali')[0]
    clinic = re.findall(r'^(\d+)\. (.+)$', clinic_raw, re.M)
    require([int(n) for n, _ in clinic] == list(range(1, len(clinic)+1)) and clinic, 'Censimento: numerazione non continua')
    sets['clinica'] = [re.sub(r'\*\*', '', body).split(':')[0].strip() for _, body in clinic]

    for file, doc in docs.items():
        prompts = [n for n in doc.all('blockquote') if n.attrs.get('id', '').startswith('prompt-')]
        if not prompts:
            continue
        ids = [n.attrs['id'] for n in prompts]
        same((n.attrs['data-copy'] for n in doc.all('button') if 'data-copy' in n.attrs), ids, 'Prompt/pulsanti ' + file)
        sets['prompt:' + file] = ids
        if file == 'tutor-ai.html':
            for detail in doc.by_id('mese').all('details'):
                identity = detail.attrs.get('id', '')
                if identity.startswith('settimana-') or identity == 'fine-mese':
                    sets['mese:' + identity] = [p.attrs['id'] for p in detail.all('blockquote') if p.attrs.get('id', '').startswith('prompt-')]
            sets['tutor-base'] = [p.attrs['id'] for p in doc.by_id('richieste-base').all('blockquote') if p.attrs.get('id', '').startswith('prompt-')]
            sets['autoverifiche-tutor'] = [n.all('summary')[0].text() for n in doc.by_id('verifica-apprendimento').all('details')]

    data = source.json('dati/ricette-mediterranee.json')
    sets['ricette'] = [r['id'] for r in data['ricette']]
    sets['settimane-menu'] = [w['id'] for w in data['settimane']]
    actual_archives = [p + '#' + n.attrs['id'] for p, doc in docs.items() for n in doc.all('section', 'ricetta-archivio')]
    same(actual_archives, [r['path'] for r in data['ricette'] if '#' in r['path']], 'Ricette nelle raccolte')
    same([p for p in docs if re.fullmatch(r'ricetta-[^/]+\.html', p)], [r['path'] for r in data['ricette'] if '#' not in r['path']], 'Ricette su pagina singola')
    for recipe in data['ricette']:
        file, _, anchor = recipe['path'].partition('#')
        require(file in docs, 'Ricetta senza pagina: ' + recipe['id'])
        if anchor:
            docs[file].by_id(anchor)
    require(data['settimane'], 'Nessun menù di esempio')

    review = re.findall(r'^\|\s*(\d+)\s*\|\s*([^|]+\.html)\s*\|', source.read(REVIEW), re.M)
    require(review and [int(n) for n, _ in review] == list(range(1, len(review)+1)), 'Registro normativo: righe mancanti o fuori ordine')
    sets['registro-normativo'] = [p.strip() for _, p in review]
    for file in sets['registro-normativo']:
        require(file in docs, 'Registro normativo: guida mancante ' + file)

    basket = source.json('FONTI/paniere-mediterraneo-2026-11-20.json')
    used = set(basket['colazione_quotidiana']) | set(basket['spuntini_quotidiani'])
    for day in basket['settimana']:
        for slot in ['pranzo', 'cena']:
            used.update(day[slot]['ingredienti'])
    same([r['id'] for r in basket['prodotti']], used, 'Ingredienti/paniere')
    sets['prodotti-paniere'] = [r['id'] for r in basket['prodotti']]

    sets['lievito'] = [local_path(n.attrs['href'], 'lievito-madre.html') for card in docs['lievito-madre.html'].all('section', 'guide-card') for h in card.all('h2') for n in h.all('a')]
    sets['pensionati-estero'] = sorted(p for p in docs if re.fullmatch(r'pensionati-estero(?:-[^/]+)?\.html', p))
    sets['guide-pratiche'] = sorted(p for p, doc in docs.items() if p.startswith(('lavoro-guida-', 'salute-guida-')) and doc.all('details', 'indice-guida'))
    for label, values in sets.items():
        unique(values, label)
        require(values, 'Insieme vuoto: ' + label)
    return {'insiemi': sets,
            'titoli': {p: (doc.all('h1')[0].text() if doc.all('h1') else p) for p, doc in docs.items()},
            'collegamentiMain': {p: [a.attrs.get('href', '') for main in doc.all('main') for a in main.all('a')] for p, doc in docs.items()},
            'ricettePerGruppo': {group: [r['id'] for r in data['ricette'] if r['gruppo'] == group] for group in sorted({r['gruppo'] for r in data['ricette']})}}, docs


def assert_retained(current, previous):
    """Le aggiunte sono libere; una sottrazione non si giustifica con un totale uguale."""
    for label, identities in previous['insiemi'].items():
        missing = set(identities) - set(current['insiemi'].get(label, []))
        require(not missing, f'Contenuti rimossi da {label}: {sorted(missing)}')


def validate(source, previous=None):
    current, docs = collect(source)
    lock = source.json(LOCK)
    require(lock.get('versione') == 1 and lock.get('insiemi', {}).get('pagine'), 'Inventario di conservazione assente o non valido')
    assert_retained(current, lock)
    if previous:
        assert_retained(current, previous)
    sm = ET.fromstring(source.read('sitemap.xml'))
    urls = [el.text for el in sm.iter() if el.tag.rsplit('}', 1)[-1] == 'loc']
    require(all(u and u.startswith(BASE) and not urlsplit(u).query and not urlsplit(u).fragment for u in urls), 'Sitemap: URL esterno o non valido')
    same([local_path(u) for u in urls], current['insiemi']['pagine'], 'Sitemap/pagine')
    reachable, pending = {'index.html'}, ['index.html']
    while pending:
        file = pending.pop()
        for anchor in docs[file].all('a'):
            target = local_path(anchor.attrs.get('href', ''), file)
            if target in docs and target not in reachable:
                reachable.add(target)
                pending.append(target)
    require(reachable == set(docs), 'Pagine non raggiungibili dalla home: ' + str(sorted(set(docs)-reachable)))
    sets = current['insiemi']
    home = docs['index.html']
    for hub, expected, expression in [
        ('agevolazioni-diritti.html', len(sets['agevolazioni-nazionali'])+len(sets['agevolazioni-regionali']), r'(\d+) risorse disponibili'),
        ('diabete-tipo-2.html', len(sets['diabete']), r'(\d+) guide'),
        ('dieta-mediterranea-scientifica.html', len(sets['dieta']), r'(\d+) guide di approfondimento'),
    ]:
        cards = [n for n in home.all('article', 'card') if any(local_path(a.attrs.get('href', '')) == hub for a in n.all('a'))]
        require(len(cards) == 1, 'Scheda homepage assente o duplicata: ' + hub)
        values = re.findall(expression, cards[0].text())
        require(len(values) == 1 and int(values[0]) == expected, f'Homepage {hub}: atteso {expected}; trovato {values}')
    recipe_links = [n for n in home.all('a') if local_path(n.attrs.get('href', '')) == 'dieta-mediterranea-ricette.html' and re.fullmatch(r'\d+ ricette', n.text())]
    require(len(recipe_links) == 1 and recipe_links[0].text() == f"{len(sets['ricette'])} ricette", 'Homepage: numero di ricette non coerente')
    require(f"{len(sets['clinica'])} condizioni" in docs['diabete-tipo-2.html'].text(), 'Rubrica diabete: totale del censimento non coerente')
    return current


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--json', action='store_true')
    parser.add_argument('--base-ref', help='SHA Git completo della base fidata, obbligatorio in CI')
    args = parser.parse_args()
    try:
        source = Source(args.root)
        previous = collect(Source(args.root, args.base_ref))[0] if args.base_ref else None
        result = validate(source, previous)
        print(json.dumps(result if args.json else {key: len(value) for key, value in result['insiemi'].items()}, ensure_ascii=False, indent=2))
    except (ValueError, KeyError, OSError, ET.ParseError) as exc:
        print('FAIL inventario: ' + str(exc), file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
