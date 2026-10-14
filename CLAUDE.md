# idu-mobile

Mobilny klient webowy (PWA) systemu IDU. Vite 8 + Vitest, React 16, TypeScript 4.9 (strict), MobX 5 + mobx-react-lite, Material-UI v4, styled-components, react-router 5.

## Komendy

Menedżer pakietów: **yarn** (jest `yarn.lock`; README wspomina npm, ale używamy yarn).

Komendy uruchamiaj przez narzędzie **Bash** (Git Bash), nie PowerShell: poniższe komendy (`CI=true ...`) mają składnię basha i nie działają w PowerShell 5.1.

- `yarn start` – dev server (wymaga `.env` z `VITE_API_ROOT`, wzór w `.env.example`)
- `CI=true yarn test` – wszystkie testy jednorazowo (bez `CI=true` jest tryb watch, który się nie kończy)
- `npx tsc --noEmit` – sprawdzenie typów
- `yarn build` – build produkcyjny do `build/`; `yarn preview` – serwuje build (service worker działa tylko w buildzie, PWA testuj tu)

## Struktura

- `src/stores/` – stany MobX (`UserStore`, `ConfigStore`, `MetaStore`, `MessagesStore`, `NewsStore`), udostępniane przez React context w `stores/index.ts`. Obowiązuje `enforceActions: 'always'`: każda zmiana stanu w akcji / `runInAction`, także po `await`.
- `src/pages/` – ekrany (Events, Login, Messages, News, Settings), routing w `Router.tsx`.
- `src/components/` – współdzielone komponenty, eksportowane przez `components/index.ts`.
- `src/locales/` – teksty UI (`strings.ts`) i hooki do tłumaczeń. Nie hardkoduj tekstów w komponentach.
- `src/constants/`, `src/utils/`, `src/typings/` – stałe, helpery, deklaracje typów.
- `src/tests/` – testy Vitest (głównie store'ów), `fetch` mockowany przez `vitest-fetch-mock`.
- Importy absolutne względem `src` (`baseUrl: src`), np. `import { NewsStore } from 'stores/NewsStore'`.

## Styl kodu

- Prettier (`.prettierrc`): taby, bez średników, pojedyncze cudzysłowy, szerokość 100, bez trailing commas. Hook formatuje pliki automatycznie po edycji.
- Komentarze w kodzie i wiadomości commitów **po angielsku**.
- Trzymaj się istniejących wzorców (MUI v4 `makeStyles`/styled-components, hooki, `observer` z mobx-react-lite). Nie podbijaj głównych wersji bibliotek bez prośby.

## Git

- Nigdy nie commituj na `master`. Przed zmianami utwórz branch z prefiksem `feat/`, `fix/` albo `chore/`.
- Commituj **tylko na wyraźną prośbę**.
- Przed commitem uruchom `npx tsc --noEmit` i `CI=true yarn test` (to samo sprawdza husky w pre-commit).
- Wiadomości w formacie Conventional Commits: `feat: ...`, `fix: ...`, `chore: ...`, `refactor: ...`, `test: ...`.
- Nie wykonuj `git push` ani operacji niszczących historię. Push robi użytkownik.

## Zależności

- Dodawanie lub usuwanie paczek (`yarn add/remove`) zawsze po uzgodnieniu z użytkownikiem.
- Nie edytuj ręcznie `yarn.lock` ani `build/`.

## Konsultacje

Przy nietrywialnych decyzjach projektowych lub przed uznaniem większej zmiany za skończoną poproś o drugą opinię subagenta `fable-consultant`.
