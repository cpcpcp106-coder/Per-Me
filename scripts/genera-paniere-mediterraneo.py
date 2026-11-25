"""Rigenera il solo riquadro del paniere dalla rilevazione documentata in FONTI."""
from pathlib import Path
import html
import json

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'FONTI/paniere-mediterraneo-2026-11-20.json'
PAGE = ROOT / 'dieta-guida-08-ricette-mediterranee-economiche-valori.html'
data = json.loads(SOURCE.read_text())
products = {p['id']: p for p in data['prodotti']}
esc = html.escape

def euro(value):
    return str(value).replace('.', ',') + ' €'

def quantity(key, value):
    p = products[key]
    unit = 'scatole' if key == 'sgombro' else p['unita']
    return f"{p['nome']}: {value} {unit}"

def ingredients(items, omit=()):
    return '; '.join(quantity(k, v) for k, v in items.items() if k not in omit)

parts = ['''<section id="spesa-settimana-documentata" aria-labelledby="paniere-titolo">
<h2 id="paniere-titolo">Una settimana per due persone: menu, prodotti e prezzi documentati</h2>
<p>Qui puoi seguire il percorso completo dal menu alla lista e al calcolo delle confezioni. È un <strong>esempio per organizzare gli acquisti</strong>: ogni ingrediente elencato nei pasti è contato nella spesa. Le quantità sono complessive per due adulti, non per una persona.</p>
<div class="important"><strong>Prima adatta i pasti, poi calcola la spesa.</strong><p>Questo esempio non è un piano alimentare validato: non abbiamo verificato i fabbisogni individuali né calcolato calorie e nutrienti dell’intera settimana. Per diabete, terapie o altre esigenze cliniche usa le quantità concordate con il professionista. I valori delle due ricette precedenti non si applicano a questo menu.</p></div>
<p>La scelta di cereali integrali, legumi, ortaggi, frutta, olio extravergine e fonti proteiche alternate si ispira alle indicazioni generali del <a href="https://www.salute.gov.it/new/it/tema/dieta-mediterranea/come-seguire-la-dieta-mediterranea/" target="_blank" rel="noopener noreferrer">Ministero della Salute</a> e alle <a href="https://sapermangiare.an.crea.gov.it/483/linee-guida.html" target="_blank" rel="noopener noreferrer">Linee guida CREA</a>. Queste fonti non hanno approvato il nostro menu o i prodotti scelti.</p>
<h3>Come sono stati raccolti i prezzi</h3>
<p><strong>Rilevazione: 20 novembre 2026, catalogo pubblico Cicalia.</strong> Per ciascuno dei __NUMERO_PRODOTTI__ prodotti abbiamo letto prezzo, formato e presenza del comando «Aggiungi al carrello». È una disponibilità osservata nel catalogo: consegna al tuo CAP, scorte al momento dell’ordine e prezzo finale possono cambiare. Non abbiamo effettuato acquisti o ricevuto compensi. Il confronto non dimostra che questo sia il negozio più conveniente.</p>
<p>Per frutta e ortaggi il venditore indica pesi «circa»: il conto usa quel peso nominale. Mele, clementine, ortaggi e patate sono pesati prima di pulizia e scarti; cereali e legumi sono pesati secchi, pollo crudo. Lo sgombro è contato a scatole da 125 g totali: non attribuiamo 125 g al prodotto sgocciolato.</p>
<h3>Colazione e spuntini, ogni giorno</h3>''']
parts.append('<p><strong>Per due:</strong> colazione con '+esc(ingredients(data['colazione_quotidiana']))+'. Spuntini con '+esc(ingredients(data['spuntini_quotidiani']))+'. Sono quantità del conto dimostrativo, da adattare al proprio piano.</p>')
parts.append('<p>In ogni pranzo e cena il conto comprende anche 40 g di cipolla, 20 ml di olio extravergine e 1 g di sale aggiunto, sempre per due. Il sale dei prodotti confezionati è ulteriore: questa indicazione contabile non è un obiettivo di consumo. Acqua potabile per bere e cucinare non conteggiata; nessuna bevanda zuccherata o alcolica è prevista.</p>')
parts.append('<div class="paniere-settimana">')
for day in data['settimana']:
    parts.append('<details class="paniere-giorno"><summary>'+esc(day['giorno']+' · '+day['pranzo']['piatto']+' / '+day['cena']['piatto'])+'</summary>')
    for slot in ('pranzo', 'cena'):
        meal = day[slot]
        parts.append('<h4>'+slot.capitalize()+': '+esc(meal['piatto'])+'</h4><p>'+esc(ingredients(meal['ingredienti'], ('cipolle','olio','sale')))+'. Aggiungi i condimenti già conteggiati sopra.</p>')
    parts.append('</details>')
