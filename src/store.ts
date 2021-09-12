import { Store } from "pullstate";
import { enableMapSet } from "immer";

import { MarkerProps } from "./3d/Marker";
import { MeteorData, MeteorDataInfo } from "./data/meteors";

enableMapSet();

export const store = new Store({
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
  meteorDataInfo: {
    url: "",
    title: "Loading meteors...",
  } as MeteorDataInfo,
  meteors: [] as MeteorData[],
  selectedMeteor: undefined as MeteorData | undefined,
});
