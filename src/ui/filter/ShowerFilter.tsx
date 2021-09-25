import {
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

import { ActiveShowerData } from "../../interfaces";
import { store } from "../../store";
import { formatter } from "../../App";

export function ShowerFilter() {
  const activeShowers = store.useState((s) => s.activeShowers);
  const filterShowers = store.useState((s) => s.filter.showers);

  return (
    <>
      <InputLabel id="showers-label">Showers</InputLabel>
      <Select
        labelId="showers-label"
        multiple
        value={activeShowers.filter((s) => filterShowers.includes(s.shower))}
        input={<OutlinedInput label="Showers" />}
        renderValue={(selected) => {
          if (selected.length === 0) return "(none)";
          const ss = [...selected];
          const names = ss.map((s) => s.shower.name);
          return names.join(", ");
        }}
        onChange={(event: SelectChangeEvent<ActiveShowerData[]>) => {
          const { value } = event.target;
          if (typeof value === "string") return;
          store.update((s) => {
            s.filter.showers = value.map((s) => s.shower);
          });
        }}
        MenuProps={MenuProps}
      >
        {activeShowers.map((s) => (
          <MenuItem key={s.shower.code} value={s as any}>
            <Checkbox checked={filterShowers.includes(s.shower)} />
            <ListItemText>
              {s.shower.name}
              {" ("}
              {formatter.format(s.meteors.length)}
              {")"}
            </ListItemText>
          </MenuItem>
        ))}
      </Select>
      <Stack direction="row">
        <Button
          onClick={() => {
            store.update((s) => {
              s.filter.showers = activeShowers.map((s) => s.shower);
            });
          }}
        >
          all
        </Button>
        <Button
          onClick={() => {
            store.update((s) => {
              s.filter.showers = [];
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
