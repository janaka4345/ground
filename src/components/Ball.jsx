import { RigidBody } from "@react-three/rapier";

export default function Ball(params) {
  return (
    <RigidBody colliders="ball" position={[5, 5, 0]}>
      <mesh>
        <sphereGeometry args={[0.5, 10, 10]} />
        <meshBasicMaterial color={"red"} />
      </mesh>
    </RigidBody>
  );
}
