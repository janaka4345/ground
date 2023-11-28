import { RigidBody } from "@react-three/rapier";

export default function Ball(params) {
  return (
    <RigidBody colliders="ball" position={[0, 10, 0]}>
      <mesh>
        <sphereGeometry args={[5, 12, 8]} />
        <meshBasicMaterial color={"red"} />
      </mesh>
    </RigidBody>
  );
}
