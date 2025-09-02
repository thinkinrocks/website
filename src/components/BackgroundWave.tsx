import { Dithering } from "@paper-design/shaders-react";

export default function BackgroundWave() {
  return (
    <Dithering
      className="absolute inset-0"
      colorBack="hsl(0, 0%, 100%)"
      colorFront="#fffce9"
      shape="wave"
      type="4x4"
      pxSize={38}
      offsetX={0}
      offsetY={0}
      scale={1.2}
      rotation={0}
      speed={1}
    />
  );
}
