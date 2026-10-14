# 09 – Pickery i date-fns 4

**Cel:** zamienić `@material-ui/pickers` + `@date-io/date-fns` 1.x na `@mui/x-date-pickers`; podnieść `date-fns`.

## Zakres

- Jedyny plik: `pages/Events/index.tsx` (`MuiPickersUtilsProvider`, `DatePicker`, typ `MaterialUiPickersDate`).
- Dodać `@mui/x-date-pickers` + adapter (`AdapterDateFns`); usunąć `@material-ui/pickers`, `@date-io/date-fns`.
- `LocalizationProvider` z `adapterLocale` zależnym od języka z `ConfigStore` (locale z `date-fns/locale`).
- `date-fns` 2 → 4: sprawdzić zgodność z wybraną wersją `@mui/x-date-pickers` (starsze wymagają date-fns 2/3); w razie rozjazdu zostać na wspieranej wersji i zapisać decyzję.
- Typ `MaterialUiPickersDate` → `Date | null`.

## Kryteria akceptacji

- Wybór daty na ekranie Events działa i filtruje jak wcześniej, w obu językach, z poprawnym początkiem tygodnia.

## Commit

`feat: replace material-ui pickers with mui x date pickers`
