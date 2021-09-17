import { DateTime } from "luxon";
// import { base, julian, solar } from "astronomia";
import { MeteorDataInfo } from "./meteors";

const URL_BASE = "https://globalmeteornetwork.org/data/traj_summary_data/";

// const GMN_EARLIEST_DATE = DateTime.fromISO("2020-09-18").toJSDate();

const DAILY_URL_REGEX =
  /<a href="(?<filename>traj_summary_(?<date>\d{8})_solrange_(?<solarLongitudeFrom>\d{3}.\d)-(?<solarLongitudeTo>\d{3}.\d).txt)">/g;

export class GMN {
  url(filename: string) {
    return URL_BASE + filename;
  }

  dailyMeteorsUrl(date: DateTime) {
    // const jde = julian.DateToJDE(date.toJSDate());
    // const c = base.J2000Century(jde);
    // const { lon } = solar.true2000(c);
    // const l = Math.ceil((180 * lon) / Math.PI);
    // const d = date.toFormat("yyyyMMdd");
    // const f = `daily/traj_summary_${d}_solrange_${l}.0-${l + 1}.0.txt`;
    // console.info(date, jde, c, lon);
    // console.info(d, l, f);

    const d = date.toFormat("yyyyMMdd");
    const f = this._dailyFileNamesByDate.get(d);
    if (f) return this.url(`daily/${f}`);
    throw Error(`No daily data available for ${date}`);
  }

  dailyMeteorsInfo(date: DateTime): MeteorDataInfo {
    return {
      title: "Daily " + date.toLocaleString(DateTime.DATE_FULL),
      url: this.dailyMeteorsUrl(date),
    };
  }

  private _dailyFileNamesByDate = new Map<string, string>();
  private _dailyInitialized = false;

  get dailyInitialized() {
    return this._dailyInitialized;
  }

  async initDailyMeteorsAvailable() {
    if (!this._dailyInitialized) {
      try {
        const r = await fetch(URL_BASE + "daily/");
        // console.info(r);
        if (r.ok) {
          const s = await r.text();
          // console.info(s);
          const ms = s.matchAll(DAILY_URL_REGEX);
          for (const m of ms) {
            if (m.groups) {
              const date = m.groups["date"];
              const filename = m.groups["filename"];
              console.info(date, filename);
              this._dailyFileNamesByDate.set(date, filename);
            }
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        this._dailyInitialized = true;
      }
    }
  }

  dailyMeteorsAvailable(date: DateTime): boolean {
    const d = date.toFormat("yyyyMMdd");
    return this._dailyFileNamesByDate.has(d);
  }
}
