import {
  Box,
  Stack,
  Typography,
  Toolbar,
  IconButton,
  FormControlLabel,
  Switch,
} from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import { store } from "../store";

interface Props {
  onClose: () => void;
}

export function Settings(props: Props) {
  const { onClose } = props;

  const { showClouds, light, cityLights, highResolutionTextures } =
    store.useState((s) => s.settings);

  return (
    <Box sx={{ width: 300 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Settings</Typography>
        <IconButton onClick={onClose}>
          <ChevronRightRoundedIcon />
        </IconButton>
      </Toolbar>

      <Stack direction="column" sx={{ px: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={highResolutionTextures}
              onChange={(event) => {
                store.update((s) => {
                  s.settings.highResolutionTextures = event.target.checked;
                });
              }}
            />
          }
          label="High resolution textures"
        />
        <FormControlLabel
          control={
            <Switch
              checked={showClouds}
              onChange={(event) => {
                store.update((s) => {
                  s.settings.showClouds = event.target.checked;
                });
              }}
            />
          }
          label="Clouds"
        />
        <FormControlLabel
          control={
            <Switch
              checked={light}
              onChange={(event) => {
                store.update((s) => {
                  s.settings.light = event.target.checked;
                });
              }}
            />
          }
          label="Light"
        />
        <FormControlLabel
          control={
            <Switch
              checked={cityLights}
              onChange={(event) => {
                store.update((s) => {
                  s.settings.cityLights = event.target.checked;
                });
              }}
            />
          }
          label="City lights"
        />
      </Stack>
    </Box>
  );
}
