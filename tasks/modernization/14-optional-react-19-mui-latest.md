# 14 – (Opcjonalnie) React 19 i najnowsze MUI

Wykonać dopiero po zmergowaniu tasków 01–13 i stabilizacji.

## Kroki

1. `react`/`react-dom`/`@types/*` → 19; usunąć przestarzałe API (`defaultProps` w komponentach funkcyjnych, `propTypes`, `forwardRef` wg potrzeb).
2. MUI v5 → najnowsze główne (v6/v7) wg migration guide.
3. Zweryfikować zgodność: `react-infinite-scroll-component`, `use-async-react`, `mobx-react-lite`, `@mui/x-date-pickers`.
4. Rozważyć React Compiler (osobna decyzja).

## Commit

`feat: upgrade to react 19` / `feat: upgrade mui to vX`
