import { Environment, useEnvironment } from "@react-three/drei";
import { memo } from "react";

function EnvironmentExp() {
  const env = useEnvironment({
    files:
      "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/brown_photostudio_02_1k.hdr",
  });

  return (
    <>
      <Environment map={env} blur={2} background={false} />
    </>
  );
}

export default memo(EnvironmentExp);
