import { Box, Slider } from "@mui/material";

import { Magnitude } from "../../interfaces";
import { MIN_MAGNITUDE, MAX_MAGNITUDE } from "../../constants";
import { store } from "../../store";

export function MagnitudeFilter() {
  const { min = MIN_MAGNITUDE, max = MAX_MAGNITUDE } = store.useState(
    (s) => s.filter.magnitude
  );

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
            label: `< ${MIN_MAGNITUDE}`,
          },
          {
            value: 0,
            label: "Magnitude",
          },
          {
            value: MAX_MAGNITUDE,
            label: `> ${MAX_MAGNITUDE}`,
          },
        ]}
        onChange={(event, value, index) => {
          store.update((s) => {
            if (typeof value === "number") {
              if (index === 0)
                s.filter.magnitude.min = valueUnless(MIN_MAGNITUDE, value);
              else s.filter.magnitude.max = valueUnless(MAX_MAGNITUDE, value);
            } else {
              s.filter.magnitude.min = valueUnless(MIN_MAGNITUDE, value[0]);
              s.filter.magnitude.max = valueUnless(MAX_MAGNITUDE, value[1]);
            }
          });
        }}
      />
    </Box>
  );
}

function valueUnless(
  unless: Magnitude,
  value: Magnitude
): Magnitude | undefined {
  return value === unless ? undefined : value;
}
