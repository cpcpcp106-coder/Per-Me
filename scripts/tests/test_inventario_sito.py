"""Mutazioni indipendenti: nessuna modifica ai file del sito sottoposto a prova."""
import copy
import importlib.util
import json
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('inventario_sito', ROOT/'scripts/inventario_sito.py')
inventory = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = inventory
spec.loader.exec_module(inventory)


class MemorySource:
    ref = None

    def __init__(self, texts):
        self.texts = dict(texts)
        self.files = set(texts)

    def read(self, path):
        inventory.require(path in self.files, 'File mancante: ' + path)
        return self.texts[path]

    def json(self, path):
        return json.loads(self.read(path))

    def write(self, path, content):
        self.files.add(path)
        self.texts[path] = content

    def put_json(self, path, content):
        self.write(path, json.dumps(content, ensure_ascii=False))

    def remove(self, path):
        self.files.remove(path)


class InventoryTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        source = inventory.Source(ROOT)
        required = {p for p in source.files if p.endswith(('.html', '.htm'))}
        required.update(['gradimento-articoli.json', 'sitemap.xml', inventory.LOCK, inventory.CLINIC,
                         inventory.REVIEW, 'dati/ricette-mediterranee.json', 'FONTI/paniere-mediterraneo-2026-11-20.json'])
        cls.original = {p: source.read(p) for p in required}
        cls.previous = inventory.collect(MemorySource(cls.original))[0]

    def setUp(self):
        self.source = MemorySource(self.original)

    def valid(self):
        return inventory.validate(self.source)

    def fails(self, expression, previous=None):
        with self.assertRaisesRegex(ValueError, expression):
            inventory.validate(self.source, previous)

    def add_guide(self, name='nuova-misura-2027.html', scope='nazionale'):
        self.source.write(name, '<!doctype html><html lang="it"><head><meta name="robots" content="index,follow">'
                          f'<link rel="canonical" href="{inventory.BASE}{name}"></head><body><main><h1>Nuova misura</h1>'
                          '<a href="agevolazioni-diritti.html">Torna alle guide</a></main></body></html>')
        card = f'<a href=\'{name}\' data-test="x > y" class=\'extra a04-guide-card\'><strong>Nuova misura</strong></a>'
        hub = self.source.read('agevolazioni-diritti.html')
        if scope == 'nazionale':
            hub = hub.replace('<div class="a04-guides">', '<div class="a04-guides">'+card, 1)
        else:
            pos = hub.index('id="approfondimenti-locali"')
            hub = hub[:pos]+hub[pos:].replace('<div class="a04-guides">', '<div class="a04-guides">'+card, 1)
        self.source.write('agevolazioni-diritti.html', hub)
        catalog = self.source.json('gradimento-articoli.json')
        catalog.append({'path': name, 'title': 'Nuova misura', 'category': 'Agevolazioni e diritti', 'ambito_agevolazioni': scope})
        self.source.put_json('gradimento-articoli.json', catalog)
        sm = self.source.read('sitemap.xml').replace('</urlset>', f'<url><loc>{inventory.BASE}{name}</loc></url></urlset>')
        self.source.write('sitemap.xml', sm)
        old = len(self.previous['insiemi']['agevolazioni-nazionali'])+len(self.previous['insiemi']['agevolazioni-regionali'])
        self.source.write('index.html', self.source.read('index.html').replace(f'{old} risorse disponibili', f'{old+1} risorse disponibili'))
        return name

    def remove_everywhere(self, name):
        self.source.remove(name)
        self.source.put_json('gradimento-articoli.json', [r for r in self.source.json('gradimento-articoli.json') if r['path'] != name])
        for path in list(self.source.files):
            if path.endswith('.html'):
                self.source.write(path, re.sub(r'<a\b[^>]*\bhref=["\']'+re.escape(name)+r'(?:#[^"\']*)?["\'][^>]*>[\s\S]*?</a>', '', self.source.read(path)))
        self.source.write('sitemap.xml', re.sub(r'<url>\s*<loc>'+re.escape(inventory.BASE+name)+r'</loc>[\s\S]*?</url>', '', self.source.read('sitemap.xml')))
        old = len(self.previous['insiemi']['agevolazioni-nazionali'])+len(self.previous['insiemi']['agevolazioni-regionali'])
        self.source.write('index.html', self.source.read('index.html').replace(f'{old} risorse disponibili', f'{old-1} risorse disponibili'))

    def test_current_site_is_complete(self):
        self.assertEqual(self.valid()['insiemi'], self.previous['insiemi'])

    def test_add_national_guide_without_changing_audit_code(self):
        name = self.add_guide()
        result = self.valid()['insiemi']
        self.assertIn(name, result['agevolazioni-nazionali'])
        self.assertEqual(len(result['agevolazioni-nazionali']), len(self.previous['insiemi']['agevolazioni-nazionali'])+1)

    def test_add_regional_guide(self):
        name = self.add_guide(scope='regionale')
        self.assertIn(name, self.valid()['insiemi']['agevolazioni-regionali'])

    def test_card_attribute_order_single_quotes_extra_class_and_comments(self):
        name = self.add_guide()
        self.source.write('agevolazioni-diritti.html', self.source.read('agevolazioni-diritti.html').replace('</main>', '<!-- <a class="a04-guide-card" href="fake.html">fake</a> --></main>'))
        self.assertIn(name, self.valid()['insiemi']['agevolazioni-nazionali'])

    def test_missing_file_is_detected(self):
        self.source.remove('bonus-mamme-2026-domanda-requisiti.html')
        self.fails('file mancante')

    def test_coordinated_removal_still_fails(self):
        self.remove_everywhere('bonus-mamme-2026-domanda-requisiti.html')
        self.fails('Contenuti rimossi')

    def test_same_total_does_not_hide_replacement(self):
        self.remove_everywhere('bonus-mamme-2026-domanda-requisiti.html')
        self.add_guide()
        old = len(self.previous['insiemi']['agevolazioni-nazionali'])+len(self.previous['insiemi']['agevolazioni-regionali'])
        self.source.write('index.html', self.source.read('index.html').replace(f'{old-1} risorse disponibili', f'{old} risorse disponibili'))
        self.fails('Contenuti rimossi')

    def test_guide_added_after_lock_is_protected_by_base(self):
        name = self.add_guide()
        previous = inventory.collect(self.source)[0]
        self.source = MemorySource(self.original)
        self.fails(re.escape(name), previous)

    def test_modified_lock_cannot_hide_removal_from_base(self):
        name = 'bonus-mamme-2026-domanda-requisiti.html'
        self.remove_everywhere(name)
        current, _ = inventory.collect(self.source)
        lock = self.source.json(inventory.LOCK)
        lock['insiemi'] = current['insiemi']
        self.source.put_json(inventory.LOCK, lock)
        self.fails('Contenuti rimossi', self.previous)

    def test_empty_lock_is_rejected(self):
        self.source.put_json(inventory.LOCK, {'versione': 1, 'insiemi': {}})
        self.fails('non valido')

    def test_duplicate_card_is_rejected(self):
        hub = self.source.read('agevolazioni-diritti.html')
        card = re.search(r'<a class="a04-guide-card"[\s\S]*?</a>', hub)[0]
        self.source.write('agevolazioni-diritti.html', hub.replace(card, card+card, 1))
        self.fails('duplicati')

    def test_catalog_duplicate_is_rejected(self):
        catalog = self.source.json('gradimento-articoli.json')
        self.source.put_json('gradimento-articoli.json', catalog+[catalog[0]])
        self.fails('duplicati')

    def test_missing_card_is_rejected(self):
        hub = re.sub(r'<a class="a04-guide-card"[\s\S]*?</a>', '', self.source.read('agevolazioni-diritti.html'), count=1)
        self.source.write('agevolazioni-diritti.html', hub)
        self.fails('mancanti')

    def test_missing_scope_is_rejected(self):
        catalog = self.source.json('gradimento-articoli.json')
        next(r for r in catalog if 'ambito_agevolazioni' in r).pop('ambito_agevolazioni')
        self.source.put_json('gradimento-articoli.json', catalog)
        self.fails('dichiarare ambito')

    def test_wrong_scope_is_rejected(self):
        catalog = self.source.json('gradimento-articoli.json')
        row = next(r for r in catalog if r.get('ambito_agevolazioni') == 'regionale')
        row['ambito_agevolazioni'] = 'nazionale'
        self.source.put_json('gradimento-articoli.json', catalog)
        self.fails('Agevolazioni nazionale')

    def test_home_count_is_scoped_to_its_card(self):
        home = self.source.read('index.html')
        n = len(self.previous['insiemi']['agevolazioni-nazionali'])+len(self.previous['insiemi']['agevolazioni-regionali'])
        self.source.write('index.html', home.replace(f'{n} risorse disponibili', f'{n+1} risorse disponibili')+f'<p>{n} risorse disponibili</p>')
        self.fails('Homepage agevolazioni')

    def test_duplicate_sitemap_url_is_rejected(self):
        sm = self.source.read('sitemap.xml')
        url = re.search(r'<url>[\s\S]*?</url>', sm)[0]
        self.source.write('sitemap.xml', sm.replace('</urlset>', url+'</urlset>'))
        self.fails('duplicati')

    def test_sitemap_removal_is_rejected(self):
        sm = re.sub(r'<url>[\s\S]*?</url>', '', self.source.read('sitemap.xml'), count=1)
        self.source.write('sitemap.xml', sm)
        self.fails('Sitemap/pagine')

    def test_deleted_interior_series_file_is_rejected(self):
        self.source.remove(self.previous['insiemi']['diabete'][1])
        self.fails('file mancante|Numerazione')

    def test_numbered_link_destination_must_match(self):
        file = self.previous['insiemi']['dieta'][0]
        self.source.write('dieta-mediterranea-scientifica.html', self.source.read('dieta-mediterranea-scientifica.html').replace(file, self.previous['insiemi']['dieta'][1]))
        self.fails('numero e destinazione')

    def test_clinical_last_item_cannot_disappear(self):
        raw = self.source.read(inventory.CLINIC)
        n = len(self.previous['insiemi']['clinica'])
        self.source.write(inventory.CLINIC, re.sub(r'^'+str(n)+r'\. .+\n', '', raw, flags=re.M))
        self.source.write('diabete-tipo-2.html', self.source.read('diabete-tipo-2.html').replace(f'{n} condizioni', f'{n-1} condizioni'))
        self.fails('Contenuti rimossi da clinica')

    def test_prompt_and_its_button_cannot_disappear_together(self):
        html = self.source.read('tutor-ai-conversazione-correzioni.html')
        identity = self.previous['insiemi']['prompt:tutor-ai-conversazione-correzioni.html'][-1]
        html = re.sub(r'<blockquote id="'+identity+r'"[\s\S]*?</blockquote>', '', html)
        html = re.sub(r'<button\b[^>]*data-copy="'+identity+r'"[^>]*>[\s\S]*?</button>', '', html)
        self.source.write('tutor-ai-conversazione-correzioni.html', html)
        self.fails('Contenuti rimossi da prompt:')

    def test_prompt_without_copy_button_is_rejected(self):
        html = self.source.read('tutor-ai.html')
        self.source.write('tutor-ai.html', re.sub(r'<button\b[^>]*data-copy="[^"]+"[^>]*>[\s\S]*?</button>', '', html, count=1))
        self.fails('Prompt/pulsanti')

    def test_archive_recipe_missing_from_data_is_rejected(self):
        data = self.source.json('dati/ricette-mediterranee.json')
        data['ricette'] = [r for r in data['ricette'] if r['id'] != next(r['id'] for r in data['ricette'] if '#' in r['path'])]
        self.source.put_json('dati/ricette-mediterranee.json', data)
        self.fails('Ricette nelle raccolte')

    def test_duplicate_recipe_id_is_rejected(self):
        data = self.source.json('dati/ricette-mediterranee.json')
        data['ricette'][1]['id'] = data['ricette'][0]['id']
        self.source.put_json('dati/ricette-mediterranee.json', data)
        self.fails('ricette: duplicati')

    def test_example_week_cannot_disappear(self):
        data = self.source.json('dati/ricette-mediterranee.json')
        data['settimane'].pop()
        self.source.put_json('dati/ricette-mediterranee.json', data)
        self.fails('Contenuti rimossi da settimane-menu')

    def test_historical_review_row_cannot_disappear(self):
        raw = self.source.read(inventory.REVIEW)
        last = len(self.previous['insiemi']['registro-normativo'])
        self.source.write(inventory.REVIEW, re.sub(r'^\|\s*'+str(last)+r'\s*\|.+\n', '', raw, flags=re.M))
        self.fails('Contenuti rimossi da registro-normativo')

    def test_basket_checks_ingredient_identities(self):
        basket = self.source.json('FONTI/paniere-mediterraneo-2026-11-20.json')
        basket['prodotti'][0]['id'] = 'prodotto-estraneo'
        self.source.put_json('FONTI/paniere-mediterraneo-2026-11-20.json', basket)
        self.fails('Ingredienti/paniere')

    def test_missing_git_history_fails_closed(self):
        with tempfile.TemporaryDirectory() as folder:
            with self.assertRaisesRegex(ValueError, 'Impossibile leggere la base Git'):
                inventory.Source(folder, 'f'*40)

    def test_git_base_is_read_independently_of_current_lock(self):
        with tempfile.TemporaryDirectory() as folder:
            repo = Path(folder)
            for name, text in self.original.items():
                file = repo/name
                file.parent.mkdir(parents=True, exist_ok=True)
                if name == 'gradimento-articoli.json':
                    rows = json.loads(text)
                    for row in rows:
                        row.pop('ambito_agevolazioni', None)
                    text = json.dumps(rows)
                file.write_text(text)
            def git(*args):
                result = subprocess.run(['git', '-C', folder, *args], text=True, capture_output=True, check=True)
                return result.stdout.strip()
            git('init', '-q')
            git('add', '.')
            git('-c', 'user.name=Inventory Test', '-c', 'user.email=test@example.invalid', 'commit', '-qm', 'fixture')
            sha = git('rev-parse', 'HEAD')
            previous = inventory.collect(inventory.Source(repo, sha))[0]
            self.assertEqual(previous['insiemi'], self.previous['insiemi'])
            self.remove_everywhere('bonus-mamme-2026-domanda-requisiti.html')
            self.fails('Contenuti rimossi', previous)


if __name__ == '__main__':
    unittest.main()
