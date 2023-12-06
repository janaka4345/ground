import { RigidBody } from "@react-three/rapier";

export default function Ball(params) {
  return (
    <RigidBody
      colliders="ball"
      position={[0, 5, 0]}
      restitution={0.5}
      friction={1}
    >
      <mesh>
        <sphereGeometry args={[0.5, 10, 10]} />
        <meshBasicMaterial color={"red"} />
      </mesh>
    </RigidBody>
  );
}
