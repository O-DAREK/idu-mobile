# 02 – tsconfig: `paths` zamiast `baseUrl`, osobne typy testów

**Cel:** przygotować konfigurację pod TypeScript 6 i 7 bez zmiany wersji TS.

## Zakres

### `baseUrl` → `paths`

- TS 6 zgłasza `baseUrl` jako przestarzałe (TS5101), a TS 7 je usunął (TS5102).
  Sprawdzone przez `npx` 2026-10-20.
- W `tsconfig.json`: usunąć `"baseUrl": "src"` i dodać `"paths": { "*": ["./src/*"] }`.
  Importy absolutne (`stores/NewsStore`, `constants/urls` itd.) zostają bez zmian.
- Ta konfiguracja przeszła typecheck na TS 6.0.3 i 7.0.2. Musi też przejść na obecnym 5.9.
- **Do sprawdzenia:** czy `resolve: { tsconfigPaths: true }` w `vite.config.ts` rozwiązuje wzorzec
  `*` tak samo jak `baseUrl`. Dotyczy to dev servera, `yarn build` i vitest. Jeśli nie, użyć
  `resolve.alias` albo listy konkretnych katalogów w `paths`.
- Zaktualizować wzmiankę o `baseUrl` w CLAUDE.md.

### Osobne typy dla testów

- Teraz `globals: true` w vitest razem z typami `vitest/globals` sprawia, że `describe`, `it` i `vi`
  są typowane globalnie w całym `src/`. Użycie ich w kodzie aplikacji przechodzi więc tsc i wybucha
  dopiero w runtime.
- Rozwiązanie:
  - wyłączyć `src/tests/` i `src/setupTests.ts` z głównego `tsconfig.json`;
  - dodać `tsconfig.test.json` (extends + `types: ["vitest/globals"]`), dołączony do `references`
    albo sprawdzany osobno.
- `npx tsc --noEmit` (i husky w pre-commit) musi nadal sprawdzać testy. Zaktualizować komendę
  w CLAUDE.md i w `.husky/pre-commit`, jeśli się zmieni.
- **Wynik:** wariant z `exclude` i `tsconfig.test.json` odpadł, bo `resolve.tsconfigPaths` w Vite
  nie stosuje `paths` do plików wyłączonych z `tsconfig.json`, więc importy absolutne w testach
  przestają działać. Zamiast tego `globals: false` w vitest, a testy importują `describe`, `it`, `vi`
  itd. z `'vitest'`. Jeden `tsconfig.json`, komenda `yarn typecheck` (`tsc --noEmit`).

## Kryteria akceptacji

- tsc, testy, `yarn build` i `yarn start` przechodzą.
- `npx -p typescript@7 tsc --noEmit` (bez instalacji) nie zgłasza błędów konfiguracji.
- Testowy `describe` w pliku z `src/pages/` daje błąd tsc. Sprawdzić i cofnąć.

## Commit

`chore: replace tsconfig baseUrl with paths` oraz `chore: scope vitest global types to tests`
