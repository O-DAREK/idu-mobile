# 10 – styled-components 6

**Cel:** styled-components 5 → 6 (20 plików).

## Kroki

1. `styled-components` → 6.x; usunąć `@types/styled-components` (v6 ma własne typy).
2. Propsy trafiające do DOM: v6 nie filtruje niestandardowych propsów – użyć transient props (`$prop`) tam, gdzie to konieczne.
3. `DefaultTheme` – ponownie zadeklarować typy motywu, jeśli występują (`typings/`).
4. Sprawdzić `createGlobalStyle`, `css`, `attrs` i generyki `styled.div<Props>`.
5. Po tasku 08 sprawdzić kolejność specyficzności CSS względem MUI (emotion).

## Kryteria akceptacji

- Brak ostrzeżeń "React does not recognize the X prop"; wygląd bez zmian.

## Commit

`feat: upgrade styled-components to v6`
