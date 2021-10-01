import { Box, Stack, IconButton, Tooltip } from "@mui/material";
import CenterFocusStrongRoundedIcon from "@mui/icons-material/CenterFocusStrongRounded";

import { MeteorData } from "../interfaces";
import { isSporadic } from "../data/showers";
import "./MeteorInfo.css";

export interface MeteorInfoProps {
  meteor: MeteorData;
  focusMeteor: () => void;
}

export function MeteorInfo(props: MeteorInfoProps) {
  const { meteor, focusMeteor } = props;
  const {
    shower,
    beginTime,
    magnitude,
    duration,
    // averageSpeed,
    stationCodes,
  } = meteor;

  return (
    <Box className="root">
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <div>
          {!isSporadic(shower) && (
            <span className="showerCode">
              {shower.code}
              {" — "}
            </span>
          )}
          <span className="showerName">{shower.name}</span>
        </div>
        <Tooltip title="Focus view on this meteor">
          <IconButton
            onClick={() => {
              focusMeteor();
            }}
          >
            <CenterFocusStrongRoundedIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <div className="beginTime">{beginTime}</div>
      <div className="magnitude">Mag {magnitude}</div>
      <div className="duration">{duration}s</div>
      {/*<div className="averageSpeed">{averageSpeed}kms⁻¹</div>*/}
      <div className="stationCodes">{stationCodes.join(", ")}</div>
    </Box>
  );
}
