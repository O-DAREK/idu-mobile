# 12 – TypeScript 5.x i modernizacja tsconfig

**Cel:** aktualne TS (5.x) i nowoczesna konfiguracja pod Vite. TypeScript 7 (natywny) dopiero gdy Vite/Vitest/ESLint go wspierają.

## Kroki

1. `typescript` → 5.x; `@types/node` → LTS zgodny z używanym Node.
2. `tsconfig.json`: `target: ES2020` (lub nowszy), `module: ESNext`, `moduleResolution: Bundler`, `jsx: react-jsx` (po tasku 04; usuwa potrzebę `import React`), `useDefineForClassFields: false` (dekoratory MobX), `types: ["vite/client"]`, usunąć `allowJs` i `downlevelIteration`, jeśli niepotrzebne; `vite.config.ts` w osobnym `tsconfig.node.json`.
3. Zaostrzenia (np. `noUncheckedIndexedAccess`) – osobno, bo duży diff typów.
4. Opcjonalnie usunąć zbędne `import React from 'react'` – osobny commit.

## Kryteria akceptacji

- `npx tsc --noEmit` zielone; build i testy bez zmian zachowania.

## Commit

`chore: upgrade typescript and modernize tsconfig`
