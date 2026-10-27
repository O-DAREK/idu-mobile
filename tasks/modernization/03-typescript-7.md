# 03 – TypeScript 6/7

**Cel:** typescript 5.9 → 7 (albo 6, zgodnie z decyzją z README).

## Kontekst

- TS 7.0 to natywny kompilator (port do Go). Ostatnie wydanie to 7.0.2 (2026-07). TS 6.0 to ostatnia
  wersja w JS, przejściowa, z ostrzeżeniami o usuwanych opcjach.
- TypeScript służy w projekcie tylko do sprawdzania typów (`noEmit`). Vite transpiluje kod sam, więc
  zmiana nie wpływa na build.
- Po tasku 02 projekt przechodzi typecheck na obu wersjach bez zmian w kodzie.

## Kroki

1. `yarn add -D typescript@^7` (po uzgodnieniu).
2. `npx tsc --noEmit` dla obu projektów (`tsconfig.json`, `tsconfig.node.json`, ewentualnie test).
3. Sprawdzić zmienione domyślne wartości opcji w release notes 6.0/7.0, np. `types`, `strict`
   i `module`. Tam, gdzie zmieniły się domyślne, ustawić opcje jawnie.
4. Sprawdzić, czy typy w IDE (VS Code) działają: wersja TS z workspace albo rozszerzenie TS native preview.

## Ryzyka

- Narzędzia, które importują `typescript` jako bibliotekę (API JS), mogą nie działać z 7. Teraz
  projekt nie ma takich narzędzi (brak ESLint/typescript-eslint). Przy ich dodawaniu wybrać TS 6.

## Kryteria akceptacji

- `npx tsc --noEmit` przechodzi i jest wyraźnie szybszy. Testy i build bez zmian.

## Commit

`chore: upgrade typescript to v7`
