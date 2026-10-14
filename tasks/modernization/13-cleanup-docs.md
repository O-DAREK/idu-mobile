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
