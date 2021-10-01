import { MeteorData } from "../interfaces";
import "./MeteorTooltip.css";

export interface MeteorTooltipProps {
  meteor: MeteorData;
}

export function MeteorTooltip(props: MeteorTooltipProps) {
  const { meteor } = props;
  const { shower, beginTime, magnitude, duration, stationCodes } = meteor;

  return (
    <div className="meteorTooltip">
      <div className="showerCode">{shower.code}</div>
      <div className="beginTime">{beginTime}</div>
      <div className="magnitude">Mag {magnitude}</div>
      <div className="duration">{duration}s</div>

      <div className="stationCodes">{stationCodes.join(", ")}</div>
    </div>
  );
}
