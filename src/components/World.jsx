import { Environment, OrbitControls } from "@react-three/drei";
import Lights from "./Lights";
import { Physics } from "@react-three/rapier";
import { Ground } from "./Ground";
import Ball from "./Ball";
import Plane from "./Plane";
import Plane2 from "./Plane2";
import { AllCollidersExample } from "./AllCollidersExample";

export default function World() {
  return (
    <>
      <OrbitControls makeDefault />
      <axesHelper args={[2]} />
      {/* <color attach="background" args={["#000000"]} /> */}
      <Environment preset="city" />
      <Physics debug>
        <Lights />
        {/* <AllCollidersExample /> */}
        <Ball />
        {/* <Ground /> */}
        <Plane />
        {/* <Plane2 /> */}
      </Physics>
    </>
  );
}
