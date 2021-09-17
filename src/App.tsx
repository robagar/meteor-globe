import { useEffect, useState, useCallback } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterLuxon";

import Div100vh from "react-div-100vh";
import { Settings } from "luxon";

import { Globe } from "./3d/Globe";
import { MeteorInfo } from "./ui/MeteorInfo";
import { LoadMeteorsMenu } from "./ui/LoadMeteorsMenu";
import { LoadDailyMeteorsDialog } from "./ui/LoadDailyMeteorsDialog";

import "./App.css";

import { store } from "./store";
import { initCameras } from "./data/cameras";
import {
  meteorDataInfoFromParams,
  loadMeteors,
  MeteorDataInfo,
  MeteorData,
} from "./data/meteors";
import { useGMN } from "./GMNProvider";

Settings.defaultZone = "Europe/London";

const queryParams = new URLSearchParams(window.location.search);
const formatter = new Intl.NumberFormat();

export default function App() {
  const [error, setError] = useState<string | undefined>();
  const markers = store.useState((s) => s.markers);
  const meteors = store.useState((s) => s.meteors);
  const selectedMeteor = store.useState((s) => s.selectedMeteor);

  useEffect(initCameras, []);

  const { gmn } = useGMN();

  const tryLoadMeteors = useCallback((info: MeteorDataInfo) => {
    loadMeteors(info).catch((e) => {
      console.error("loading", info, e);
      setError(`Failed to load ${info.title}`);
    });
  }, []);

  useEffect(() => {
    tryLoadMeteors(meteorDataInfoFromParams(queryParams));
  }, [tryLoadMeteors]);

  const Header = () => {
    const loading = store.useState((s) => s.loading);
    const title = store.useState((s) => s.meteorDataInfo.title);
    const numMeteors = store.useState((s) => s.meteors.length);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
    const [loadDailyMeteorsDialogOpen, setLoadDailyMeteorsDialogOpen] =
      useState(false);

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
              {loading && `Loading ${title}...`}
              {!loading && title}
              {numMeteors === 1 && ` — 1 meteor`}
              {numMeteors > 1 && ` — ${formatter.format(numMeteors)} meteors`}
            </Typography>
          </Toolbar>
        </AppBar>
        <LoadMeteorsMenu
          open={menuVisible}
          onClose={() => setMenuVisible(false)}
          anchorEl={menuAnchorEl}
          onLoadMeteors={(info: MeteorDataInfo) => {
            tryLoadMeteors(info);
            setMenuVisible(false);
          }}
          showLoadDailyDialog={() => {
            setLoadDailyMeteorsDialogOpen(true);
            setMenuVisible(false);
          }}
        />
        <LoadDailyMeteorsDialog
          open={loadDailyMeteorsDialogOpen}
          onClose={() => setLoadDailyMeteorsDialogOpen(false)}
          onLoadMeteors={(date) => {
            const info = gmn.dailyMeteorsInfo(date);
            console.info(info);
            tryLoadMeteors(info);
            setLoadDailyMeteorsDialogOpen(false);
          }}
        />
      </>
    );
  };

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
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
      </LocalizationProvider>
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
