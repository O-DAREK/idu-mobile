# Plan modernizacji stacku

Branch: `chore/modernize-stack` (z `chore/claude-config`). Każdy task = osobny commit (lub kilka),
kolejność ma znaczenie. Statusy w tabeli poniżej aktualizujemy na bieżąco.

## Stan wyjściowy (2026-10-14)

CRA 5, React 16, TS 4.9, MobX 5 (dekoratory), MUI v4 + pickers 3, react-router 5, styled-components 5,
husky 4, Jest przez react-scripts. 66 plików w `src/`, 5 testów (wyłącznie store'y).

## Zasady

- Jedna zmiana wersji głównej na raz; po każdej: `npx tsc --noEmit`, `CI=true yarn test`, `yarn build`
  oraz ręczny smoke test z punktu "Smoke test" poniżej.
- `yarn add/remove` tylko po uzgodnieniu z właścicielem (zob. CLAUDE.md). Taski wskazują, jakie paczki
  i do jakich wersji; wersje docelowe sprawdzamy w momencie wykonania (`yarn outdated`).
- Nie edytujemy ręcznie `yarn.lock` ani `build/`.
- Komentarze w kodzie i commity po angielsku (Conventional Commits).
- Nie wykonujemy `git push`; push robi użytkownik.
- Komendy w taskach (`yarn test`, `yarn build`) dotyczą stanu sprzed taska 03; po migracji na Vite
  obowiązują nowe komendy z CLAUDE.md.

## Decyzje do potwierdzenia przed startem

1. **Vite + Vitest zamiast CRA/Jest** (task 03). CRA jest porzucony; to warunek sensownych aktualizacji dalej.
2. **React 18, nie 19** (task 04): MUI v4 nie wspiera 19. Podbicie do 19 jako opcjonalny task 14 po MUI v5.
3. **MUI v5 (`@mui/*`), nie v6/v7** w jednym kroku (task 08); dalsze podbicie opcjonalne w tasku 14.
4. **TypeScript 5.x, nie 7** (task 12) – natywny kompilator (7) dopiero gdy ekosystem go wspiera.
5. Zamiana `react-router-last-location` na własną implementację (task 07).

## Kolejność i zależności

| #   | Task                                                                       | Zależy od | Ryzyko  | Status |
| --- | -------------------------------------------------------------------------- | --------- | ------- | ------ |
| 00  | [Baseline i smoke test](00-baseline.md)                                    | –         | niskie  | [x]    |
| 01  | [Bezpieczne patch/minor + usunięcie nieużywanych](01-safe-bumps.md)        | 00        | niskie  | [x]    |
| 02  | [Husky 9 i Prettier 3](02-husky-prettier.md)                               | 01        | niskie  | [x]    |
| 03  | [Migracja CRA → Vite + Vitest + PWA](03-vite-vitest.md)                    | 02        | wysokie | [x]    |
| 04  | [React 18 (`createRoot`)](04-react-18.md)                                  | 03        | średnie | [x]    |
| 05  | [MobX 6](05-mobx-6.md)                                                     | 04        | średnie | [x]    |
| 06  | [MobX 7 i mobx-react-lite aktualne](06-mobx-latest.md)                     | 05, 12    | niskie  | [x]    |
| 07  | [react-router 6](07-react-router-6.md)                                     | 04        | wysokie | [x]    |
| 08  | [MUI v4 → v5](08-mui-v5.md)                                                | 04        | wysokie | [ ]    |
| 09  | [Pickery, date-fns 4](09-pickers-date-fns.md)                              | 08        | średnie | [ ]    |
| 10  | [styled-components 6](10-styled-components-6.md)                           | 04        | średnie | [x]    |
| 11  | [Pozostałe biblioteki](11-misc-libs.md)                                    | 03        | niskie  | [x]    |
| 12  | [TypeScript 5.x i tsconfig](12-typescript.md)                              | 03        | niskie  | [x]    |
| 13  | [Sprzątanie i dokumentacja](13-cleanup-docs.md)                            | 01–12     | niskie  | [ ]    |
| 14  | [Opcjonalnie: React 19, MUI najnowszy](14-optional-react-19-mui-latest.md) | 13        | średnie | [ ]    |

Po tasku 04 taski 05, 07, 08 (z 09) i 10 są wzajemnie niezależne i mogą iść w dowolnej kolejności.
Task 12 (TypeScript) najlepiej wykonać przed 06, bo MobX 7 może wymagać standardowych dekoratorów TS 5.

## Smoke test (ręczny, po każdym większym tasku)

Logowanie i wylogowanie; lista newsów → szczegóły newsa → powrót (BackBar); wiadomości: lista →
wątek → nowa wiadomość; wydarzenia (picker dat); ustawienia (język, motyw, kolory akcentu);
nawigacja dolnym paskiem i szufladą; tryb offline i komunikat o aktualizacji PWA (tylko build prod);
widok mobilny w DevTools.

## Odnotowane fakty z kodu

- `react-swipeable-views` jest w `package.json`, ale **nie jest importowany** – do usunięcia, nie wymiany.
- Dekoratory MobX (`@observable`, `@action`) w `ConfigStore`, `MessagesStore`, `MetaStore`, `NewsStore`;
  `configure({ enforceActions: 'always' })` w `stores/index.ts`.
- `Router.tsx`: `Switch`, `Redirect`, `Route path={[...]}`, `LastLocationProvider`; `useHistory` w 5 plikach, `useParams` w 2.
- MUI v4 w 33 plikach; `@material-ui/pickers` + `@date-io/date-fns` tylko w `pages/Events/index.tsx`.
- `serviceWorker.ts` to szablon CRA (workbox generowany przez react-scripts); `index.tsx` używa
  `ReactDOM.render` (także hack z `metaStore.Consumer`).
- `process.env.REACT_APP_API_ROOT` w `constants/urls.ts`, typ w `react-app-env.d.ts`.
- `public/_redirects` (hosting typu Netlify) – zachować w buildzie.
