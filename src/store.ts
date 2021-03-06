import { Store } from "pullstate";
import { enableMapSet } from "immer";

import { MarkerProps } from "./3d/Marker";
import { AppState, StationData, StationCode } from "./interfaces";
import { loadSettings } from "./settings";
import { DEFAULT_CAMERA_CONTROL } from "./constants";

enableMapSet();

export const store = new Store<AppState>({
  highlightedMarker: "",
  markers: new Map<string, MarkerProps>([
    [
      "UK003C",
      {
        identifier: "UK003C",
        latitude: 50.224871,
        longitude: -4.949858,
        label: "UK003C",
      },
    ],
  ]),
  loading: true,
  meteorDataInfo: {
    url: "",
    title: "",
  },
  meteors: [],
  selectedMeteor: undefined,
  activeShowers: [],
  stationsByCode: new Map<StationCode, StationData>(),
  stations: [],
  filter: {
    showers: [],
    magnitude: { min: undefined, max: undefined },
    stations: {
      codes: [],
      prefixes: "",
    },
  },
  cameraControl: DEFAULT_CAMERA_CONTROL,
  settings: loadSettings(),
});
