import { useEffect } from "react";

import { Globe } from "./Globe";
import "./App.css";

import { store } from "./store";
import { initCameras } from "./cameras";
import { initMeteors } from "./meteors";

function App() {
  const markers = store.useState((s) => s.markers);
  const meteors = store.useState((s) => s.meteors);

  useEffect(initCameras, []);
  useEffect(initMeteors, []);

  return (
    <div className="App">
      <Globe markers={[...markers.values()]} meteors={meteors} />
    </div>
  );
}

export default App;
