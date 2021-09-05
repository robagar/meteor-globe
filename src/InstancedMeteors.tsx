import { useRef } from "react";
import { Matrix4, Vector3, Quaternion, InstancedMesh } from "three";
import { useFrame } from "@react-three/fiber";

import { xyz, XYZ } from "./geometry";
import { MeteorData } from "./meteors";

const MIN_WIDTH = 0.1;
const MAG_ZERO_WIDTH = 2;

export interface InstancedMeteorsProps {
  data: MeteorData[];
}

export function InstancedMeteors(props: InstancedMeteorsProps) {
  const { data } = props;

  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position,1.0);
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

  const color = [1, 1, 1];
  const uniforms = useRef({
    color: {
      value: color,
    },
  });

  const ref = useRef<InstancedMesh>();
  useFrame(({ camera }) => {
    const mesh = ref.current;
    if (mesh) {
      for (const meteor of data) {
        mesh.setMatrixAt(
          meteor.index,
          buildMeteorMatrix(meteor, camera.position)
        );
      }
      mesh.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, data.length]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        depthWrite={false}
        uniforms={uniforms.current}
      />
    </instancedMesh>
  );
}

function buildMeteorMatrix(
  meteor: MeteorData,
  cameraPosition: Vector3
): Matrix4 {
  const {
    // beginTime,
    // showerCode,
    begin,
    end,
    magnitude,
    // duration,
    // stationCodes,
  } = meteor;

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

  // build matrix

  const view = position.clone().sub(cameraPosition).normalize();
  const perp = direction.clone().cross(view).normalize();
  const up = direction.clone().cross(perp).normalize();
  const right = direction.clone().cross(up);

  const rotation = new Matrix4();
  const xAxis = right;
  const yAxis = direction;
  const zAxis = up;
  rotation.makeBasis(xAxis, yAxis, zAxis);

  const quaternion = new Quaternion();
  quaternion.setFromRotationMatrix(rotation);

  const scale = new Vector3(width, length, 1);

  const m = new Matrix4();
  m.compose(position, quaternion, scale);
  return m;
}
