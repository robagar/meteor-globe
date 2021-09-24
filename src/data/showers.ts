import { MeteorData, ShowerData, ActiveShowerData } from "../interfaces";

const showers = require("./showers.json");
const showersByCode = new Map<string, ShowerData>();
for (const s of showers) {
  // console.info(s);
  showersByCode.set(s.code, s);
}

const SPORADIC_CODE = "...";
const SPORADIC = {
  code: SPORADIC_CODE,
  name: "(sporadic)",
  numMeteors: 0,
};

export function getShower(code: string): ShowerData {
  if (code === SPORADIC_CODE) return SPORADIC;

  const s = showersByCode.get(code);
  if (s) return s;

  // not in IAU list
  const u = {
    code,
    name: "(unknown)",
  };
  showersByCode.set(code, u);
  return u;
}

export function isSporadic(shower: ShowerData) {
  return shower.code === SPORADIC_CODE;
}

export function buildActiveShowers(meteors: MeteorData[]): ActiveShowerData[] {
  const map = new Map<ShowerData, ActiveShowerData>();

  for (const meteor of meteors) {
    const { shower } = meteor;
    const activeShower = map.get(shower);
    if (activeShower) {
      activeShower.meteors.push(meteor);
    } else {
      map.set(shower, {
        shower,
        meteors: [meteor],
      });
    }
  }

  const activeShowers = [...map.values()];
  activeShowers.sort((a, b) => b.meteors.length - a.meteors.length);
  return activeShowers;
}
