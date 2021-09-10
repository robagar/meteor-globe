import { MeteorData } from "./meteors";
import "./MeteorInfo.css";

export interface MeteorInfoProps {
  meteor: MeteorData;
}

export function MeteorInfo(props: MeteorInfoProps) {
  const { meteor } = props;
  const { showerCode, beginTime, magnitude, duration, stationCodes } = meteor;

  return (
    <div className="root">
      <div className="shower">{showerCode}</div>
      <div className="beginTime">{beginTime}</div>
      <div className="magnitude">Mag {magnitude}</div>
      <div className="duration">{duration}s</div>

      <div className="stationCodes">{stationCodes.join(", ")}</div>
    </div>
  );
}
