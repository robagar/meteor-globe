import {
  Box,
  Typography,
  Toolbar,
  IconButton,
  FormControl,
} from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

interface Props {
  onClose: () => void;
}

export function Settings(props: Props) {
  const { onClose } = props;

  return (
    <Box sx={{ width: 300 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Settings</Typography>
        <IconButton onClick={onClose}>
          <ChevronRightRoundedIcon />
        </IconButton>
      </Toolbar>
      <FormControl sx={{ m: 1, width: 280 }}></FormControl>
    </Box>
  );
}
