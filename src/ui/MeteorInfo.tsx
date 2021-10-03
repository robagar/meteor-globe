import { Box, Stack, IconButton, Tooltip } from "@mui/material";
import CenterFocusStrongRoundedIcon from "@mui/icons-material/CenterFocusStrongRounded";

import { MeteorData } from "../interfaces";
import { isSporadic } from "../data/showers";
import { formatDateTime, formatLatLongHt, formatSpeed } from "../format";

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
    begin,
    end,
    magnitude,
    duration,
    averageSpeed,
    stationCodes,
  } = meteor;

  return (
    <Box className="meteorInfo" sx={{ px: 1, pb: 1 }}>
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
      <div className="beginTime">{formatDateTime(beginTime)}</div>
      <div className="meteorDetails">
        {formatLatLongHt(begin)} → {formatLatLongHt(end)}
      </div>
      <table className="meteorDetails">
        <tbody>
          <tr>
            <th>Magnitude</th>
            <td>{magnitude}</td>
          </tr>
          <tr>
            <th>Duration</th>
            <td>{duration}s</td>
          </tr>
          <tr>
            <th>Average speed</th>
            <td>{formatSpeed(averageSpeed)}</td>
          </tr>
        </tbody>
      </table>
      <div className="stationCodes">{stationCodes.join(", ")}</div>
    </Box>
  );
}
