import { Dithering } from "@paper-design/shaders-react";
import { cn } from "../utils/ui";

export default function BackgroundShader({
  pxSize = 18,
  className,
  colorBack = "#ffffff",
  colorFront = "#e4faff",
}: {
  pxSize?: number;
  className?: string;
  colorBack?: string;
  colorFront?: string;
}) {
  return (
    <Dithering
      className={cn("absolute inset-0 z-0 pointer-events-none", className)}
      colorBack={colorBack}
      colorFront={colorFront}
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
