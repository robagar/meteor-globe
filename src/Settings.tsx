import {
  Box,
  Typography,
  Toolbar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import { ShowerData } from "./interfaces";
import { store } from "./store";
import { formatter } from "./App";

interface Props {
  onClose: () => void;
}

export function Settings(props: Props) {
  const { onClose } = props;

  const showers = store.useState((s) => s.showers);
  const filter = store.useState((s) => s.filter);

  return (
    <Box sx={{ width: 300 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Settings</Typography>
        <IconButton onClick={onClose}>
          <ChevronRightRoundedIcon />
        </IconButton>
      </Toolbar>
      <FormControl sx={{ m: 1, width: 280 }}>
        <InputLabel id="showers-label">Showers</InputLabel>
        <Select
          labelId="showers-label"
          multiple
          value={filter.showers}
          input={<OutlinedInput label="Showers" />}
          renderValue={(selected) => {
            if (selected.length === 0) return "(none)";
            if (selected.length === showers.length) return "(all)";
            const ss = [...selected];
            ss.sort((a, b) => b.numMeteors - a.numMeteors);
            const names = ss.map((s) => s.name);
            return names.join(", ");
          }}
          onChange={(event: SelectChangeEvent<ShowerData[]>) => {
            const { value } = event.target;
            if (typeof value === "string") return;
            store.update((s) => {
              s.filter.showers = value;
            });
          }}
          MenuProps={MenuProps}
        >
          {showers.map((s) => (
            <MenuItem key={s.code} value={s as any}>
              <Checkbox checked={filter.showers.includes(s)} />
              <ListItemText>
                {s.name}
                {" ("}
                {formatter.format(s.numMeteors)}
                {")"}
              </ListItemText>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

const ITEM_HEIGHT = 54;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6.5 + ITEM_PADDING_TOP,
      width: 280,
    },
  },
};
