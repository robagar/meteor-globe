import { ShowerData } from "../interfaces";

const showers = require("./showers.json");
const showersByCode = new Map<string, ShowerData>();
for (const s of showers) {
  // console.info(s);
  showersByCode.set(s.code, { ...s, numMeteors: 0 });
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
    numMeteors: 0,
  };
  showersByCode.set(code, u);
  return u;
}

export function isSporadic(shower: ShowerData) {
  return shower.code === SPORADIC_CODE;
}
