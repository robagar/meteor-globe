import { MarkerProps } from "./3d/Marker";

export type Radians = number;
export type Degrees = number;
export type UTCTime = string;
export type ShowerCode = string;
export type Seconds = number;
export type Magnitude = number;
export type Kg = number;
export type StationCode = string;
export type Km = number;
export type Kms = number; // km/s

export type XYZ = [number, number, number];

export type LatLongHt = {
  latitude: Degrees;
  longitude: Degrees;
  height: Km;
};

export interface MeteorDataInfo {
  url: string;
  title: string;
}

export interface MeteorData {
  index: number;
  beginTime: UTCTime;
  shower: ShowerData;
  begin: LatLongHt;
  end: LatLongHt;
  peakHeight: Km;
  magnitude: Magnitude;
  duration: Seconds;
  mass: Kg;
  averageSpeed: Kms;
  stationCodes: StationCode[];
}

export interface ShowerData {
  code: string;
  name: string;
  numMeteors: number;
}

export interface AppState {
  highlightedMarker: string;
  markers: Map<string, MarkerProps>;
  loading: boolean;
  meteorDataInfo: MeteorDataInfo;
  meteors: MeteorData[];
  selectedMeteor: MeteorData | undefined;
  showers: ShowerData[];
  filter: {
    showers: ShowerData[];
  };
}
