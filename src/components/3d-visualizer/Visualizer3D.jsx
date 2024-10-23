import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Center } from "@react-three/drei";

import EnvironmentExp from "./EnvironmentExp";
import Group3DVisualizer from "./Group3DVisualizer";

const Visualizer3D = ({ counterTopColor, storageColor }) => {
  const orbit = useRef();

  return (
    <div className="canvas-container">
      <Canvas
        shadows
        gl={{ antialias: true }}
        resize={{ debounce: 0 }}
        camera={{ position: [0, 0.5, 1.5], near: 0.01 }}
        className="canvas-3d"
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
            <Group3DVisualizer
              counterTopColor={counterTopColor}
              storageColor={storageColor}
            />
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

      {/* <div className="product-details">
        <p className="product-name">
          Single Sink solid Surface Countertop 100 x 60 x 80 cm
        </p>
        <p className="product-price">QAR 1843</p>
      </div> */}
    </div>
  );
};

export default Visualizer3D;
