import { Store } from "pullstate";
import { enableMapSet } from "immer";

import { AppState } from "./interfaces";
import { MarkerProps } from "./3d/Marker";

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
  showers: [],
  filter: {
    showers: [],
  },
  touched: 0,
});
