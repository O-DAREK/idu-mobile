# 05b – react-router 8

**Cel:** react-router 7.18 → 8 (najnowsza 8.x, w dniu dodania 8.5.0), dalej w trybie deklaratywnym.

## Kontekst

- v8 wyszło w czerwcu 2026 i wymaga `react`/`react-dom` ≥ 19.2.7 oraz `@types/react*` ≥ 19.2,
  więc robimy go dopiero po tasku 05.
- W analizie stanu wyjściowego v8 zostało pominięte, bo sprawdzany był `react-router-dom`, który
  w v8 nie jest już wydawany.

## Kroki

1. Przeczytać migration guide 7 → 8 (usunięte API, zmiany w `BrowserRouter`, `Routes`,
   `useNavigate`, trasach względnych i `Navigate`).
2. Sprawdzić w konsoli dev na v7 ostrzeżenia o przestarzałych API.
3. `yarn add react-router@^8` (po uzgodnieniu), poprawki, typecheck, testy, build.

## Kryteria akceptacji

- Jak w tasku 04: wszystkie trasy, deep linki (`yarn preview`), BackBar, przekierowania, brak
  ostrzeżeń routera.

## Commit

`feat: upgrade react-router to v8`
