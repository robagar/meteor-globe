import { useRef, useState, ReactNode } from "react";
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

import { MeteorData, XYZ } from "../interfaces";
import { MeteorTooltip } from "../ui/MeteorTooltip";
import { xyz } from "./geometry";

const MIN_WIDTH = 0.1;
const MAG_ZERO_WIDTH = 2;

const DEFAULT_COLOR = new Color("white");
const HIGHLIGHTED_COLOR = new Color("goldenrod");
const SELECTED_COLOR = new Color("hotpink");

const BATCH_SIZE = 1000;

const ZERO_MATRIX = new Matrix4();

export interface InstancedMeteorsProps {
  data: MeteorData[];
  selectedMeteor?: MeteorData;
  selectMeteor: (meteor: MeteorData, focus: boolean) => void;
  filteredMeteors: boolean[];
}

export function InstancedMeteors(props: InstancedMeteorsProps) {
  const { data, selectedMeteor, selectMeteor, filteredMeteors } = props;

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

  const ref = useRef<any[]>([]);

  useFrame(({ camera }) => {
    // console.info("frame!", data.length);
    const meshes = ref.current;
    if (meshes) {
      for (let j = 0; j < meshes.length; ++j) {
        const mesh = meshes[j];
        if (mesh) {
          for (let i = 0; i < BATCH_SIZE; ++i) {
            const meteor = data[j * BATCH_SIZE + i];
            if (meteor) {
              mesh.setMatrixAt(
                i,
                filteredMeteors[i]
                  ? buildMeteorMatrix(meteor, camera.position)
                  : ZERO_MATRIX
              );
              let color = DEFAULT_COLOR;
              if (meteor === selectedMeteor) color = SELECTED_COLOR;
              else if (meteor === hover?.meteor) color = HIGHLIGHTED_COLOR;
              mesh.setColorAt(i, color);
            } else {
              mesh.setMatrixAt(i, ZERO_MATRIX);
            }
            mesh.instanceMatrix.needsUpdate = true;
            if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
          }
        }
      }
    }
  });

  const [hover, setHover] = useState<
    { batch: number; meteor: MeteorData; instanceId: number } | undefined
  >(undefined);

  const { invalidate } = useThree();

  const lastFilterMeteorsRef = useRef<boolean[]>([]);
  if (filteredMeteors !== lastFilterMeteorsRef.current) {
    lastFilterMeteorsRef.current = filteredMeteors;
    invalidate();
  }

  const renderBatch = (batch: number, offset: number) => {
    return (
      <instancedMesh
        key={`batch-${batch}`}
        ref={(mesh) => {
          if (ref.current) ref.current[batch] = mesh;
        }}
        args={[undefined, undefined, BATCH_SIZE /*data.length*/]}
        onClick={(e) => {
          if (e.instanceId !== undefined) {
            const i = e.instanceId + offset;
            selectMeteor(data[i], false);
            invalidate();
          }
          e.stopPropagation();
        }}
        onDoubleClick={(e) => {
          if (e.instanceId !== undefined) {
            const i = e.instanceId + offset;
            selectMeteor(data[i], true);
            invalidate();
          }
          e.stopPropagation();
        }}
        onPointerOver={(e) => {
          // console.info("onPointerOver", e.instanceId);
          const { instanceId } = e;
          if (instanceId !== undefined) {
            const i = instanceId + offset;
            const meteor = data[i];
            setHover({ batch, meteor, instanceId });
          }
        }}
        onPointerOut={(e) => {
          setHover(undefined);
        }}
      >
        <planeGeometry args={[1, 1]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent={true}
          depthWrite={false}
        />

        {hover && hover.batch === batch && (
          <Html
            calculatePosition={(el, camera, size) =>
              calculateTooltipPosition(el, camera, size, hover?.instanceId)
            }
          >
            <MeteorTooltip meteor={hover.meteor} />
          </Html>
        )}
      </instancedMesh>
    );
  };

  const batches: ReactNode[] = [];
  const n = data.length;
  const numBatches = Math.ceil(n / BATCH_SIZE);
  // console.info(
  //   `[InstanceMeteors] ${n} meteors in ${numBatches} batches of ${BATCH_SIZE}`
  // );
  for (let j = 0; j < numBatches; ++j) {
    batches.push(renderBatch(j, j * BATCH_SIZE));
  }

  return <>{batches}</>;
}

const v1 = new Vector3();
const m = new Matrix4();
function calculateTooltipPosition(
  el: Object3D,
  camera: Camera,
  size: { width: number; height: number },
  index: number | undefined
) {
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
