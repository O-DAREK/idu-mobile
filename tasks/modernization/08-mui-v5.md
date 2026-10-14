# 08 – MUI v4 → v5

**Cel:** `@material-ui/*` → `@mui/*` bez zmiany wyglądu. Pickery osobno (task 09).

## Kroki

1. Przeczytać oficjalny przewodnik migracji v4 → v5. Dodać `@mui/material`, `@mui/icons-material`, `@mui/lab`, `@emotion/react`, `@emotion/styled`; docelowo usunąć `@material-ui/*`.
2. Codemody: `npx @mui/codemod v5.0.0/preset-safe src` (importy, `theme.spacing`, nazwy propsów) oraz `v5.0.0/variant-prop`, `v5.0.0/top-level-imports` wg potrzeb.
3. Motyw: `createMuiTheme` → `createTheme`, `ThemeProvider` z `@mui/material/styles`; zachować mapowanie `theme` / `accentColors` z `ConfigStore` na paletę.
4. Style (`makeStyles`, `@material-ui/styles` w 1 pliku): na czas migracji można użyć `@mui/styles` (legacy, kiepsko z React 18 StrictMode), **docelowo** przepisać na `styled`/`sx`. Wybór strategii zapisać w tym pliku przed startem.
5. Komponenty z lab, które przeszły do core (m.in. `Skeleton`, `Alert`, `Autocomplete`) – poprawić importy.
6. `SwipeableDrawer` w `BottomAppBar` – sprawdzić zmiany API.
7. Migracja po plikach (33), w kilku commitach, np. `components/` → `pages/`.
8. Kolejność CSS względem styled-components: `StyledEngineProvider injectFirst`.

## Ryzyka

- Największy zakres wizualny: domyślne style (tło, wariant pól, odstępy) zmieniły się w v5 – porównać zrzuty przed/po.
- `@mui/styles` + React 18 = ryzyko; unikać, jeśli się da.

## Kryteria akceptacji

- Brak importów `@material-ui/*`; wygląd zgodny z baseline (zrzuty mobilne każdej strony); tsc/testy/build zielone.

## Commit(y)

`feat: migrate components to mui v5` (+ ewentualnie `refactor: replace makeStyles with styled`)
