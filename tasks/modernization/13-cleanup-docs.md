# 13 – Sprzątanie i dokumentacja

## Kroki

1. `yarn outdated` – brak pozycji bez świadomego uzasadnienia; `yarn why` dla duplikatów.
2. Usunąć `resolutions` z `package.json`, jeśli już zbędne (`@babel/runtime`).
3. Zaktualizować `README.md` (npm → yarn, `VITE_API_ROOT`, nowe komendy, wymagana wersja Node, `engines` / `.nvmrc`).
4. Zaktualizować `CLAUDE.md`: stack, komendy, struktura, usunąć sekcję `NODE_OPTIONS`, hook pre-commit, wersje MobX/MUI/router.
5. Zaktualizować `.gitignore`, `.env.example`.
6. Pełny smoke test na buildzie produkcyjnym (`vite preview`) + Lighthouse PWA; porównanie rozmiarów bundla z baseline (task 00).
7. Przejrzeć diff całego brancha (`/code-review`) i przygotować opis PR.

## Kryteria akceptacji

- Taski 01–12 odhaczone w README planu; dokumentacja zgodna ze stanem repo.

## Commit

`docs: update readme and claude.md for modernized stack`

## Wyniki (2026-10-20)

- `yarn outdated`: pozostałe pozycje świadomie odroczone – React 19 i MUI > 5 / x-date-pickers 9 (task 14), react-router 7, TypeScript 7 (natywny kompilator, ekosystem jeszcze nie gotowy).
- `resolutions` (`@types/react`) i `browserslist` (CRA) usunięte; `@types/node` → 24, `engines` + `.nvmrc`.
- Bundle (gzip JS): ~268 kB (`App` 204,5 + `index` 63,5) vs 219,5 kB w baseline CRA (+22%, głównie MUI v5 + emotion + x-date-pickers). Kandydat na osobny task: lazy loading stron (`React.lazy`), m.in. Events z pickerem.
- Smoke test na `yarn preview` (Chrome headless, mock API): wszystkie ekrany, przekierowania, deep linki po odświeżeniu, BackBar, dialogi potwierdzeń, picker (PL/EN, jasny/ciemny), autocomplete odbiorców, infinite scroll. Zrzuty przed/po zgodne.
- PWA: Lighthouse 12+ nie ma już kategorii PWA; sprawdzone ręcznie – service worker aktywny i kontroluje stronę, manifest OK, aplikacja i deep linki działają offline. Komunikat o aktualizacji SW nie był testowany (wymaga dwóch wdrożeń).
- `/code-review` brancha: poprawione dedupe w paginacji (współdzielenie trwającego zapytania), granice dnia na Events (DST, wydarzenia kończące się o północy), przywrócony `autoFocus` (MUI v5 nie ma już crasha z v4). Odroczone: typy `vitest/globals` widoczne w kodzie aplikacji (wymaga osobnego tsconfig dla testów).
