import React, { useRef } from "react";
import Model from "../visualizer-model/VisualizerModel";
import { domainUrl } from "../../data/api/api";
import { useSelector } from "react-redux";

const Group3DVisualizer = ({ counterTopColor, storageColor }) => {
  const WalletGroup = useRef();
  const { tempCartItem } = useSelector((state) => state.cart);
  return (
    <group position={[0, 0.2, 0]} rotation={[0, 0, 0]} ref={WalletGroup}>
      {tempCartItem.english.countertop_3d_image && (
        <Model
          modelUrl={`${domainUrl}/${tempCartItem?.english?.countertop_3d_image}`}
          roughness={0.2}
          metalness={0.01}
          color={counterTopColor?.hex_value}
          textureUrl={
            counterTopColor?.image && `${domainUrl}/${counterTopColor?.image}`
          }
          isTexture={true}
        />
      )}
      {tempCartItem.english.storage_id !== "no" &&
        tempCartItem.english.storage_3d_image && (
          <Model
            modelUrl={`${domainUrl}/${tempCartItem?.english?.storage_3d_image}`}
            roughness={0.9}
            metalness={0.05}
            color={storageColor?.hex_value}
            textureUrl={
              storageColor?.image && `${domainUrl}/${storageColor?.image}`
            }
            isTexture={true}
          />
        )}
    </group>
  );
};

export default Group3DVisualizer;
