import {
  Box,
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

  const { showClouds } = store.useState((s) => s.settings);

  return (
    <Box sx={{ width: 300 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Settings</Typography>
        <IconButton onClick={onClose}>
          <ChevronRightRoundedIcon />
        </IconButton>
      </Toolbar>

      <Box sx={{ px: 2 }}>
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
      </Box>
    </Box>
  );
}
