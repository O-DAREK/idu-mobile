# 04 – React 18

**Cel:** React 18 z `createRoot`, bez wejścia na 19 (MUI v4 nie wspiera).

## Kroki

1. `react`, `react-dom` → 18.x; `@types/react`, `@types/react-dom` → 18.x.
2. `index.tsx`: `ReactDOM.render` → `createRoot(...).render(...)`; hack z `metaStore.Consumer` renderowanym w `document.createElement('noop')` zastąpić bezpośrednim wywołaniem `metaStore.theresAnUpdate()` (store jest dostępny bez kontekstu; sprawdzić, że to akcja MobX).
3. Typy: `React.FC` nie ma już niejawnego `children` – dodać `PropsWithChildren`/jawne `children` tam, gdzie TS zgłosi błąd (m.in. `BottomAppBar`, `Router`).
4. Biblioteki z peer `react@^16/17`: `use-async-react`, `react-infinite-scroll-component`, `@material-ui/*`, `mobx-react-lite` 2.x – dopuścić tylko jeśli faktycznie działają; wyniki zanotować w tym pliku.
5. Włączyć `StrictMode` w dev i sprawdzić podwójne efekty (fetch w store'ach).

## Ryzyka

- MUI v4 pod React 18: oficjalnie bez wsparcia, w praktyce działa; `StrictMode` generuje ostrzeżenia z `findDOMNode` (znikną po tasku 08).
- Automatic batching może zmienić kolejność renderów – testy store'ów nie pokryją UI, więc smoke test obowiązkowy.

## Kryteria akceptacji

- tsc/testy/build zielone, brak nowych ostrzeżeń w konsoli poza znanymi z MUI v4.

## Commit

`feat: upgrade to react 18 and createRoot`
