import parse from "csv-parse/lib/sync";
import { Degrees } from "../3d/geometry";
import { store } from "../store";

export interface CameraData {
  identifier: string;
  latitude: Degrees;
  longitude: Degrees;
}

export async function loadCameras(url: string): Promise<CameraData[]> {
  const response = await fetch(url);
  if (response.ok) {
    const csv = await response.text();
    // console.info("cameras csv", csv);

    const records = parse(csv, { columns: true });
    return records.map((r: any) => ({
      identifier: r.camera_id,
      latitude: r.obs_latitude,
      longitude: r.obs_longitude,
    }));
  } else return Promise.reject(response.statusText);
}

export function initCameras() {
  loadCameras("/meteor-globe/data/cameradetails.csv")
    .then((cameras) => {
      // console.info("[cameras]", cameras);
      store.update((s) => {
        const m = s.markers;
        for (const c of cameras) {
          m.set(c.identifier, { ...c, label: c.identifier });
        }
      });
    })
    .catch((e) => {
      console.error("[cameras] load failed", e);
    });
}
