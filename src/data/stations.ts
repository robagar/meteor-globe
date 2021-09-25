import { StationCode, StationData, MeteorData } from "../interfaces";

export function initStations(
  meteors: MeteorData[],
  stationsByCode: Map<string, StationData>
): StationData[] {
  const activeStationCodes = new Set<StationCode>();
  for (const m of meteors) {
    for (const code of m.stationCodes) {
      if (!stationsByCode.has(code)) {
        stationsByCode.set(code, { code });
      }
      activeStationCodes.add(code);
    }
  }

  const stations: StationData[] = [];
  for (const c of activeStationCodes) {
    stations.push(stationsByCode.get(c)!);
  }
  stations.sort((a, b) => a.code.localeCompare(b.code));
  console.info("[stations]", stations.length);
  return stations;
}
