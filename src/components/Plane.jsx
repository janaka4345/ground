import { useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";

export default function Plane(params) {
  const bufferGeometryRef = useRef();
  const bufferAttributeRef = useRef();
  const planeRef = useRef();
  const texture = useTexture("./Heightmap.png");

  const positions = useMemo(() => {
    const position = new Float32Array(363);
    for (let i = 0; i < 363 / 3; i++) {
      position[i * 3 + 0] = planeRef.geometry.attributes.positions.array[i * 3];
      position[i * 3 + 1] = (Math.random() - 0.5) * 5;
      position[i * 3 + 2] =
        planeRef.geometry.attributes.positions.array[i * 3 + 2];
    }
    return position;
  }, []);
  useEffect(() => {
    console.log(texture);
    console.log(positions);
    // console.log("bg", bufferGeometryRef.current);
    // console.log("ba", bufferAttributeRef.current);
    // console.log("pl", planeRef.current);
    // planeRef.current.attributes.position.array[5] = 10;
  }, []);
  return (
    <RigidBody type="fixed">
      <mesh
      // rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry ref={planeRef} args={[10, 10, 10, 10]}>
          {/* <bufferGeometry ref={bufferGeometryRef}> */}
          {/* <bufferGeometry
        // attach={"geometry-attributes-position"}
        > */}
          <bufferAttribute
            ref={bufferAttributeRef}
            attach="attributes-position"
            count={363}
            itemSize={3}
            array={positions}
          />
          {/* </bufferGeometry> */}
          {/* </bufferGeometry> */}
        </planeGeometry>
        <meshBasicMaterial color="yellowgreen" wireframe />
      </mesh>
    </RigidBody>
  );
}
