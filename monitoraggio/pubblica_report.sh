#!/usr/bin/env bash
# Per Me: pubblica SOLO i rapporti generati sul main corrente, evitando rebase di snapshot.
set -euo pipefail
if [ "$#" -lt 2 ]; then
  echo "Uso: pubblica_report.sh 'Messaggio commit' file.json [altri-file.json]" >&2
  exit 2
fi
message="$1"; shift
report_files=("$@")
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
for file in "${report_files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "Rapporto mancante: $file" >&2
    exit 2
  fi
  mkdir -p "$tmp/$(dirname "$file")"
  cp "$file" "$tmp/$file"
done

git config user.name "per-me-audit"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
for attempt in 1 2 3 4 5; do
  echo "Invio rapporti, tentativo $attempt di 5..."
  git fetch origin main
  # Questo runner usa un checkout temporaneo. Ripartire dalla punta corrente
  # evita di portare con un rebase vecchie modifiche ai JSON sul ramo main.
  git reset --hard origin/main
  for file in "${report_files[@]}"; do
    mkdir -p "$(dirname "$file")"
    cp "$tmp/$file" "$file"
  done
  git add -- "${report_files[@]}"
  if git diff --cached --quiet; then
    echo "Rapporti gia' presenti: nessun commit necessario."
    exit 0
  fi
  git commit -m "$message"
  if git push origin HEAD:main; then
    echo "Rapporti archiviati su main."
    exit 0
  fi
  echo "main e' avanzato durante il push: nuovo tentativo senza force-push."
  sleep "$attempt"
done
echo "Pubblicazione rapporti fallita dopo 5 tentativi: JSON conservati nei log dell'azione." >&2
exit 1
