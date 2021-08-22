import { Store } from "pullstate";
import { enableMapSet } from "immer";

import { MarkerProps } from "./Marker";

enableMapSet();

export const store = new Store({
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
});
