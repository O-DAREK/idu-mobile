# 01 – Porządki w zależnościach

**Cel:** usunąć trzy paczki: jedną deprecated i dwie porzucone, które można zastąpić platformą.
Żadna nowa paczka nie dochodzi.

## Zakres (z kodu)

### `@types/javascript-time-ago`

- Paczka jest oznaczona jako deprecated ("stub types definition"), bo `javascript-time-ago` ma własne typy.
- `yarn remove @types/javascript-time-ago`, a potem sprawdzić `npx tsc --noEmit`.
- Importy w `src/locales/index.ts` (`javascript-time-ago/locale/en`, `/pl`) muszą dalej mieć typy.

### `eev` → `EventTarget`

- Ostatnie wydanie w 2018, repo nieaktywne od 2019.
- Jedyne użycie to `src/components/BottomAppBar/events.ts`.
- Zastąpić modułową instancją `new EventTarget()`:
  - `emit` robi `dispatchEvent(new CustomEvent(name, { detail: data }))`;
  - `buildListen` robi `addEventListener` z wrapperem przekazującym `event.detail` i zwraca funkcję
    `removeEventListener` z tym samym wrapperem.
- **Publiczne API pliku (`emit`, `buildListen`, `EventNames`, `EventTypes`) zostaje bez zmian.**
  Wywołujący nie są ruszani.
- `yarn remove eev`.

### `visible-height-css` → `100dvh`

- Ostatnie wydanie w 2019. Ustawia zmienną `--visible-height` z JS, jako obejście `100vh` na mobilnych
  przeglądarkach.
- Jednostki `dvh` działają w Safari 15.4+, Chrome/Edge 108+ i Firefox 101+.
- Użycia do zmiany:
  - `src/App.tsx`: import, wywołanie `setVisibleHeight()`, `height: calc(100 * var(--visible-height, 1vh))`;
  - `src/components/BottomAppBar/index.tsx`: `min-height: calc(100 * var(--visible-height, 1vh))`;
  - `src/pages/Messages/SpecificMessages.tsx`: `min-height: calc(var(--visible-height, 1vh) * 100 - spacing)`.
- Zastąpić przez `100dvh` (np. `calc(100dvh - ...)`). Rozważyć fallback `100vh` w linii wyżej
  dla starszych przeglądarek.
- `yarn remove visible-height-css`.

## Ryzyka

- Zachowanie wysokości na telefonie przy chowającym się pasku adresu: `dvh` zmienia się dynamicznie,
  a poprzednia biblioteka liczyła wartość raz (lub przy `resize`). Sprawdzić przewijanie wątku
  wiadomości i dolny pasek.
- `CustomEvent` w jsdom: sprawdzić, czy testy (jeśli dotykają eventów) przechodzą.

## Kryteria akceptacji

- Trzy paczki zniknęły z `package.json`. tsc, testy i build przechodzą.
- Akcje z dolnego paska działają: kalendarz w Wydarzeniach, przywracanie ustawień, wysyłanie nowej wiadomości.
- Na widoku mobilnym w DevTools i (jeśli możliwe) na telefonie layout zajmuje pełną wysokość bez
  podwójnego paska przewijania.

## Commit

`chore: replace eev and visible-height-css with platform apis` oraz
`chore: remove deprecated javascript-time-ago types stub`
