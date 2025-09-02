import { Dithering } from "@paper-design/shaders-react";

export default function BackgroundShader({
  pxSize = 38,
}: {
  pxSize?: number;
}) {
  return (
    <Dithering
      className="absolute inset-0 z-0 pointer-events-none"
      colorBack="#ffffff"
      colorFront="#e4faff"
      shape="simplex"
      type="8x8"
      pxSize={pxSize}
      offsetX={0}
      offsetY={0}
      scale={1.42}
      rotation={0}
      speed={1}
    />
  );
}
