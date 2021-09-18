import { MeteorData } from "../interfaces";
import { isSporadic } from "../data/showers";
import "./MeteorInfo.css";

export interface MeteorInfoProps {
  meteor: MeteorData;
}

export function MeteorInfo(props: MeteorInfoProps) {
  const { meteor } = props;
  const {
    shower,
    beginTime,
    magnitude,
    duration,
    // averageSpeed,
    stationCodes,
  } = meteor;

  return (
    <div className="root">
      <div>
        {!isSporadic(shower) && (
          <span className="showerCode">
            {shower.code}
            {" — "}
          </span>
        )}
        <span className="showerName">{shower.name}</span>
      </div>
      <div className="beginTime">{beginTime}</div>
      <div className="magnitude">Mag {magnitude}</div>
      <div className="duration">{duration}s</div>
      {/*<div className="averageSpeed">{averageSpeed}kms⁻¹</div>*/}
      <div className="stationCodes">{stationCodes.join(", ")}</div>
    </div>
  );
}
