# Plan modernizacji stacku – iteracja 2

Branch: `chore/modernize-stack-2` (z `chore/modernize-stack`). Każdy task to osobny commit (lub kilka).
Kolejność ma znaczenie. Statusy w tabeli poniżej aktualizujemy na bieżąco.

Iteracja 1 (CRA → Vite, React 18, MobX 7, MUI v5, react-router 6, styled-components 6, TS 5.9) jest
zakończona. Jej taski usunięto, historia jest w commitach brancha `chore/modernize-stack`.

## Stan wyjściowy (2026-10-20)

Analiza `yarn outdated`, rejestru npm i repozytoriów na GitHubie.

**Aktualne i utrzymywane:** vite, vitest, @vitejs/plugin-react, vite-plugin-pwa, workbox-*, mobx,
mobx-react-lite, styled-components, emotion, date-fns, use-debounce, javascript-time-ago, jsdom,
prettier, react-infinite-scroll-component.

**Za nami o wersję główną:**

| Paczka                          | Mamy  | Najnowsza   | Task   |
| ------------------------------- | ----- | ----------- | ------ |
| react, react-dom, @types/react* | 18.3  | 19.3        | 05     |
| @mui/material, icons-material   | 5.18  | 9.5         | 06     |
| @mui/x-date-pickers             | 8.29  | 9.15        | 07     |
| react-router-dom                | 6.30  | 7.18        | 04     |
| typescript                      | 5.9   | 6.0 / 7.0   | 02, 03 |
| @types/node                     | 24    | 26          | –      |

`@types/node` zostaje na 24, bo odpowiada wersji Node z `.nvmrc`.

**Nieutrzymywane albo zbędne:**

| Paczka                       | Ostatnie wydanie         | Decyzja                                    | Task |
| ---------------------------- | ------------------------ | ------------------------------------------ | ---- |
| `@types/javascript-time-ago` | deprecated (stub)        | usunąć                                     | 01   |
| `eev`                        | 2018, repo martwe        | zastąpić `EventTarget`                     | 01   |
| `visible-height-css`         | 2019                     | zastąpić CSS `100dvh`                      | 01   |
| `source-map-explorer`        | 2022, 57 otwartych issue | opcjonalnie `rollup-plugin-visualizer`     | 08   |
| `http-status-codes`          | 2023                     | opcjonalnie jedna stała (używamy tylko 401) | 08   |
| `node-interval-tree`         | 2022                     | zostaje (stabilna, 0 issue)                | –    |
| `vitest-fetch-mock`          | 03.2025                  | zostaje (wspiera vitest ≥2)                | –    |
| `jwt-decode`                 | 4.0 (2023)               | zostaje (repo aktywne, API skończone)      | –    |

## Zasady

- Jedna zmiana wersji głównej na raz. Po każdej: `npx tsc --noEmit`, `CI=true yarn test`, `yarn build`
  oraz ręczny smoke test (punkt "Smoke test" niżej).
- `yarn add/remove` tylko po uzgodnieniu z właścicielem (zob. CLAUDE.md). Wersje docelowe
  sprawdzamy w momencie wykonania (`yarn outdated`).
- Nie edytujemy ręcznie `yarn.lock` ani `build/`.
- Komentarze w kodzie i commity po angielsku (Conventional Commits).
- Nie wykonujemy `git push`. Push robi użytkownik.

## Decyzje do potwierdzenia przed startem

1. **TypeScript 6 czy od razu 7** (task 03). Oba przechodzą typecheck po zmianie z taska 02.
   7 to natywny kompilator (szybszy), 6 to wersja przejściowa z ostrzeżeniami.
2. **MUI: od razu do najnowszej (9) czy zatrzymać się wcześniej** (task 06). Migracja przechodzi
   przez v6, v7 i v8; każda główna wersja to osobny commit.
3. **React Compiler** (task 05): osobna decyzja, domyślnie nie w tej iteracji.

## Kolejność i zależności

| #   | Task                                                                      | Zależy od | Ryzyko  | Status |
| --- | ------------------------------------------------------------------------- | --------- | ------- | ------ |
| 01  | [Porządki w zależnościach (eev, visible-height-css, stub typów)](01-deps-cleanup.md) | –         | niskie  | [x]    |
| 02  | [tsconfig: `paths` zamiast `baseUrl`, osobne typy testów](02-tsconfig.md)  | –         | niskie  | [ ]    |
| 03  | [TypeScript 6/7](03-typescript-7.md)                                       | 02        | niskie  | [ ]    |
| 04  | [react-router 7](04-react-router-7.md)                                     | –         | niskie  | [ ]    |
| 05  | [React 19](05-react-19.md)                                                 | –         | średnie | [ ]    |
| 06  | [MUI v5 → najnowsze](06-mui-latest.md)                                     | 05        | wysokie | [ ]    |
| 07  | [Pickery 9](07-pickers-9.md)                                               | 06        | średnie | [ ]    |
| 08  | [Opcjonalnie: narzędzia i drobne paczki](08-optional-tooling.md)           | –         | niskie  | [ ]    |
| 09  | [Sprzątanie i dokumentacja](09-cleanup-docs.md)                            | 01–08     | niskie  | [ ]    |

Taski 01, 02, 04 i 08 są od siebie niezależne. 05 → 06 → 07 idą po kolei.

## Smoke test (ręczny, po każdym większym tasku)

Uruchomienie z `VITE_MOCK_API=true`. Logowanie i wylogowanie; lista newsów → szczegóły newsa →
powrót (BackBar); dialog potwierdzenia newsa; wiadomości: lista → wątek → odpowiedź → nowa wiadomość
(autocomplete odbiorców); wydarzenia (picker dat, kropka przy wydarzeniu całodniowym); ustawienia
(język, motyw jasny/ciemny, kolory akcentu); nawigacja dolnym paskiem i szufladą; tryb offline i
komunikat o aktualizacji PWA (tylko `yarn build` + `yarn preview`); widok mobilny w DevTools
(wysokość ekranu, pasek adresu).

## Poza zakresem (backlog)

Rzeczy wyłapane w iteracji 1, niezwiązane z wersjami paczek. Osobne branche `feat/` lub `fix/`:

- Lazy loading stron (`React.lazy` + `Suspense`), zwłaszcza Wydarzeń z pickerem. Bundle ok. 268 kB gzip.
- `/news/:id` po odświeżeniu pokazuje "news nie istnieje", bo store zapisuje tylko przypięte newsy.
