# 06 – MobX 7 i aktualny mobx-react-lite

**Cel:** dojść do aktualnych wersji (na dzień audytu: mobx 7.0.6, mobx-react-lite 5.1.0).
**Zależność:** najlepiej po tasku 12 (TypeScript 5.x), bo MobX 7 może wymagać standardowych dekoratorów.

## Kroki

1. Przeczytać changelog / migration guide MobX 7 (zmiany względem 6, wymagania co do dekoratorów – standardowe vs legacy).
2. Podnieść `mobx` i `mobx-react-lite`; dopasować dekoratory do wymagań (jeśli wymagane standardowe dekoratory TS 5 – dostosować tsconfig; w razie problemów `makeObservable` z jawną mapą adnotacji).
3. Uruchomić testy i smoke test.

## Kryteria akceptacji

- Brak ostrzeżeń o peer deps; testy zielone.

## Commit

`chore: upgrade mobx and mobx-react-lite to latest`
