# 04 – react-router 7

**Cel:** react-router-dom 6.30 → 7 (najnowsza 7.x) w trybie biblioteki (declarative mode),
bez przechodzenia na framework mode.

## Kontekst

- W iteracji 1 włączyliśmy flagi `v7_startTransition` i `v7_relativeSplatPath` w `Router.tsx`.
  Zachowanie v7 jest więc już aktywne, a ostrzeżenia z konsoli zniknęły.
- W v7 główną paczką jest `react-router`. `react-router-dom` jest re-eksportem, który zostaje dla
  zgodności, ale zalecane jest importowanie z `react-router`.

## Kroki

1. Sprawdzić w konsoli dev, czy nie ma innych ostrzeżeń `v7_*` (np. `v7_fetcherPersist`,
   `v7_normalizeFormMethod`, `v7_partialHydration`, `v7_skipActionErrorRevalidation`). Dotyczą one
   data routerów, których nie używamy, ale trzeba to potwierdzić.
2. `yarn remove react-router-dom` + `yarn add react-router@^7` (po uzgodnieniu). Zmienić importy
   `react-router-dom` → `react-router` w `Router.tsx`, `pages/*`, `components/*` i `utils/LastLocation.tsx`.
   Alternatywa z mniejszą liczbą zmian: zostać przy `react-router-dom@^7`.
3. Usunąć prop `future` z `BrowserRouter`, bo w v7 to domyślne zachowanie.
4. React Router 7 wymaga React ≥18. Sprawdzić `peerDependencies` przed instalacją.

## Kryteria akceptacji

- Wszystkie ścieżki z `urls.internal.*` działają, w tym głębokie linki po odświeżeniu
  (`yarn preview` + service worker).
- BackBar i przekierowania dla zalogowanego i niezalogowanego bez zmian.
- Brak ostrzeżeń routera w konsoli.

## Commit

`feat: upgrade react-router to v7`
