import { Box, Slider } from "@mui/material";

import { MIN_MAGNITUDE, MAX_MAGNITUDE } from "../../interfaces";
import { store } from "../../store";

export function MagnitudeFilter() {
  const { min, max } = store.useState((s) => s.filter.magnitude);

  return (
    <Box sx={{ my: "16px", px: "24px" }}>
      <Slider
        min={MIN_MAGNITUDE}
        max={MAX_MAGNITUDE}
        value={[min, max]}
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
  );
}
