import { ShowerData } from "../interfaces";

const showersByCode = require("./showers.json");

const SPORADIC_CODE = "...";
const SPORADIC = {
  code: SPORADIC_CODE,
  name: "(sporadic)",
};

export function getShower(code: string): ShowerData {
  const s = showersByCode[code];
  if (s) return s;

  if (code === SPORADIC_CODE) return SPORADIC;

  // not in IAU list
  return {
    code,
    name: "(unknown)",
  };
}

export function isSporadic(shower: ShowerData) {
  return shower.code === SPORADIC_CODE;
}
