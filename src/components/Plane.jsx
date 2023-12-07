import { useTexture } from "@react-three/drei";
import { HeightfieldCollider, RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";
import { PlaneGeometry } from "three";

export default function Plane(params) {
  const bufferGeometryRef = useRef();
  const bufferAttributeRef = useRef();
  const planeRef = useRef();
  const texture = useTexture("./Heightmap.png");
  const rapier = useRapier();
  let heights = [];
  // const verteces = planeRef.currrent.attributes.array;

  // console.log(verteces);

  const positions = useMemo(() => {
    const geo = new PlaneGeometry(10, 10, 10, 10);
    const vertices = geo.attributes.position.array;
    for (var j = 0; j < vertices.length; j++) {
      const height = Math.random() * 2;
      heights.push(height);
      vertices[j * 3 + 2] = height;
    }
    return geo;
  }, []);
  useEffect(() => {
    // console.log(texture);
    // console.log(positions);
    console.log(rapier);

    // for (let i = 0; i < 363 / 3; i++) {
    //   position[i * 3 + 0] = planeRef.current.attributes.position.array[i * 3];
    //   position[i * 3 + 1] = (Math.random() - 0.5) * 5;
    //   position[i * 3 + 2] =
    //     planeRef.current.attributes.position.array[i * 3 + 2];
    // }

    // console.log("bg", bufferGeometryRef.current);
    // console.log("ba", bufferAttributeRef.current);
    // console.log("pl", planeRef.current);
    // planeRef.current.attributes.position.array[5] = 10;
    // let example5 = rapier.rapier.ColliderDesc.heightfield(heights, 1);
    // let handle = rapier.world.createCollider(example5);
  }, []);
  return (
    <RigidBody type="fixed" colliders={false}>
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        geometry={positions}
      >
        <meshStandardMaterial color="yellowgreen" map={texture} />
      </mesh>
      <HeightfieldCollider args={[10, 10, 10, 2]} />
    </RigidBody>
  );
}
