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

Data: 2026-10-14, Node 24.21.0, branch `chore/modernize-stack`.

- `npx tsc --noEmit`: bez błędów (~28 s).
- `CI=true yarn test`: 5 suite'ów, 53 testy, wszystkie zielone (~5 s).
- `env -u NODE_OPTIONS yarn build`: "Compiled successfully", ~51 s; jedyne ostrzeżenie to DEP0176 (`fs.F_OK`, Node 24).
- Rozmiary gzip: `5.*.chunk.js` 140.52 kB, `main.*.js` 60.83 kB, `106.*.chunk.js` 18.14 kB.
- Smoke test ręczny (`yarn start`) i `yarn analyze`: do wykonania przez właściciela, jeszcze nie wykonane.
