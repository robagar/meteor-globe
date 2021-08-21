import { Globe } from "./Globe";
import "./App.css";

function App() {
  const markers = [
    { latitude: 50.224871, longitude: -4.949858, label: "UK003C" },
  ];

  return (
    <div className="App">
      <Globe markers={markers} />
    </div>
  );
}

export default App;
