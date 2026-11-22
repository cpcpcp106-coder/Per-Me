#!/usr/bin/env python3
"""Prova lo snapshot con orologio e rete simulati; non invoca la pubblicazione."""
import contextlib
import datetime as dt
import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from urllib.error import HTTPError, URLError
from zoneinfo import ZoneInfo

spec = importlib.util.spec_from_file_location('snapshot_marketing', Path(__file__).with_name('snapshot-marketing.py'))
snapshot = importlib.util.module_from_spec(spec)
spec.loader.exec_module(snapshot)

class SnapshotTest(unittest.TestCase):
 def test_read_zero_is_a_valid_observation(self):
  with patch.object(snapshot, 'urlopen', return_value=io.StringIO('{"value":0}')) as request:
   self.assertEqual(snapshot.read(('aperture', snapshot.KEYS['aperture']))[1], {'value': 0, 'status': 'ok'})
   self.assertIn('/api/v1/get/', request.call_args.args[0].full_url)
   self.assertNotIn('/hit/', request.call_args.args[0].full_url)

 def test_missing_counter_is_not_zero(self):
  with patch.object(snapshot, 'urlopen', side_effect=HTTPError('https://example.invalid', 404, 'missing', {}, None)):
   self.assertEqual(snapshot.read(('menu', 'test'))[1], {'value': None, 'status': 'non_ancora_creato'})

 def test_network_errors_and_invalid_values_are_not_zero(self):
  for value in (True, -1, 2.5, '3', None):
   with self.subTest(value=value), patch.object(snapshot, 'urlopen', return_value=io.StringIO(json.dumps({'value': value}))):
    self.assertEqual(snapshot.read(('menu', 'test'))[1]['status'], 'non_disponibile')
  for error in (URLError('rete simulata'), HTTPError('https://example.invalid', 503, 'unavailable', {}, None)):
   with self.subTest(error=error), patch.object(snapshot, 'urlopen', side_effect=error):
    result = snapshot.read(('menu', 'test'))[1]
    self.assertIsNone(result['value'])
    self.assertEqual(result['status'], 'non_disponibile')

 def run_snapshot(self, at, data=None):
  class Clock(dt.datetime):
   @classmethod
   def now(cls, tz=None):
    return dt.datetime.fromisoformat(at).astimezone(tz or ZoneInfo('Europe/Rome'))
  calls = []
  def response(request, **kwargs):
   calls.append(request.full_url)
   self.assertIn('/api/v1/get/', request.full_url)
   return io.StringIO('{"value":0}')
  with tempfile.TemporaryDirectory() as directory:
   output = Path(directory) / 'snapshot.json'
   if data is not None:
    output.write_text(json.dumps(data))
   with patch.object(snapshot, 'OUT', output), patch.object(snapshot.dt, 'datetime', Clock), patch.object(snapshot, 'urlopen', side_effect=response), contextlib.redirect_stdout(io.StringIO()):
    snapshot.main()
   return json.loads(output.read_text()) if output.exists() else None, calls

 def test_unactivated_series_are_not_requested(self):
  data, calls = self.run_snapshot('2026-11-22T13:00:00+01:00')
  self.assertEqual(len(calls), len(snapshot.KEYS) - len(snapshot.MARKETING))
  self.assertIsNone(data['marketing_activated_at'])
  for name in snapshot.MARKETING:
   self.assertEqual(data['snapshots'][0]['values'][name], {'value': None, 'status': 'non_attivata'})

 def test_activation_starts_actual_readings_without_inventing_history(self):
  history = {'snapshots': [{'at': '2026-11-21T12:00:00+01:00', 'values': {'aperture_menu': {'value': 0, 'status': 'non_ancora_creato'}}}], 'marketing_activated_at': '2026-11-22T12:00:00+01:00'}
  data, calls = self.run_snapshot('2026-11-22T13:00:00+01:00', history)
  self.assertEqual(len(calls), len(snapshot.KEYS))
  self.assertEqual(data['snapshots'][0], history['snapshots'][0])
  self.assertEqual(data['snapshots'][1]['values']['aperture_menu'], {'value': 0, 'status': 'ok'})

 def test_invalid_or_future_activation_stays_inactive(self):
  for value in ('bad', '2026-11-22T12:00:00', '2026-11-23T12:00:00+01:00', '2026-12-23T12:00:00+01:00'):
   with self.subTest(value=value):
    data, calls = self.run_snapshot('2026-11-22T13:00:00+01:00', {'snapshots': [], 'marketing_activated_at': value})
    self.assertEqual(len(calls), len(snapshot.KEYS) - len(snapshot.MARKETING))
    self.assertEqual(data['snapshots'][0]['values']['aperture_menu']['status'], 'non_attivata')

 def test_existing_daily_reading_is_preserved(self):
  history = {'snapshots': [{'at': '2026-11-22T08:00:00+01:00', 'values': {'aperture': {'value': 42, 'status': 'ok'}}}]}
  data, _ = self.run_snapshot('2026-11-22T13:00:00+01:00', history)
  self.assertEqual(data['snapshots'], history['snapshots'])

 def test_no_collection_outside_the_italian_window(self):
  for at in ('2026-11-20T23:59:59+01:00', '2026-12-22T00:00:00+01:00'):
   with self.subTest(at=at):
    data, calls = self.run_snapshot(at)
    self.assertIsNone(data)
    self.assertEqual(calls, [])

if __name__ == '__main__':
 unittest.main()
