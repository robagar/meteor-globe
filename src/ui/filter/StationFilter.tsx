import {
  FormControl,
  Stack,
  Button,
  InputLabel,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";

import { StationData } from "../../interfaces";
import { store } from "../../store";

export function StationFilter() {
  const stations = store.useState((s) => s.stations);
  const codes = store.useState((s) => s.filter.stations.codes);

  return (
    <>
      <FormControl sx={{ m: 1, width: 280 }}>
        <InputLabel id="stations-label">Stations</InputLabel>
        <Select
          labelId="stations-label"
          multiple
          value={stations.filter((s) => codes.includes(s.code))}
          input={<OutlinedInput label="Stations" />}
          renderValue={(selected) => {
            if (selected.length === stations.length) return "(all)";
            if (selected.length === 0) return "(none)";
            const ss = [...selected];
            const codes = ss.map((s) => s.code);
            return codes.join(", ");
          }}
          onChange={(event: SelectChangeEvent<StationData[]>) => {
            const { value } = event.target;
            if (typeof value === "string") return;
            store.update((s) => {
              s.filter.stations = {
                codes: value.map((s) => s.code),
                prefixes: "",
              };
            });
          }}
          MenuProps={MenuProps}
        >
          {stations.map((s) => (
            <MenuItem key={s.code} value={s as any}>
              <Checkbox checked={codes.includes(s.code)} />
              <ListItemText>{s.code}</ListItemText>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack direction="row">
        <Button
          onClick={() => {
            store.update((s) => {
              s.filter.stations = {
                codes: stations.map((s) => s.code),
                prefixes: "",
              };
            });
          }}
        >
          all
        </Button>
        <Button
          onClick={() => {
            store.update((s) => {
              s.filter.stations = {
                codes: [],
                prefixes: "",
              };
            });
          }}
        >
          none
        </Button>
      </Stack>
    </>
  );
}

const ITEM_HEIGHT = 54;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  autoFocus: false, // kludge to stop initial scoll to end
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6.5 + ITEM_PADDING_TOP,
      width: 280,
    },
  },
};
