import { Globe } from "./Globe";
import "./App.css";

import { store } from "./store";

function App() {
  const markers = store.useState((s) => s.markers);

  return (
    <div className="App">
      <Globe markers={markers} />
    </div>
  );
}

export default App;
