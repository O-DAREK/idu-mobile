# 07 – react-router 6

**Cel:** react-router 5 → 6 (wersję 6.x lub nowszą zgodną z React 18 wybrać w momencie wykonania).

## Zakres (z kodu)

- `Router.tsx`: `Switch` → `Routes`, `Route path={[a, b]}` → osobne `Route`/wzorce, `Redirect` → `Navigate replace`, `exact` zbędne. Warunek `loggedIn` zostaje.
- `pages/Messages/index.tsx`, `pages/News/index.tsx`: `Switch`/`Route` z `children` → `element={...}`; zagnieżdżone trasy (`/*`).
- `useHistory` → `useNavigate` w: `BackBar`, `BottomAppBar`, `NewMessage`, `ThreadItem`, `NewsItem`.
- `useParams<Params>()` w v6 zwraca wartości opcjonalne; dostosować `Number(...)` w `SpecificMessages`, `SpecificNews`.
- `react-router-last-location` nie wspiera v6: zastąpić własnym hookiem/kontekstem (`useLocation` + `useRef` w providerze) lub `location.state`/`navigate(-1)` w `BackBar`; zachować dotychczasowe zachowanie przycisku wstecz.
- `constants/urls.ts`: sprawdzić format wzorców (`:id`), dostosować do v6.
- Usunąć `react-router`, `@types/react-router*` (v6 ma własne typy); zostaje `react-router-dom`.

## Ryzyka

- Inna semantyka dopasowania ścieżek (trasy względne, brak `exact`) – sprawdzić każdą ścieżkę ręcznie.
- Zachowanie BackBar po wejściu z zewnątrz (brak poprzedniej lokalizacji).

## Kryteria akceptacji

- Wszystkie ścieżki z `urls.internal.*` działają, w tym głębokie linki po odświeżeniu; BackBar zachowuje się jak wcześniej; przekierowania dla niezalogowanego i zalogowanego.

## Commit

`feat: upgrade react-router to v6 and replace last-location provider`
