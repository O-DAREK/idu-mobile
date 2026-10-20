# 05 – React 19

**Cel:** react, react-dom, @types/react i @types/react-dom 18.3 → 19 (najnowsza 19.x).

## Kroki

1. Przed podbiciem: na React 18.3 przejrzeć ostrzeżenia w konsoli dev. 18.3 ostrzega o API
   usuniętych w 19 (`defaultProps` w komponentach funkcyjnych, string refs, legacy context,
   `findDOMNode`).
2. Sprawdzić `peerDependencies` przed instalacją:
   - **MUI v5.18 i `@mui/x-date-pickers` 8**: czy dopuszczają React 19. Jeśli nie, task 05 robimy
     razem z pierwszym krokiem taska 06;
   - `mobx-react-lite` 5, `react-infinite-scroll-component` 7, `styled-components` 6, `use-debounce` 10,
     `@emotion/react`.
3. `yarn add react@^19 react-dom@^19` + `yarn add -D @types/react@^19 @types/react-dom@^19`
   (po uzgodnieniu).
4. Typy:
   - `useRef()` wymaga argumentu (`useRef<T>(null)`);
   - `ReactElement['props']` to `unknown`;
   - globalny namespace `JSX` → `React.JSX`.

   Codemod: `npx types-react-codemod@latest preset-19 ./src`. Wynik przejrzeć ręcznie i przepuścić
   przez prettier.
5. Kod:
   - `React.FC` z `children` (już jawne od React 18);
   - `forwardRef` można zostawić, bo w 19 nadal działa (`ref` jako zwykły prop to opcja, nie wymóg).
6. Sprawdzić StrictMode: podwójne efekty i guard in-flight w `NewsStore` i `MessagesStore`.
7. React Compiler to osobna decyzja, domyślnie nie robimy go w tym tasku.

## Ryzyka

- Biblioteki, które jeszcze używają `findDOMNode` albo `element.ref`, wybuchną w runtime, nie w tsc.
  Przejść cały smoke test, zwłaszcza transitions MUI (Dialog, Snackbar, Drawer) i infinite scroll.

## Kryteria akceptacji

- tsc, testy, build i pełny smoke test przechodzą. Brak nowych błędów i ostrzeżeń w konsoli.

## Commit

`feat: upgrade to react 19`
