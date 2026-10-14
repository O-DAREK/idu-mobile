# 05 – MobX 6

**Cel:** MobX 5 → 6 przy zachowaniu stylu dekoratorów (minimalny diff).

## Kroki

1. `mobx` → 6.x, `mobx-react-lite` → 3.x (zgodne z MobX 6 i React 18; sprawdzić tabelę kompatybilności).
2. W store'ach z dekoratorami (`ConfigStore`, `MessagesStore`, `MetaStore`, `NewsStore`; pozostałe sprawdzić) dodać `makeObservable(this)` w konstruktorze. Przy polach z `!` (definite assignment) ustawić `useDefineForClassFields: false` w tsconfig.
3. `configure({ enforceActions: 'always' })` zostaje. Przejrzeć `runInAction` po `await` (wymóg CLAUDE.md).
4. Testy store'ów: uruchomić, poprawić ewentualne zależności od zachowania proxy/`toJS`.
5. Zostajemy przy dekoratorach (legacy `experimentalDecorators`), żeby nie mieszać zmian; przejście na `makeAutoObservable` to osobna decyzja.

## Ryzyka

- MobX 6 używa Proxy dla tablic/obiektów – kod zakładający zachowanie zwykłej tablicy może się różnić.
- Pominięty `makeObservable` = brak reaktywności bez błędu – testy i smoke test muszą to wyłapać.

## Kryteria akceptacji

- 5 testów store'ów zielone; smoke test (reaktywność UI) przechodzi.

## Commit

`feat: upgrade mobx to v6`
