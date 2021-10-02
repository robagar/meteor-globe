import { FormControl, TextField } from "@mui/material";

import { StationData, StationCode } from "../../interfaces";
import { store } from "../../store";

export function StationPrefixFilter() {
  const stations = store.useState((s) => s.stations);
  const prefixes = store.useState((s) => s.filter.stations.prefixes);

  return (
    <FormControl sx={{ m: 1, width: 280 }}>
      <TextField
        label="Station prefixes"
        value={prefixes}
        onChange={(event) => {
          const prefixes = event.target.value.toUpperCase();
          store.update((s) => {
            s.filter.stations = { prefixes, codes: filter(stations, prefixes) };
          });
        }}
      />
    </FormControl>
  );
}

function filter(stations: StationData[], rawPrefixes: string): StationCode[] {
  rawPrefixes = rawPrefixes.trim();
  if (rawPrefixes === "") return stations.map((s) => s.code);

  const prefixes = rawPrefixes.split(/[^a-zA-Z0-9]+/);
  console.info(prefixes);

  const filtered = new Set<StationCode>();
  for (const prefix of prefixes) {
    for (const station of stations) {
      if (station.code.startsWith(prefix)) filtered.add(station.code);
    }
  }

  return [...filtered];
}