parts.append('</div><p>Per la cottura dei legumi, l’ammollo quando richiesto e la conservazione segui le istruzioni delle confezioni. Le dosi sopra sono da pesare prima della cottura; non sostituirle con pari grammi di legumi cotti.</p>')
t=data['totali']
parts.append('<div class="example" id="paniere-totali"><h3>Quanto risulta dal conto</h3><p><strong>'+euro(t['quantita_usate_eur'])+'</strong> è il costo proporzionale delle sole quantità elencate per due persone nella settimana.</p><p><strong>'+euro(t['confezioni_eur'])+'</strong> è l’esborso teorico per acquistare tutte le confezioni intere, partendo con la dispensa vuota. Restano quantità nominali per un valore proporzionale di '+euro(t['rimanenza_valore_eur'])+', utilizzabili solo entro le scadenze e con conservazione corretta.</p><p><strong>Spedizione esclusa.</strong> Sono esclusi anche acqua, energia di cottura e qualsiasi acquisto aggiuntivo. Il totale pagato online dipende da indirizzo, pesi effettivi e supplementi: controlla le <a href="https://www.cicalia.com/it/content/1-spedizione-corrieri" target="_blank" rel="noopener noreferrer">condizioni del venditore</a> e il preventivo prima di ordinare. Questo non è un preventivo di consegna.</p></div>')
parts.append('<h3>La lista completa delle confezioni</h3><p>Apri il collegamento di ogni prodotto per ricontrollare prezzo e disponibilità. I residui sono nominali, prima degli scarti. La passata è conteggiata all’offerta osservata di 1,59 € fino a tre bottiglie: qui ne servono due; la scadenza della promozione non è stata accertata.</p><div class="paniere-prodotti">')
for p in data['prodotti']:
    unit='scatole' if p['id']=='sgombro' else p['unita']
    pack=str(p['confezione'])+' '+unit
    parts.append('<div class="paniere-prodotto"><h4><a href="'+esc(p['fonte'],quote=True)+'" target="_blank" rel="noopener noreferrer">'+esc(p['nome'])+'</a></h4><p>'+esc(p['prodotto'])+'. Confezione: '+pack+(' circa' if p['peso_approssimativo'] else '')+'; prezzo: <strong>'+euro(p['prezzo_confezione'])+'</strong>.</p><p>Nel menu: '+str(p['quantita_settimana'])+' '+unit+'. Da acquistare: <strong>'+str(p['numero_confezioni'])+' confezioni = '+euro(p['costo_confezioni'])+'</strong>. Quantità residua: '+str(p['residuo_nominale'])+' '+unit+'.</p><p>Costo attribuito alla quantità del menu: '+euro(p['costo_quantita'])+'.</p>')
    if p['note']: parts.append('<p>'+esc(p['note'])+'</p>')
    parts.append('</div>')
parts.append('</div><p>I costi dei singoli ingredienti sono arrotondati al centesimo; il totale è calcolato sui valori non arrotondati. Le confezioni effettive, gli scarti e le scorte in casa possono cambiare l’esborso.</p>')
parts.append('''<h3>Usa questo conto come punto di partenza</h3>
<p>Il pulsante trasferisce tutte le 22 righe con quantità, prezzo unitario, formato, fonte e data. Puoi modificarle e stampare il solo riepilogo. Per usare il calcolatore serve aprirlo online; il menu e la lista restano leggibili nelle guide già salvate nell’app.</p>
<p><button type="button" class="action" id="importa-paniere">Apri questo paniere nel calcolatore</button></p>
<p id="paniere-stato" role="status"></p>
<p><a href="strumenti/costo-spesa-settimanale.html">Apri il calcolatore vuoto</a> · <a href="app/menu-mediterraneo.html">Componi un menu diverso</a></p>
<p><a href="FONTI/paniere-mediterraneo-2026-11-20.json">Dati della rilevazione e formule del conto</a>. Preparazione con AI generativa e controllo documentale del curatore; nessuna revisione dietistica indipendente. Immagine illustrativa originale del progetto, generata con AI; non mostra i prodotti commerciali selezionati.</p>
</section>''')
payload={'versione':1,'persone':2,'fonte':'Cicalia · paniere Per Me del 20/11/2026; spedizione esclusa','data':data['rilevazione'],'elenco':[{'nome':p['nome'],'quantita':p['quantita_settimana'],'unita':p['unita'],'prezzo':float(p['prezzo_confezione'])*(1 if p['unita']=='pezzi' else 1000)/p['confezione'],'confezione':p['confezione']}for p in data['prodotti']]}
parts.append('<script type="application/json" id="paniere-dati">'+json.dumps(payload,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')+'</script>')
section='\n'.join(parts).replace('__NUMERO_PRODOTTI__',str(len(data['prodotti'])))
start='<!-- INIZIO PANIERE DOCUMENTATO -->'
end='<!-- FINE PANIERE DOCUMENTATO -->'
page=PAGE.read_text()
if start in page: page=page[:page.index(start)]+start+'\n'+section+'\n'+page[page.index(end):]
else: page=page.replace('<h2 id="fonti">',start+'\n'+section+'\n'+end+'\n<h2 id="fonti">',1)
PAGE.write_text(page)
print(f"Rigenerati menu, {len(data['prodotti'])} prodotti e dati per il calcolatore.")
