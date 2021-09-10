import { useEffect } from "react";

import { AppBar, Toolbar, Typography, Box, Link } from "@mui/material";

import { Globe } from "./Globe";
import { MeteorInfo } from "./MeteorInfo";

import "./App.css";

import { store } from "./store";
import { initCameras } from "./cameras";
import { initMeteors, MeteorData } from "./meteors";

const formatter = new Intl.NumberFormat();

function Header() {
  const title = store.useState((s) => s.meteorDataInfo.title);
  const numMeteors = store.useState((s) => s.meteors.length);

  return (
    <AppBar color="transparent" sx={{ boxShadow: "none" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
          {numMeteors === 1 && ` — 1 meteor`}
          {numMeteors > 1 && ` — ${formatter.format(numMeteors)} meteors`}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

function Footer() {
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
  const selectedMeteor = store.useState((s) => s.selectedMeteor);

  useEffect(initCameras, []);
  useEffect(() => initMeteors(queryParams));

  return (
    <Box sx={{ height: "100vh", display: "flex", flexFlow: "column" }}>
      <Header />
      <Box sx={{ flex: "1 1 auto" }}>
        <Globe
          markers={[...markers.values()]}
          meteors={meteors}
          selectMeteor={(m: MeteorData) => {
            console.info("SELECT", m);
            store.update((s) => {
              s.selectedMeteor = m;
            });
          }}
        />
        {selectedMeteor && <MeteorInfo meteor={selectedMeteor} />}
      </Box>
      <Footer />
    </Box>
  );
}
