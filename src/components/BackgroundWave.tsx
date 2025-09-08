import { Dithering } from "@paper-design/shaders-react";

export default function BackgroundWave({
  rotation = 0,
  pxSize = 38,
  colorBack = "#ffffff",
  colorFront = "#fffce9",
}: {
  rotation?: number;
  pxSize?: number;
  colorBack?: string;
  colorFront?: string;
}) {
  return (
    <Dithering
      className="absolute inset-0"
      colorBack={colorBack}
      colorFront={colorFront}
      shape="wave"
      type="4x4"
      pxSize={pxSize}
      offsetX={0}
      offsetY={0}
      scale={1.2}
      rotation={rotation}
      speed={1}
    />
  );
}
