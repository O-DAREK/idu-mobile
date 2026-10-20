# idu-mobile

Mobilny klient webowy (PWA) systemu IDU. Vite 8 + Vitest 5, React 19, TypeScript 7 (strict, natywny kompilator; tylko typecheck, Vite transpiluje sam), MobX 7 + mobx-react-lite 5, MUI v6 (`@mui/material`, `@mui/x-date-pickers`, emotion), styled-components 6, react-router 8, date-fns 4. Node: `.nvmrc` (24), `engines` jak Vite 8.

## Komendy

Menedżer pakietów: **yarn** 1 (`yarn.lock`).

Komendy uruchamiaj przez narzędzie **Bash** (Git Bash), nie PowerShell: poniższe komendy (`CI=true ...`) mają składnię basha i nie działają w PowerShell 5.1.

- `yarn start` – dev server (wymaga `.env` z `VITE_API_ROOT`, wzór w `.env.example`; `VITE_MOCK_API=true` włącza API w pamięci z `src/mocks/`, dowolny login działa)
- `CI=true yarn test` – wszystkie testy jednorazowo (bez `CI=true` jest tryb watch, który się nie kończy)
- `yarn typecheck` – sprawdzenie typów (`tsc --noEmit`, kod i testy)
- `yarn build` – build produkcyjny do `build/`; `yarn preview` – serwuje build (service worker działa tylko w buildzie, PWA testuj tu)
- `yarn analyze` – build + `source-map-explorer` (rozmiary bundla)

## Struktura

- `src/stores/` – stany MobX (`UserStore`, `ConfigStore`, `MetaStore`, `MessagesStore`, `NewsStore`), udostępniane przez React context w `stores/index.ts`. Bez dekoratorów (MobX 7 ich nie wspiera): pola i akcje deklarowane jawnie w `makeObservable(this, { ... })` w konstruktorze; pole prywatne wymaga generyka, np. `makeObservable<NewsStore, 'load'>`. Nowe pole lub akcja bez wpisu w mapie = brak reaktywności bez błędu. Obowiązuje `enforceActions: 'always'`: każda zmiana stanu w akcji / `runInAction`, także po `await`.
- `src/pages/` – ekrany (Events, Login, Messages, News, Settings), routing w `Router.tsx` (react-router 8 w trybie deklaratywnym, importy z `react-router`; `News` i `Messages` mają zagnieżdżone trasy względne pod `/news/*` i `/messages/*`). Poprzednia lokalizacja dla `BackBar`: `utils/LastLocation.tsx`.
- `src/components/` – współdzielone komponenty, eksportowane przez `components/index.ts`.
- `src/locales/` – teksty UI (`strings.ts`) i hooki do tłumaczeń. Nie hardkoduj tekstów w komponentach.
- `src/styles/theme.ts` – motyw MUI z `ConfigStore` (tryb, kolory akcentu); nadpisuje kilka domyślnych wartości v5, żeby zachować wygląd z v4. Ten sam motyw trafia do styled-components (`p.theme`).
- `src/constants/`, `src/utils/`, `src/typings/` – stałe, helpery (m.in. `utils/useAsync`), deklaracje typów.
- `src/mocks/` – API w pamięci dla `VITE_MOCK_API`.
- `src/tests/` – testy Vitest (głównie store'ów), `fetch` mockowany przez `vitest-fetch-mock`.
- Importy absolutne względem `src` (`paths: { "*": ["./src/*"] }` w `tsconfig.json`), np. `import { NewsStore } from 'stores/NewsStore'`.

## Styl kodu

- Prettier (`.prettierrc`): taby, bez średników, pojedyncze cudzysłowy, szerokość 100, bez trailing commas. Hook formatuje pliki automatycznie po edycji.
- Komentarze w kodzie i wiadomości commitów **po angielsku**.
- Trzymaj się istniejących wzorców (styled-components na komponentach MUI, hooki, `observer` z mobx-react-lite). Propsy stylów tylko jako transient props (`$prop`), żeby nie trafiały do DOM. Ikony importuj ścieżką (`@mui/icons-material/Add`), nie z beczki. Nie podbijaj głównych wersji bibliotek bez prośby.

## Git

- Nigdy nie commituj na `master`. Przed zmianami utwórz branch z prefiksem `feat/`, `fix/` albo `chore/`.
- Commituj **tylko na wyraźną prośbę**.
- Przed commitem uruchom `yarn typecheck` i `CI=true yarn test` (to samo sprawdza husky w pre-commit).
- Wiadomości w formacie Conventional Commits: `feat: ...`, `fix: ...`, `chore: ...`, `refactor: ...`, `test: ...`.
- Nie wykonuj `git push` ani operacji niszczących historię. Push robi użytkownik.

## Zależności

- Dodawanie lub usuwanie paczek (`yarn add/remove`) zawsze po uzgodnieniu z użytkownikiem.
- Nie edytuj ręcznie `yarn.lock` ani `build/`.

## Konsultacje

Przy nietrywialnych decyzjach projektowych lub przed uznaniem większej zmiany za skończoną poproś o drugą opinię subagenta `fable-consultant`.
