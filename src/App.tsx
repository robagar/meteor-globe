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
  Drawer,
} from "@mui/material";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterLuxon";

import Div100vh from "react-div-100vh";
import { Settings as LuxonSettings } from "luxon";

import { initCameras } from "./data/cameras";
import {
  meteorDataInfoFromParams,
  loadMeteors,
  filterMeteors,
} from "./data/meteors";

import { MeteorInfo } from "./ui/MeteorInfo";
import { LoadMeteorsMenu } from "./ui/LoadMeteorsMenu";
import { LoadDailyMeteorsDialog } from "./ui/LoadDailyMeteorsDialog";
import { Filter } from "./ui/Filter";
import { Settings } from "./ui/Settings";

import { Globe } from "./3d/Globe";

import { MeteorDataInfo, MeteorData } from "./interfaces";
import { store } from "./store";
import { useGMN } from "./GMNProvider";
import { saveSettings } from "./settings";

import "./App.css";

LuxonSettings.defaultZone = "Europe/London";

const queryParams = new URLSearchParams(window.location.search);
export const formatter = new Intl.NumberFormat();

export default function App() {
  const [error, setError] = useState<string | undefined>();
  const markers = store.useState((s) => s.markers);
  const meteors = store.useState((s) => s.meteors);
  const selectedMeteor = store.useState((s) => s.selectedMeteor);
  const filter = store.useState((s) => s.filter);

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

  const [filterVisible, setFilterVisible] = useState(false);

  const [settingsVisible, setSettingsVisible] = useState(false);
  const settings = store.useState((s) => s.settings);
  store.subscribe((s) => s.settings, saveSettings);

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
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexGrow: 1,
              }}
            >
              <IconButton
                onClick={(event) => {
                  setMenuVisible(!menuVisible);
                  setMenuAnchorEl(event.currentTarget);
                }}
              >
                <MenuRoundedIcon />
              </IconButton>
              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                {loading && `Loading ${title}...`}
                {!loading && title}
                {numMeteors === 1 && ` — 1 meteor`}
                {numMeteors > 1 && ` — ${formatter.format(numMeteors)} meteors`}
              </Typography>
            </Box>
            <IconButton
              onClick={(event) => {
                setFilterVisible(!filterVisible);
              }}
            >
              <SearchRoundedIcon />
            </IconButton>
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
              filteredMeteors={filterMeteors(filter, meteors)}
              selectedMeteor={selectedMeteor}
              selectMeteor={(m: MeteorData) => {
                console.info("SELECT", m);
                store.update((s) => {
                  s.selectedMeteor = m;
                });
              }}
              settings={settings}
            />
            {selectedMeteor && <MeteorInfo meteor={selectedMeteor} />}
          </Box>
          <Box sx={{ position: "absolute", right: 24, bottom: 0 }}>
            <IconButton
              onClick={(event) => {
                setSettingsVisible(true);
              }}
            >
              <SettingsRoundedIcon />
            </IconButton>
          </Box>
          <Footer />
          <Drawer
            anchor="right"
            open={filterVisible}
            onClose={() => {
              setFilterVisible(false);
            }}
            variant="persistent"
          >
            <Filter
              onClose={() => {
                setFilterVisible(false);
              }}
            />
          </Drawer>
          <Drawer
            anchor="right"
            open={settingsVisible}
            onClose={() => {
              setSettingsVisible(false);
            }}
          >
            <Settings
              onClose={() => {
                setSettingsVisible(false);
              }}
            />
          </Drawer>
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
