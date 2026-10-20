# 08 – (Opcjonalnie) Narzędzia i drobne paczki

Paczki działają i nie blokują niczego, ale są mało aktywne albo zbędne. Każdy punkt wymaga
osobnej decyzji właściciela.

## `source-map-explorer` → `rollup-plugin-visualizer`

- `source-map-explorer`: ostatnie wydanie 2022, 57 otwartych issue. Używany tylko w `yarn analyze`.
- `rollup-plugin-visualizer` działa jako plugin Vite (Rolldown) i generuje interaktywny treemap
  z gzip/brotli.
- Kroki:
  - dodać plugin warunkowo (np. `mode === 'analyze'` albo zmienna środowiskowa), żeby nie spowalniał
    zwykłego buildu;
  - `analyze` w `package.json` → `vite build --mode analyze`;
  - `yarn remove source-map-explorer`;
  - zaktualizować opis komendy w CLAUDE.md i README.
- Sprawdzić zgodność wersji pluginu z Vite 8 przed instalacją.

## `http-status-codes` → stała

- Używamy tylko `StatusCodes.UNAUTHORIZED` (8 miejsc w 5 plikach).
- Opcja: `export const UNAUTHORIZED = 401` w `src/constants/` i `yarn remove http-status-codes`.
- Zysk jest niewielki (paczka jest stabilna i tree-shakowana). Robić tylko przy okazji.

## Commit

`chore: replace source-map-explorer with rollup-plugin-visualizer`,
`chore: drop http-status-codes in favor of a constant`
