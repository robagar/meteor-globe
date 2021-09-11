import { useEffect, useState, useCallback } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  IconButton,
  Menu,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Div100vh from "react-div-100vh";

import { Globe } from "./Globe";
import { MeteorInfo } from "./MeteorInfo";

import "./App.css";

import { store } from "./store";
import { initCameras } from "./cameras";
import {
  meteorDataInfoFromParams,
  loadMeteors,
  MeteorDataInfo,
  MeteorData,
  METEORS_YESTERDAY,
  METEORS_LATEST_DAILY,
} from "./meteors";

const queryParams = new URLSearchParams(window.location.search);
const formatter = new Intl.NumberFormat();

export default function App() {
  const [error, setError] = useState<string | undefined>();
  const markers = store.useState((s) => s.markers);
  const meteors = store.useState((s) => s.meteors);
  const selectedMeteor = store.useState((s) => s.selectedMeteor);

  useEffect(initCameras, []);

  const tryLoadMeteors = useCallback((info: MeteorDataInfo) => {
    loadMeteors(info).catch((e) => setError(`Failed to load meteors - ${e}`));
    store.update((s) => {
      s.selectedMeteor = undefined;
    });
  }, []);

  useEffect(() => {
    tryLoadMeteors(meteorDataInfoFromParams(queryParams));
  }, [tryLoadMeteors]);

  const Header = () => {
    const title = store.useState((s) => s.meteorDataInfo.title);
    const numMeteors = store.useState((s) => s.meteors.length);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

    return (
      <>
        <AppBar color="transparent" sx={{ boxShadow: "none" }}>
          <Toolbar>
            <IconButton
              onClick={(event) => {
                setMenuVisible(!menuVisible);
                setMenuAnchorEl(event.currentTarget);
              }}
            >
              <MenuRoundedIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
              {numMeteors === 1 && ` — 1 meteor`}
              {numMeteors > 1 && ` — ${formatter.format(numMeteors)} meteors`}
            </Typography>
          </Toolbar>
        </AppBar>
        <Menu
          open={menuVisible}
          onClose={() => setMenuVisible(false)}
          anchorEl={menuAnchorEl}
        >
          <MenuItem
            onClick={() => {
              tryLoadMeteors(METEORS_YESTERDAY);
              setMenuVisible(false);
            }}
          >
            {METEORS_YESTERDAY.title}
          </MenuItem>
          <MenuItem
            onClick={() => {
              tryLoadMeteors(METEORS_LATEST_DAILY);
              setMenuVisible(false);
            }}
          >
            {METEORS_LATEST_DAILY.title}
          </MenuItem>
        </Menu>
      </>
    );
  };

  return (
    <>
      <Snackbar open={error !== undefined}>
        <Alert severity="error" onClose={() => setError(undefined)}>
          {error}
        </Alert>
      </Snackbar>
      <Div100vh style={{ display: "flex", flexFlow: "column" }}>
        <Header />
        <Box sx={{ flex: "1 1 auto" }}>
          <Globe
            markers={[...markers.values()]}
            meteors={meteors}
            selectedMeteor={selectedMeteor}
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
      </Div100vh>
    </>
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
