#!/usr/bin/env python3
"""Legge soltanto /get/; non incrementa contatori e non visita le guide."""
import concurrent.futures
import datetime as dt
import json
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'monitoraggio/marketing-30-giorni.json'
START = '2026-11-21'
END = '2026-12-21'
KEYS = {
 'aperture': 'perme-visite-dal-20261018-43bcc26da793',
 'facebook': 'perme-origine-facebook-dal-20261023-43bcc26da793',
 'instagram': 'perme-origine-instagram-dal-20261120-43bcc26da793',
 'whatsapp': 'perme-origine-whatsapp-dal-20261115-43bcc26da793',
 'canale_whatsapp': 'perme-canale-whatsapp-dal-20261120-43bcc26da793',
 'google': 'perme-origine-google-dal-20261023-43bcc26da793',
 'altri': 'perme-origine-altri-dal-20261023-43bcc26da793',
 'sconosciuta': 'perme-origine-sconosciuta-dal-20261023-43bcc26da793',
 'aperture_menu': 'perme-marketing-menu-dal-20261121',
 'aperture_calcolatore': 'perme-marketing-calcolatore-dal-20261121',
 'aperture_modelli': 'perme-marketing-modelli-dal-20261121',
 'clic_whatsapp': 'perme-marketing-segui-whatsapp-dal-20261121',
 'clic_facebook': 'perme-marketing-segui-facebook-dal-20261121',
 'giornate_ritorno': 'perme-marketing-ritorni-giornalieri-dal-20261121',
}
MARKETING = {name for name, key in KEYS.items() if key.startswith('perme-marketing-')}

def activation_time(data):
 try:
  value = dt.datetime.fromisoformat(data['marketing_activated_at'])
  if value.tzinfo is not None and START <= value.astimezone(ZoneInfo('Europe/Rome')).date().isoformat() <= END:
   return value
 except (KeyError, TypeError, ValueError):
  pass
 return None

def read(item):
 name, key = item
 try:
  req = Request('https://countapi.mileshilliard.com/api/v1/get/' + key,
                headers={'User-Agent':'PerMe-Marketing-ReadOnly/1.0','Cache-Control':'no-cache'})
  with urlopen(req, timeout=18) as response:
   value = json.load(response).get('value')
  if type(value) is not int or value < 0:
   raise ValueError('conteggio non valido')
  return name, {'value': value, 'status': 'ok'}
 except HTTPError as exc:
  if exc.code == 404:
   return name, {'value': None, 'status': 'non_ancora_creato'}
  return name, {'value': None, 'status': 'non_disponibile', 'error': 'HTTP '+str(exc.code)}
 except Exception as exc:
  return name, {'value': None, 'status': 'non_disponibile', 'error': str(exc)[:180]}

def main():
 now = dt.datetime.now(ZoneInfo('Europe/Rome'))
 if not START <= now.date().isoformat() <= END:
  print('Finestra dei trenta giorni conclusa o non iniziata; nessuna raccolta.')
  return
 data = json.loads(OUT.read_text()) if OUT.exists() else {
  'start': START, 'end': END, 'timezone':'Europe/Rome',
  'method':'Letture cumulative aggregate da /get/. Differenze rispetto alla prima lettura valida per ciascuna metrica. Non persone uniche, iscrizioni o utilizzi completati. Errori distinti da zero. Il dettaglio canale è incluso in WhatsApp.',
  'snapshots': []}
 # Valorizzare soltanto con la data effettiva di un’attivazione autorizzata.
 # Un ramo di proposta e una risposta 404 non dimostrano un’attivazione.
 data.setdefault('marketing_activated_at', None)
 activated_at = activation_time(data)
 active = activated_at is not None and activated_at <= now
 items = [(name, key) for name, key in KEYS.items() if name not in MARKETING or active]
 with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
  values = dict(pool.map(read, items))
 if not active:
  values.update({name: {'value': None, 'status': 'non_attivata'} for name in MARKETING})
 snapshot = {'at': now.isoformat(), 'values': values}
 # Conserva la prima lettura e una lettura per ogni data successiva.
 day = now.date().isoformat()
 if not any(s['at'][:10] == day for s in data['snapshots']):
  data['snapshots'].append(snapshot)
 else:
  print('Lettura del giorno già archiviata; prima lettura preservata.')
 OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2)+'\n')
 print(json.dumps({'at':snapshot['at'],'available':sum(v['value'] is not None for v in values.values()),'total':len(values),'values':values},ensure_ascii=False))

if __name__ == '__main__':main()
