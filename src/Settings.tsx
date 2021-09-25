import {
  Box,
  Typography,
  Toolbar,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Slider,
} from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import { ActiveShowerData, MIN_MAGNITUDE, MAX_MAGNITUDE } from "./interfaces";
import { store } from "./store";
import { formatter } from "./App";

interface Props {
  onClose: () => void;
}

export function Settings(props: Props) {
  const { onClose } = props;

  const activeShowers = store.useState((s) => s.activeShowers);
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
          value={activeShowers.filter((s) => filter.showers.includes(s.shower))}
          input={<OutlinedInput label="Showers" />}
          renderValue={(selected) => {
            if (selected.length === 0) return "(none)";
            // if (selected.length === showers.length) return "(all)";
            const ss = [...selected];
            // ss.sort((a, b) => b.numMeteors - a.numMeteors);
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
              <Checkbox checked={filter.showers.includes(s.shower)} />
              <ListItemText>
                {s.shower.name}
                {" ("}
                {formatter.format(s.meteors.length)}
                {")"}
              </ListItemText>
            </MenuItem>
          ))}
        </Select>
        <Box sx={{ display: "flex", flexFlow: "row" }}>
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
        </Box>

        <Box sx={{ my: "16px", px: "24px" }}>
          <Slider
            min={MIN_MAGNITUDE}
            max={MAX_MAGNITUDE}
            value={[filter.magnitude.min, filter.magnitude.max]}
            valueLabelDisplay="auto"
            step={0.1}
            marks={[
              {
                value: MIN_MAGNITUDE,
                label: `${MIN_MAGNITUDE}`,
              },
              {
                value: 0,
                label: "Magnitude",
              },
              {
                value: MAX_MAGNITUDE,
                label: `${MAX_MAGNITUDE}`,
              },
            ]}
            onChange={(event, value, index) => {
              console.info(value);
              store.update((s) => {
                if (typeof value === "number") {
                  if (index === 0) s.filter.magnitude.min = value;
                  else s.filter.magnitude.max = value;
                } else {
                  s.filter.magnitude.min = value[0];
                  s.filter.magnitude.max = value[1];
                }
              });
            }}
          />
        </Box>
      </FormControl>
    </Box>
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
