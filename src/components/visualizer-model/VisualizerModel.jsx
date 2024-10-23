import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

const Model = ({
  position,
  scale,
  modelUrl,
  textureUrl,
  roughness,
  color,
  metalness,
  textureArray,
  isTexture,
}) => {
  const { scene } = useGLTF(modelUrl);
  if (textureUrl) {
    const texture = useTexture(textureUrl);

    useEffect(() => {
      let ColorMap = null;
      if (textureArray) {
        ColorMap = textureArray;
      } else {
        ColorMap = texture;
      }

      if (ColorMap) {
        ColorMap.wrapS = THREE.RepeatWrapping;
        ColorMap.wrapT = THREE.RepeatWrapping;
        ColorMap.repeat.set(2, 2);
        ColorMap.encoding = THREE.sRGBEncoding;
        ColorMap.needsUpdate = true;
      }

      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          if (isTexture) {
            const colorObj = new THREE.Color(color);
            colorObj.lerp(new THREE.Color("#ffffff"), 0.5);
            child.material.color = colorObj.convertSRGBToLinear();
          } else {
            child.material.color = new THREE.Color(color);
          }

          child.material.map = texture;
          child.material.metalness = metalness;
          child.material.roughness = roughness;
          child.material.needsUpdate = true;
          child.material.mapIntensity = 2;
        }
      });

      return () => {
        scene.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.map = null;
            child.material.color = new THREE.Color(0xffffff);
            child.material.needsUpdate = true;
          }
        });
      };
    }, [scene, texture]);
  } else {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.color = new THREE.Color(0xffffff);
        child.material.map = null;
        child.material.roughness = roughness;
        child.material.metalness = metalness;
        child.material.needsUpdate = true;
      }
    });
  }

  return <primitive object={scene} position={position} scale={scale} />;
};

export default Model;
