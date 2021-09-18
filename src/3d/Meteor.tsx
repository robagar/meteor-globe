import { useRef, useState } from "react";
import { Mesh, Vector3, Matrix4 } from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

import { xyz } from "./geometry";
import { MeteorData, XYZ } from "../interfaces";

import "./Meteor.css";

export interface MeteorProps {
  data: MeteorData;
}

const MIN_WIDTH = 0.1;
const MAG_ZERO_WIDTH = 2;

const DEFAULT_COLOR = [1, 1, 1];
const HIGHLIGHTED_COLOR = [1.0, 0.27, 0.71]; // CSS hotpink #FF69B4

export function Meteor(props: MeteorProps) {
  const { beginTime, shower, begin, end, magnitude, duration, stationCodes } =
    props.data;

  const brightness = 1 - magnitude * 0.2;

  const tail = xyz(begin);
  const head = xyz(end);

  const [tx, ty, tz] = tail;
  const [hx, hy, hz] = head;

  const center: XYZ = [(tx + hx) / 2, (ty + hy) / 2, (tz + hz) / 2];
  const [cx, cy, cz] = center;
  const position = new Vector3(cx, cy, cz);

  const vector = new Vector3(
    head[0] - tail[0],
    head[1] - tail[1],
    head[2] - tail[2]
  );
  const length = vector.length();
  const width = Math.max(MIN_WIDTH, MAG_ZERO_WIDTH * brightness);
  const direction = vector.clone();
  direction.normalize();

  const ref = useRef<Mesh>();

  useFrame(({ camera }) => {
    const view = position.clone().sub(camera.position).normalize();
    const perp = direction.clone().cross(view).normalize();
    const up = direction.clone().cross(perp).normalize();
    const right = direction.clone().cross(up);

    const mesh = ref.current;
    if (mesh) {
      const m = new Matrix4();
      const xAxis = right;
      const yAxis = direction;
      const zAxis = up;
      m.makeBasis(xAxis, yAxis, zAxis);
      mesh.quaternion.setFromRotationMatrix(m);
    }
  });

  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 color;
    varying vec2 vUv;

    void main() {
      float x = vUv.x;
      float y = vUv.y;
      float c = (x < 0.5 ? x : (1.0 - x)) * 2.0;
      float p = 0.75;
      float l = y < p ? (y / p) : (1.0 - y) / (1.0 - p);
      float opacity = c * l;
      gl_FragColor = vec4(color, opacity);
    }
  `;

  const [highlighted, setHighlighted] = useState(false);
  const color = highlighted ? HIGHLIGHTED_COLOR : DEFAULT_COLOR;
  const uniforms = useRef({
    color: {
      value: color,
    },
  });
  uniforms.current.color.value = color;

  return (
    <mesh
      ref={ref}
      position={center}
      scale={[width, length, 1]}
      onPointerOver={(e) => setHighlighted(true)}
      onPointerOut={(e) => setHighlighted(false)}
    >
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        uniforms={uniforms.current}
      />
      {highlighted && (
        <Html>
          <div className="tooltip">
            <div className="shower">{shower.code}</div>
            <div className="beginTime">{beginTime}</div>
            <div className="magnitude">Mag {magnitude}</div>
            <div className="duration">{duration}s</div>

            <div className="stationCodes">{stationCodes.join(", ")}</div>
          </div>
        </Html>
      )}
    </mesh>
  );
}
