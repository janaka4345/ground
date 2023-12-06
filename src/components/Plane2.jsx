import { useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";
import { DoubleSide } from "three";

export default function Plane2(params) {
  const texture = useTexture("./Heightmap.png");
  const geometryRef = useRef();
  const materialRef = useRef();
  // const verticesCount = 100 * 3;

  // const positions = useMemo(() => {
  //   const positions = new Float32Array(verticesCount * 3);

  //   for (let i = 0; i < verticesCount * 3; i++)
  //     positions[i] = (Math.random() - 0.5) * 3;

  //   return positions;
  // }, []);
  useEffect(() => {
    console.log(materialRef);
  }, []);

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry ref={geometryRef} args={[10, 10, 20, 20]} />
        <meshStandardMaterial
          ref={materialRef}
          map={texture}
          displacementMap={texture}
          displacementScale={4}
          // wireframe
          // side={DoubleSide}
        />
      </mesh>
    </RigidBody>
  );
}
