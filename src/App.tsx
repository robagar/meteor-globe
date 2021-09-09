import { useEffect } from "react";

import Container from "@mui/material/Container";
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
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
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
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Globe markers={[...markers.values()]} meteors={meteors} />
        <Copyright />
      </Box>
    </Container>
  );
}
