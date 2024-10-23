import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  Center,
  ContactShadows,
} from "@react-three/drei";
import { Suspense, useRef } from "react";

import EnvironmentExp from "../3d-visualizer/EnvironmentExp";
import { domainUrl } from "../../data/api/api";

const ModelViewer = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);

  const orbit = useRef();
  return (
    <Canvas
      shadows
      gl={{ antialias: true }}
      resize={{ debounce: 0 }}
      camera={{ position: [-0.5, 0.5, 1], near: 0.01 }}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <OrbitControls
        enablePan={false}
        ref={orbit}
        maxZoom={10}
        enableZoom={true}
        // autoRotate
        // autoRotateSpeed={0.2}
        maxPolarAngle={Math.PI}
      />

      <Suspense fallback={"Loading.."}>
        <Center position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <primitive object={scene} />
          <ContactShadows
            position={[0.03, 0, 0.04]}
            opacity={1}
            scale={3}
            blur={4}
            far={1}
          />
        </Center>
        <ambientLight intensity={0.4} />

        <spotLight
          intensity={10}
          rotation={[0, Math.PI, Math.PI / 2]}
          position={[3, 1, 0]}
          scale={10}
        />
        <EnvironmentExp />
      </Suspense>
    </Canvas>
  );
};

export default ModelViewer;
