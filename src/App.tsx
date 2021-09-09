import { useEffect } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import { Globe } from "./Globe";
import "./App.css";

import { store } from "./store";
import { initCameras } from "./cameras";
import { initMeteors } from "./meteors";

// function App() {
//   const queryParams = new URLSearchParams(window.location.search);

//   const markers = store.useState((s) => s.markers);
//   const meteors = store.useState((s) => s.meteors);

//   useEffect(initCameras, []);
//   useEffect(() => initMeteors(queryParams));

//   return (
//     <div className="App">
//       <Globe markers={[...markers.values()]} meteors={meteors} />
//     </div>
//   );
// }

// export default App;

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}{" "}
      <Link
        color="inherit"
        href="https://github.com/robagar/meteor-globe"
        target="_blank"
        rel="noopener"
      >
        Rob Agar
      </Link>
      {" (UK003C) "}
      {" — "}
      {"Meteor data from the "}
      <Link
        color="inherit"
        href="https://globalmeteornetwork.org/"
        target="_blank"
        rel="noopener"
      >
        Global Meteor Network
      </Link>
    </Typography>
  );
}

export default function App() {
  const queryParams = new URLSearchParams(window.location.search);

  const markers = store.useState((s) => s.markers);
  const meteors = store.useState((s) => s.meteors);

  useEffect(initCameras, []);
  useEffect(() => initMeteors(queryParams));

  return (
    <Box sx={{ height: "100vh", display: "flex", flexFlow: "column" }}>
      <Box sx={{ flex: "1 1 auto" }}>
        <Globe markers={[...markers.values()]} meteors={meteors} />
      </Box>
      <Copyright />
    </Box>
  );
}
