# 11 – Pozostałe biblioteki

Każdy punkt to osobny, mały commit.

| Paczka                                | Docelowo                    | Uwagi                                                                                                             |
| ------------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `http-status-codes` (8 użyć)          | 2.x                         | API: `StatusCodes.X` zamiast `OK`/`NOT_FOUND` – zamienić importy.                                                 |
| `jwt-decode` (1 użycie)               | 4.x                         | Eksport nazwany `jwtDecode`; usunąć `@types/jwt-decode`.                                                          |
| `use-debounce` (1)                    | 10.x                        | Sprawdzić zmiany w API.                                                                                           |
| `node-interval-tree` (1)              | 2.x                         | Sprawdzić typy i API `search`.                                                                                    |
| `react-infinite-scroll-component` (2) | najnowsze zgodne z React 18 | Alternatywnie zastąpić `IntersectionObserver`-em.                                                                 |
| `use-async-react` (8 użyć)            | sprawdzić                   | Mała, możliwie porzucona biblioteka – ocenić, czy wymienić na własny hook (nowe zależności tylko po uzgodnieniu). |
| `eev`, `visible-height-css`           | sprawdzić                   | Mało popularne; ocenić zasadność.                                                                                 |
| `javascript-time-ago` (1)             | aktualne 2.x                | Lokalizacje – sprawdzić ładowanie językowe.                                                                       |

## Kryteria akceptacji

- tsc/testy zielone po każdym podbiciu; `yarn outdated` bez czerwonych pozycji poza świadomie odroczonymi.

## Commit

`chore: upgrade <package> to vX`
