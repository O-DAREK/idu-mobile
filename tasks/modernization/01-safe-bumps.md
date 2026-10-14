# 01 – Bezpieczne patch/minor i usunięcie nieużywanych

**Cel:** zebrać wszystko, co nie zmienia wersji głównej, oraz usunąć martwe zależności.

## Kroki

1. Usunąć `react-swipeable-views` i `@types/react-swipeable-views` (brak importów w `src/`; zweryfikować `grep`).
2. Podbić w obrębie tej samej wersji głównej: `@material-ui/{core,icons,lab,pickers,styles}` (4.12.x / 4.11.x / alpha.61 / 3.3.x), `react`/`react-dom` 16.14, `react-router(-dom)` 5.3.4, `styled-components` 5.3.x, `mobx` 5.15.7, `mobx-react-lite` 2.2.x, `date-fns` 2.30, `javascript-time-ago` 2.6.x, `source-map-explorer`, `cross-env` 7.0.3, `jest-fetch-mock` 3.2, `@types/*` (react 16.14, react-dom 16.9.x, jest 26, router, styled-components, javascript-time-ago).
3. Zostawić `@types/node` na 16 do tasku 12.
4. Uruchomić tsc, testy, build, smoke test.

## Ryzyka

- `@types/react` 16.14 bywa bardziej restrykcyjne – możliwe drobne poprawki typów.

## Kryteria akceptacji

- tsc / testy / build zielone; `yarn outdated` nie pokazuje już pozycji, w których Wanted ≠ Current.

## Commit

`chore: bump patch and minor dependencies, drop unused react-swipeable-views`
