import fetchline from "fetchline";

import { store } from "./store";
import { LatLongHt, Km } from "./geometry";

export type UTCTime = string;
export type ShowerCode = string;
export type Seconds = number;
export type Magnitude = number;
export type Kg = number;
export type StationCode = string;

export interface MeteorData {
  index: number;
  beginTime: UTCTime;
  showerCode: ShowerCode;
  begin: LatLongHt;
  end: LatLongHt;
  peakHeight: Km;
  magnitude: Magnitude;
  duration: Seconds;
  mass: Kg;
  stationCodes: StationCode[];
}

function meteorDataUrl(params: URLSearchParams) {
  const test = params.get("test");
  if (test !== null) {
    switch (test) {
      case "one_perseid":
        return "/meteor-globe/data/one_perseid.txt";
      default:
        return "/meteor-globe/data/traj_summary_20210812_solrange_140.0-141.0.txt";
    }
  }

  // default to all detected by GMN yesterday
  return "https://globalmeteornetwork.org/data/traj_summary_data/daily/traj_summary_yesterday.txt";
}

export function initMeteors(params: URLSearchParams) {
  const url = meteorDataUrl(params);
  fetchMeteorData(url)
    .then((meteors) => {
      store.update((s) => {
        s.meteors = meteors;
      });
    })
    .catch((e) => {
      console.error("[meteors] fetch failed", e);
      throw e;
    });
}

// column indices
const BEGIN_UTC_TIME = 1;
const IAU_CODE = 3;
const BEGIN_LATITUDE = 60;
const BEGIN_LONGITUDE = 62;
const BEGIN_HEIGHT = 64;
const END_LATITUDE = 66;
const END_LONGITUDE = 68;
const END_HEIGHT = 70;
const DURATION = 72;
const MAGNITUDE = 73;
const PEAK_HEIGHT = 74;
const MASS = 76;
const STATION_CODES = 82;

const NUM_COLUMNS = 83;

async function fetchMeteorData(url: string): Promise<MeteorData[]> {
  const meteors: MeteorData[] = [];
  let nextIndex = 0;
  for await (let line of fetchline(url)) {
    if (line.length === 0) continue;
    if (line[0] === "\r") line = line.slice(1); // fetchline bug?
    if (line[0] === "#") continue; // comment, probably column headers

    const fields = line.split(";");
    if (fields.length !== NUM_COLUMNS) continue;

    const s = (i: number): string => {
      const f = fields[i];
      return f ? f.trim() : "";
    };

    const f = (i: number): number => {
      return parseFloat(s(i));
    };

    const beginTime = s(BEGIN_UTC_TIME);
    const showerCode = s(IAU_CODE);
    const begin = {
      latitude: f(BEGIN_LATITUDE),
      longitude: f(BEGIN_LONGITUDE),
      height: f(BEGIN_HEIGHT),
    };
    const end = {
      latitude: f(END_LATITUDE),
      longitude: f(END_LONGITUDE),
      height: f(END_HEIGHT),
    };
    const duration = f(DURATION);
    const magnitude = f(MAGNITUDE);
    const peakHeight = f(PEAK_HEIGHT);
    const mass = f(MASS);
    const stationCodes = s(STATION_CODES).split(",");

    meteors.push({
      index: nextIndex++,
      beginTime,
      showerCode,
      begin,
      end,
      peakHeight,
      magnitude,
      duration,
      mass,
      stationCodes,
    });
  }

  return meteors;
}
