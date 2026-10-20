# 07 – Pickery 9

**Cel:** `@mui/x-date-pickers` 8.29 → 9 (najnowsza 9.x), zgodnie z wersją MUI z taska 06.

## Zakres (z kodu)

- Jedyne użycie to `src/pages/Events/index.tsx`:
  - `LocalizationProvider` z `AdapterDateFns` (date-fns 4) i lokalizacjami `pl`/`enUS` z `date-fns/locale`;
  - `MobileDatePicker` z `closeOnSelect`, ukrytym polem tekstowym i ukrytym toolbarem
    (`slotProps`), `slots={{ day: EventDay }}`;
  - `EventDay` opakowuje `PickersDay` w `Badge` dla dni z wydarzeniem całodniowym.

## Kroki

1. Przeczytać migration guide v8 → v9. Sprawdzić zwłaszcza nazwy slotów i propsów (`day`, `textField`,
   `toolbar`), import adaptera (`AdapterDateFns` vs `AdapterDateFnsV3`) i typy `PickersDayProps`.
2. Sprawdzić peer deps: wymagana wersja `@mui/material` i React.
3. `yarn add @mui/x-date-pickers@^9` (po uzgodnieniu), poprawki, tsc, testy, build.

## Kryteria akceptacji

- Kalendarz otwiera się z dolnego paska, wybór dnia zamyka go i przełącza listę.
- Kropka przy dniu z wydarzeniem całodniowym ("Wycieczka klasowa" w mockach) jest widoczna.
- Tłumaczenia pl/en działają, a motyw ciemny i kolor akcentu są zastosowane.

## Commit

`feat: upgrade date pickers to v9`
