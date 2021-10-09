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
}

export interface FilterData {
  showers: ShowerData[];
  magnitude: {
    min?: Magnitude;
    max?: Magnitude;
  };
  stations: {
    codes: StationCode[];
    prefixes: string;
  };
}

export interface ActiveShowerData {
  shower: ShowerData;
  meteors: MeteorData[];
}

export interface StationData {
  code: string;
  location?: {
    latitude: Degrees;
    longitude: Degrees;
  };
}

export interface CameraControlData {
  target: XYZ;
  up: XYZ;
  minDistance: Km;
  maxDistance: Km;
}

export interface SettingsData {
  showClouds: boolean;
  light: boolean;
  cityLights: boolean;
  highResolutionTextures: boolean;
}

export interface AppState {
  highlightedMarker: string;
  markers: Map<string, MarkerProps>;
  loading: boolean;
  meteorDataInfo: MeteorDataInfo;
  meteors: MeteorData[];
  selectedMeteor: MeteorData | undefined;
  activeShowers: ActiveShowerData[];
  stationsByCode: Map<StationCode, StationData>;
  stations: StationData[];
  filter: FilterData;
  cameraControl: CameraControlData;
  settings: SettingsData;
}
