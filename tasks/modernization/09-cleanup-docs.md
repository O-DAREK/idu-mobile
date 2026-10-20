# 09 – Sprzątanie i dokumentacja

**Cel:** domknąć iterację 2.

## Kroki

1. `yarn outdated`: ponownie sprawdzić wersje i ewentualnie dobić patch/minor, które wyszły w trakcie.
2. Konsola dev i prod bez ostrzeżeń (React, MUI, router, MobX).
3. Rozmiar bundla (`yarn analyze`) porównany z wartością na starcie iteracji (ok. 268 kB gzip).
4. PWA w `yarn preview`: service worker aktywny, offline start, deep linki, komunikat o aktualizacji.
5. Zaktualizować:
   - opis stacku i komendy w `CLAUDE.md` (wersje, `paths` zamiast `baseUrl`, ewentualnie nowa komenda tsc);
   - `README.md` (wersje, komendy);
   - ten plik i statusy w `tasks/modernization/README.md`, sekcja "Wyniki".

## Commit

`docs: update docs after second modernization pass`
