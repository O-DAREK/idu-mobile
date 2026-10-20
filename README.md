# idu-mobile

Mobile web client (PWA) for the IDU system.

Stack: Vite 8, React 19, TypeScript 7, MobX 7, MUI v6, styled-components 6, react-router 8, Vitest.

### run locally

- Install [Node.js](https://nodejs.org/en/download/) 24 (see `.nvmrc`; Vite 8 needs `^20.19.0 || >=22.12.0`) and [yarn](https://classic.yarnpkg.com/) 1
- Clone repo: `git clone https://github.com/TPISLO/idu-mobile.git && cd idu-mobile`
- Install dependencies: `yarn`
- Populate a `.env` following the `.env.example`:
  - `VITE_API_ROOT` – address of the IDU API
  - `VITE_MOCK_API=true` – optional, uses an in-memory fake API instead (any login works)
- Run: `yarn start`

### scripts

- `yarn start` – dev server
- `yarn build` – production build into `build/`
- `yarn preview` – serve the production build (the service worker only runs here)
- `yarn test` – tests in watch mode; `CI=true yarn test` runs them once
- `yarn typecheck` – type check (app code and tests)
- `yarn analyze` – build and inspect bundle sizes
