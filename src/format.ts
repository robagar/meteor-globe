import { DateTime } from "luxon";
import { sexagesimal } from "astronomia";

import { radians } from "./3d/geometry";
import { LatLongHt, Degrees, Kms } from "./interfaces";

function toDateTime(s: string): DateTime {
  return DateTime.fromISO(s.replace(" ", "T"), {
    zone: "UTC",
  });
}

export function formatDateTime(s: string) {
  const t = toDateTime(s);
  return t.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS) + " UTC";
}

export function formatDateTimeRange(from: string, to: string) {
  const f = toDateTime(from).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
  const t = toDateTime(to).toLocaleString(DateTime.TIME_WITH_SECONDS);
  return `${f} → ${t} UTC`;
}

const heightFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 1,
});

export function formatLatLongHt(p: LatLongHt): string {
  const lat = formatAngle(p.latitude, "N", "S");
  const long = formatAngle(p.longitude, "E", "W");
  const h = heightFormatter.format(p.height);
  return `${lat} ${long}, ${h}km`;
}

export function formatAngleDMS(
  angle: Degrees,
  positiveSuffix: string,
  negativeSuffix: string,
  precision: number = 2
) {
  const a = new sexagesimal.Angle(Math.abs(radians(angle)));
  const suffix = angle >= 0 ? positiveSuffix : negativeSuffix;
  return `${a.toString(precision)}${suffix}`;
}

const degreesFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 2,
});

export function formatAngle(
  angle: Degrees,
  positiveSuffix: string,
  negativeSuffix: string
) {
  const a = degreesFormatter.format(Math.abs(angle));
  const suffix = angle >= 0 ? positiveSuffix : negativeSuffix;
  return `${a}${suffix}`;
}

const speedFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 0,
});

export function formatSpeed(speed: Kms): string {
  const s = speedFormatter.format(speed);
  return `${s}kms⁻¹`;
}
