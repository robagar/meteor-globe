import { SettingsData } from "./interfaces";

const SETTINGS = "settings";

const DEFAULT_SETTINGS = {
  showClouds: true,
  light: true,
  cityLights: false,
  highResolutionTextures: true,
};

export function saveSettings(settings: SettingsData) {
  localStorage.setItem(SETTINGS, JSON.stringify(settings));
}

export function loadSettings(): SettingsData {
  try {
    const s = localStorage.getItem(SETTINGS);
    if (s) return JSON.parse(s);
  } catch (e) {
    console.error("[settings] load failed", e);
  }
  return DEFAULT_SETTINGS;
}
