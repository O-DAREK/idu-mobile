# 03 – Migracja CRA → Vite + Vitest + PWA

**Cel:** zastąpić porzucone `react-scripts` nowoczesnym toolchainem; odblokować kolejne aktualizacje.
**Wymaga zgody** (dodanie/usunięcie wielu paczek).

## Kroki

1. Dodać: `vite`, `@vitejs/plugin-react`, `vite-tsconfig-paths` (importy absolutne z `baseUrl: src`), `vitest`, `jsdom`, `vite-plugin-pwa` (zastępuje workbox z CRA); `jest-fetch-mock` sprawdzić pod Vitest, w razie problemów `vitest-fetch-mock`.
2. `index.html` przenieść z `public/` do roota, dodać `<script type="module" src="/src/index.tsx">`, zamienić `%PUBLIC_URL%`.
3. `vite.config.ts`: `build.outDir = 'build'` (zachować nazwę – `.gitignore`, hosting), `test.environment = 'jsdom'`, `setupFiles: src/setupTests.ts`, `globals: true`; dekoratory MobX 5 muszą działać (`experimentalDecorators` w tsconfig, esbuild je respektuje).
4. Zmienne środowiskowe: `REACT_APP_API_ROOT` → `VITE_API_ROOT` (`constants/urls.ts`, `.env.example`, `.env`, typy: `react-app-env.d.ts` → `vite-env.d.ts`, README). `process.env.NODE_ENV` → `import.meta.env.MODE` / `PROD`.
5. PWA: zastąpić `serviceWorker.ts` rejestracją z `vite-plugin-pwa` (`registerType: 'prompt'`, callback `onNeedRefresh` w miejsce `onUpdate` + `SKIP_WAITING`); odtworzyć efekt dotychczasowego hacka z `metaStore.theresAnUpdate()` w `index.tsx`. `manifest.json` przenieść do konfiguracji pluginu albo zostawić w `public/`.
6. `public/_redirects` ma trafić do `build/` bez zmian.
7. Testy: przepisać ewentualne `jest.*` → `vi.*`, usunąć `"jest"` z `package.json`; `resetMocks: false` odwzorować w konfiguracji Vitest.
8. Skrypty: `start` → `vite`, `build` → `vite build`, `test` → `vitest`, `analyze` → `vite-bundle-visualizer` lub `source-map-explorer` na `build/assets/*.js`.
9. Usunąć `react-scripts`, `eslintConfig: react-app` (ESLint flat config to osobna decyzja), `resolutions.@babel/runtime`, `react-app-env.d.ts`, `serviceWorker.ts` oraz obejście `NODE_OPTIONS` z CLAUDE.md.
10. Zaktualizować komendy w CLAUDE.md i hook z taska 02.

## Ryzyka

- Service worker/PWA: najłatwiej o regresję cache i aktualizacji – testować na buildzie prod (`vite preview`), w tym scenariusz "nowa wersja → komunikat → odświeżenie".
- Różnice w ścieżkach statycznych (`import` zasobów z `assets/`), `lazy(() => import('App'))` z importem absolutnym.
- Hosting oczekuje katalogu `build/`.

## Kryteria akceptacji

- `yarn start`, `yarn build`, `yarn preview`, `yarn test` działają; 5 testów store'ów przechodzi bez zmian logiki; PWA instaluje się i aktualizuje; rozmiar bundla porównany z baseline.

## Commit

`chore: migrate from create-react-app to vite and vitest`
