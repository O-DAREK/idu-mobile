# 02 – Husky 9 i Prettier 3

**Cel:** działający hook pre-commit zgodny z CLAUDE.md i aktualny formatter.

## Kroki

1. `husky` 4 → 9: usunąć sekcję `"husky"` z `package.json`, dodać skrypt `"prepare": "husky"`, utworzyć `.husky/pre-commit` uruchamiający `npx tsc --noEmit && CI=true yarn test`.
2. Zweryfikować, że hook faktycznie blokuje commit przy błędzie typów lub testu (świadomie zepsuć, sprawdzić, cofnąć).
3. `prettier` 2.8 → 3.x. `.prettierrc` ustawia `trailingComma: none` jawnie, więc zmiana domyślnej na `all` nie dotyczy. Przeformatować całość osobnym commitem, jeśli są różnice.
4. Rozważyć `lint-staged` tylko po uzgodnieniu (nowa paczka).

## Ryzyka

- Prettier 3 zmienia formatowanie niektórych konstrukcji – duży diff; dlatego osobny commit bez zmian logiki.

## Kryteria akceptacji

- Hook odpala tsc + testy; `npx prettier --check src` zielone.

## Commit

`chore: migrate husky to v9 and prettier to v3`
