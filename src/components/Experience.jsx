import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { useMemo } from "react";
import World from "./World";

const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};
export default function Experience() {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    [],
  );
  return (
    <KeyboardControls map={map}>
      <Canvas
        shadows={true}
        camera={{
          fov: 40,
          near: 0.2,
          far: 200,
          position: [15, 5, 15],
        }}
      >
        <World />
      </Canvas>
    </KeyboardControls>
  );
}
