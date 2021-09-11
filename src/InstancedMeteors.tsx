import { useRef, useState } from "react";
import {
  Matrix4,
  Vector3,
  Quaternion,
  InstancedMesh,
  Color,
  Object3D,
  Camera,
} from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";

import { xyz, XYZ } from "./geometry";
import { MeteorData } from "./meteors";
import { MeteorTooltip } from "./MeteorTooltip";

const MIN_WIDTH = 0.1;
const MAG_ZERO_WIDTH = 2;

const DEFAULT_COLOR = new Color("white");
const HIGHLIGHTED_COLOR = new Color("goldenrod");
const SELECTED_COLOR = new Color("hotpink");

export interface InstancedMeteorsProps {
  data: MeteorData[];
  selectedMeteor?: MeteorData;
  selectMeteor: (meteor: MeteorData) => void;
}

export function InstancedMeteors(props: InstancedMeteorsProps) {
  const { data, selectedMeteor, selectMeteor } = props;

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vColor;

    void main() {
      vUv = uv;
      vColor = instanceColor;
      gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position,1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vColor;

    void main() {
      float x = vUv.x;
      float y = vUv.y;
      float c = (x < 0.5 ? x : (1.0 - x)) * 2.0;
      float p = 0.75;
      float l = y < p ? (y / p) : (1.0 - y) / (1.0 - p);
      float opacity = c * l;
      gl_FragColor = vec4(vColor, opacity);
    }
  `;

  const ref = useRef<InstancedMesh>();
  useFrame(({ camera }) => {
    // console.info("frame!", data.length);
    const mesh = ref.current;
    if (mesh) {
      for (const meteor of data) {
        const i = meteor.index;
        mesh.setMatrixAt(i, buildMeteorMatrix(meteor, camera.position));
        let color = DEFAULT_COLOR;
        if (meteor === selectedMeteor) color = SELECTED_COLOR;
        else if (i === hoverInstanceIdRef.current) color = HIGHLIGHTED_COLOR;
        mesh.setColorAt(i, color);
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
  });

  const [hover, setHover] = useState<MeteorData | undefined>(undefined);
  const hoverInstanceIdRef = useRef<number | undefined>();

  const { invalidate } = useThree();

  return (
    <>
      {data.length && (
        <instancedMesh
          ref={ref}
          args={[undefined, undefined, data.length]}
          onClick={(e) => {
            const i = e.instanceId;
            if (i !== undefined) {
              selectMeteor(data[i]);
              invalidate();
            }
          }}
          onPointerOver={(e) => {
            const i = e.instanceId;
            if (i !== undefined) {
              setHover(data[i]);
              if (hoverInstanceIdRef.current !== i) {
                hoverInstanceIdRef.current = i;
              }
            }
          }}
          onPointerOut={(e) => {
            setHover(undefined);
            if (hoverInstanceIdRef.current === e.instanceId) {
              hoverInstanceIdRef.current = undefined;
            }
          }}
        >
          <planeGeometry args={[1, 1]} />
          <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            transparent={true}
            depthWrite={false}
          />

          {hover && (
            <Html
              calculatePosition={(el, camera, size) =>
                calculateTooltipPosition(
                  el,
                  camera,
                  size,
                  () => hoverInstanceIdRef.current
                )
              }
            >
              <MeteorTooltip meteor={hover} />
            </Html>
          )}
        </instancedMesh>
      )}
    </>
  );
}

const v1 = new Vector3();
const m = new Matrix4();
function calculateTooltipPosition(
  el: Object3D,
  camera: Camera,
  size: { width: number; height: number },
  getIndex: () => number | undefined
) {
  const index = getIndex();

  if (el.parent instanceof InstancedMesh && index !== undefined) {
    el.parent.getMatrixAt(index, m);
  } else {
    // hide tooltip offscreen
    return [-9999999, -9999999];
  }
  const objectPos = v1.setFromMatrixPosition(m);
  objectPos.project(camera);
  const widthHalf = size.width / 2;
  const heightHalf = size.height / 2;
  return [
    objectPos.x * widthHalf + widthHalf,
    -(objectPos.y * heightHalf) + heightHalf,
  ];
}

function buildMeteorMatrix(
  meteor: MeteorData,
  cameraPosition: Vector3
): Matrix4 {
  const { begin, end, magnitude } = meteor;

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
