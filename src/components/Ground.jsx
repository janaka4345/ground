import { useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useMemo } from "react";
import getPixels from "get-image-pixels";
import { PlaneGeometry } from "three";

export function Ground({ displacementScale = 5, displacementOffset = 0 }) {
  const texture = useTexture("./Heightmap.png");

  var pixels = getPixels(texture.image);
  console.log(pixels);
  const heights = [];
  const w = texture.image.width;
  const h = texture.image.height;

  const geo = useMemo(() => {
    for (var i = 0; i < w * h * 4; i += 4) {
      heights.push((pixels[i] / 255) * displacementScale + displacementOffset);
    }

    const geo = new PlaneGeometry(w, h, w - 1, h - 1);
    // const f = chunk(heights, w).reverse().flat();
    const vertices = geo.attributes.position.array;
    for (var j = 0; j < vertices.length; j++) {
      vertices[j * 3 + 2] = heights[j];
    }
    return geo;
  }, [displacementOffset, displacementScale, texture]);

  if (!geo) return null;
  return (
    <>
      <RigidBody
        type="fixed"
        colliders="trimesh"
        restitution={0.5}
        friction={1}
      >
        <mesh
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          geometry={geo}
        >
          <meshStandardMaterial color="yellowgreen" map={texture} />
        </mesh>
      </RigidBody>
    </>
  );
}

// used to correct differing ordering between collider and mesh
// function chunk(arr, size) {
//   return arr.reduce(
//     (accumulator, currentValue, i) => (
//       i % size
//         ? accumulator[accumulator.length - 1].push(currentValue)
//         : accumulator.push([currentValue]),
//       accumulator
//     ),
//     [],
//   );
// }
