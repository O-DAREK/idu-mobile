# 06 – MUI v5 → najnowsze

**Cel:** `@mui/material` i `@mui/icons-material` 5.18 → najnowsza główna (w dniu analizy 9.5).
Każda wersja główna to osobny commit (v6, v7, v9) zgodnie z oficjalnym migration guide.

**Stan (2026-10-20):** v6 i v7 zrobione, w tym przejście z `GridLegacy` na `Grid`/`Stack`
(pikselowo bez zmian). MUI nie wydało v8 (skok 7 → 9). Kolejność dalej: task 07 (pickery 9 działają
z `@mui/material` ^7.3 || ^9) na v7, potem v9. `@mui/codemod@latest` się wywraca
(`yargs.command is not a function`), zmiany robione ręcznie.

## Zakres (z kodu)

- MUI jest używane w 33 plikach w `src/`, w tym importy z beczki (`import { Grid } from '@mui/material'`)
  i ścieżką.
- **Grid** w wersji legacy (`item`, `xs={...}`, `container`): `pages/Login/index.tsx`,
  `pages/Messages/NewMessage.tsx`, `pages/Events/DayList.tsx`. W v7 stary Grid jest jako
  `GridLegacy`, a `Grid` to dawny Grid2 (`size={...}`, bez `item`). Przepisać na nowe API.
- **Przestarzałe propsy pól tekstowych:** `InputProps` w `pages/Messages/AutocompleteRecipients.tsx`,
  `inputProps` w `pages/Messages/MessageBox.tsx`. Zamienić na `slotProps.input` / `slotProps.htmlInput`.
- **Motyw** `src/styles/theme.ts` odtwarza wygląd v4 przez nadpisania (`MuiTextField` i `MuiFormControl`
  ze standardowym wariantem, kolory `MuiRadio`/`MuiCheckbox`/`MuiButton`, `MuiAppBar.enableColorOnDark`,
  `MuiPaper.backgroundImage`). Przy każdej wersji sprawdzić, czy nadpisania nadal działają.
  W v6+ dochodzi `colorSchemes`/CSS variables. Na razie zostajemy przy `palette.mode` z `ConfigStore`.
- `StyledEngineProvider injectFirst` w `App.tsx` i styled-components na komponentach MUI: sprawdzić
  kolejność stylów (specyficzność) po każdej wersji.
- Uruchomić codemody z `@mui/codemod` dla każdej wersji (`v6.0.0/...`, `v7.0.0/...` itd., według guide'a).
  Wynik przepuścić przez prettier.

## Kroki (powtarzane dla każdej wersji głównej)

1. Przeczytać migration guide danej wersji i zanotować zmiany, które nas dotyczą.
2. `yarn add @mui/material@^N @mui/icons-material@^N` (po uzgodnieniu). Sprawdzić peer deps
   `@mui/x-date-pickers`. Jeśli pickery 8 nie wspierają danej wersji, ten krok łączy się z taskiem 07.
3. Codemody, poprawki ręczne, tsc, testy, build.
4. Zrzuty ekranu przed i po (jasny i ciemny motyw, kolory akcentu) dla wszystkich ekranów.

## Ryzyka

- Cztery wersje główne to dużo zmian wizualnych w drobnych miejscach (spacing, typografia, kolory
  w ciemnym motywie). Porównywać zrzuty, nie tylko zielony build.
- Rozmiar bundla: sprawdzić `yarn analyze` przed i po.

## Kryteria akceptacji

- Wygląd zgodny z obecnym (v5 z nadpisaniami v4) albo różnice świadomie zaakceptowane przez właściciela.
- Brak ostrzeżeń MUI w konsoli. tsc, testy, build i smoke test przechodzą.

## Commit

`feat: upgrade mui to v6`, `feat: upgrade mui to v7`, ... (osobno dla każdej wersji)
