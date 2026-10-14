# 00 – Baseline i smoke test

**Cel:** znać stan wyjściowy, żeby odróżnić regresje od istniejących problemów.

## Kroki

1. `npx tsc --noEmit`, `CI=true yarn test`, `env -u NODE_OPTIONS yarn build` – zapisać wynik (czas, rozmiar `build/static/js`, ostrzeżenia).
2. Uruchomić `yarn start` z `.env` i przejść listę "Smoke test" z README; zanotować, co już nie działa.
3. Zapisać rozmiary bundla (`yarn analyze`) jako punkt odniesienia.
4. Dopisać wyniki na końcu tego pliku (sekcja "Wyniki").

## Kryteria akceptacji

- Znany, udokumentowany stan zero; ewentualne istniejące błędy opisane.

## Commit

`docs: record modernization baseline` (tylko jeśli dopisujemy wyniki).

## Wyniki

_do uzupełnienia_
