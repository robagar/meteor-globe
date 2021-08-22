import { useEffect } from "react";

import { Globe } from "./Globe";
import "./App.css";

import { store } from "./store";
import { initCameras } from "./cameras";

function App() {
  const markers = store.useState((s) => s.markers);

  useEffect(initCameras, []);

  return (
    <div className="App">
      <Globe markers={[...markers.values()]} />
    </div>
  );
}

export default App;
