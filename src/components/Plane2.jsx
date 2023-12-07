import { useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";
import { DoubleSide, PlaneGeometry } from "three";

export default function Plane2(params) {
  const texture = useTexture("./Heightmap.png");
  const meshRef = useRef();
  const geometryRef = useRef();
  const materialRef = useRef();
  // const verticesCount = 100 * 3;

  // const positions = useMemo(() => {
  //   const positions = new Float32Array(verticesCount * 3);

  //   for (let i = 0; i < verticesCount * 3; i++)
  //     positions[i] = (Math.random() - 0.5) * 3;

  //   return positions;
  // }, []);
  const heights = [];
  useEffect(() => {
    console.log(meshRef.current.geometry.attributes.uv.array.length);

    console.log(geometryRef.current.attributes.position.array.length);
    // =
    //   meshRef.current.geometry.attributes.uv.array;
  }, []);
  // const geo = useMemo(() => {
  //   for (
  //     var i = 0;
  //     i < meshRef.current.geometry.attributes.uv.array.length;
  //     i += 2
  //   ) {
  //     heights.push(meshRef.current.geometry.attributes.uv.array[i] * 4);
  //   }

  //   const geo = new PlaneGeometry(10, 10, 20, 20);
  //   // const f = chunk(heights, w).reverse().flat();
  //   const vertices = geo.attributes.position.array;
  //   for (var j = 0; j < vertices.length; j++) {
  //     vertices[j * 3 + 2] = heights[j];
  //   }
  //   return geo;
  // }, [texture]);

  return (
    <>
      <RigidBody type="fixed" colliders="">
        <mesh rotation={[-Math.PI / 2, 0, 0]} ref={meshRef}>
          <planeGeometry args={[10, 10, 20, 20]} ref={geometryRef} />
          <meshStandardMaterial
            color={"red"}
            ref={materialRef}
            map={texture}
            displacementMap={texture}
            displacementScale={4}
            // wireframe
            // side={DoubleSide}
          />
        </mesh>
      </RigidBody>
      {/*<RigidBody
        type="fixed"
        colliders="trimesh"
        restitution={0.5}
        friction={1}
      >
        <mesh
          position={[-20, 0, -20]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          geometry={geo}
        >
          <meshStandardMaterial color="yellowgreen" />
        </mesh>
      </RigidBody>{" "}
      */}
    </>
  );
}
