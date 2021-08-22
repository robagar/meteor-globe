import fetchline from "fetchline";

import { store } from "./store";

export interface MeteorData {}

export function initMeteors() {
  loadMeteors(
    "/meteor-globe/data/traj_summary_20210812_solrange_140.0-141.0.txt"
  ).catch((e) => {
    console.error("[meteors] load failed", e);
  });
}

// column indices
// +/-  ;   RAapp  ;   +/-  ;   DECapp ;   +/-  ;  Azim +E ;   +/-  ;    Elev  ;   +/-  ;
//   Vinit  ;    +/- ;    Vavg  ;    +/- ;
//    LatBeg   ;   +/-  ;    LonBeg   ;   +/-  ;   HtBeg ;   +/-  ;    LatEnd   ;   +/-  ;    LonEnd   ;   +/-  ;   HtEnd ;   +/-  ; Duration;  Peak ;  Peak Ht;   F  ;  Mass kg;
const BEGIN_UTC_TIME = 1;
const IAU_CODE = 3;
const BEGIN_LATITUDE = 60;
const BEGIN_LONGITUDE = 62;
const BEGIN_HEIGHT = 64;
const END_LATITUDE = 66;
const END_LONGITUDE = 68;
const END_HEIGHT = 70;
const DURATION = 72;
const PEAK_HEIGHT = 74;
const MASS = 76;
const STATION_CODES = 82;

async function loadMeteors(url: string) {
  for await (let line of fetchline(url)) {
    if (line.length === 0) continue;
    if (line[0] === "\r") line = line.slice(1); // fetchline bug?
    if (line[0] === "#") continue; // comment, probably column headers

    const fields = line.split(";");

    const s = (i: number): string => {
      const f = fields[i];
      return f ? f.trim() : "";
    };

    const f = (i: number): number => {
      return parseFloat(s(i));
    };

    const beginUTC = s(BEGIN_UTC_TIME);
    const showerCode = s(IAU_CODE);
    const beginLatitude = f(BEGIN_LATITUDE);
    const beginLongitude = f(BEGIN_LONGITUDE);
    const beginHeight = f(BEGIN_HEIGHT);
    const mass = f(MASS);
    const stationCodes = s(STATION_CODES);

    if (stationCodes.includes("UK")) {
      console.info(
        beginUTC,
        showerCode,
        beginLatitude,
        beginLongitude,
        beginHeight,
        mass,
        stationCodes
      );
      store.update((s) => {
        s.meteors.push({ beginLatitude, beginLongitude, beginHeight });
      });
    }
  }
}
