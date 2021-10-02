import { Box, Typography, Toolbar, IconButton } from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import { ShowerFilter } from "./filter/ShowerFilter";
import { MagnitudeFilter } from "./filter/MagnitudeFilter";
import { StationPrefixFilter } from "./filter/StationPrefixFilter";
import { StationFilter } from "./filter/StationFilter";

interface Props {
  onClose: () => void;
}

export function Filter(props: Props) {
  const { onClose } = props;

  return (
    <Box sx={{ width: 300 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Filter</Typography>
        <IconButton onClick={onClose}>
          <ChevronRightRoundedIcon />
        </IconButton>
      </Toolbar>
      <ShowerFilter />
      <MagnitudeFilter />
      <StationPrefixFilter />
      <StationFilter />
    </Box>
  );
}
