import fetchline from "fetchline";

import { store } from "../store";
import { MeteorDataInfo, MeteorData, FilterData } from "../interfaces";
import { getShower, buildActiveShowers } from "./showers";

export const DEFAULT_COLOR = [1, 1, 1];
export const HIGHLIGHTED_COLOR = [1.0, 0.27, 0.71]; // CSS hotpink #FF69B4

export const METEORS_YESTERDAY = {
  url: "https://globalmeteornetwork.org/data/traj_summary_data/daily/traj_summary_yesterday.txt",
  title: "Yesterday",
};

export const METEORS_LATEST_DAILY = {
  url: "https://globalmeteornetwork.org/data/traj_summary_data/daily/traj_summary_latest_daily.txt",
  title: "Latest Daily",
};

export function meteorDataInfoFromParams(
  params: URLSearchParams
): MeteorDataInfo {
  const test = params.get("test");
  if (test !== null) {
    switch (test) {
      case "one_perseid":
        return {
          url: "/meteor-globe/data/one_perseid.txt",
          title: "Test - One Perseid",
        };
      default:
        return {
          url: "/meteor-globe/data/traj_summary_20210812_solrange_140.0-141.0.txt",
          title: "Test - Lots of Perseids",
        };
    }
  }

  // default to all detected by GMN yesterday
  return METEORS_YESTERDAY;
}

export async function loadMeteors(info: MeteorDataInfo) {
  console.info("[meteors] LOAD", info.title, info.url);

  store.update((s) => {
    s.meteorDataInfo = info;
    s.loading = true;
    s.selectedMeteor = undefined;
    s.meteors = [];
    s.activeShowers = [];
  });

  try {
    const meteors = await fetchMeteorData(info.url);
    const activeShowers = buildActiveShowers(meteors);
    store.update((s) => {
      s.loading = false;
      s.meteors = meteors;
      s.activeShowers = activeShowers;
      s.filter.showers = activeShowers.map((a) => a.shower);
    });
  } finally {
    store.update((s) => {
      s.loading = false;
    });
  }
}

// column indices
const BEGIN_UTC_TIME = 1;
const IAU_CODE = 3;
const AVERAGE_SPEED = 58;
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
    const averageSpeed = f(AVERAGE_SPEED);
    const duration = f(DURATION);
    const magnitude = f(MAGNITUDE);
    const peakHeight = f(PEAK_HEIGHT);
    const mass = f(MASS);
    const stationCodes = s(STATION_CODES).split(",");

    const shower = getShower(showerCode);
    meteors.push({
      index: nextIndex++,
      beginTime,
      shower,
      begin,
      end,
      peakHeight,
      magnitude,
      duration,
      mass,
      averageSpeed,
      stationCodes,
    });
  }

  return meteors;
}

export function filterMeteors(
  filter: FilterData,
  meteors: MeteorData[]
): boolean[] {
  return meteors.map((m) => {
    const { shower, magnitude } = m;

    // by shower
    if (!filter.showers.includes(shower)) return false;

    // by magnitude
    if (magnitude < filter.magnitude.min) return false;
    if (magnitude > filter.magnitude.max) return false;

    return true;
  });
}
