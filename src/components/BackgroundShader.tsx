import { Dithering } from "@paper-design/shaders-react";
import { cn } from "../utils/ui";

import {
  Shader,
  ChromaticAberration,
  Dither,
  FlowField,
  SimplexNoise,
  Stripes
} from 'shaders/react'

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

export const NewBackgroundShared = () => {
  return (
    <Shader>
      <FlowField
        detail={1.2}
        speed={0}
        strength={0.25}>
        <Stripes
          balance={0.1}
          colorA="#a6a6a6"
          speed={0.4} />
        <SimplexNoise
          balance={0.8}
          colorB="#e3c6f5"
          contrast={1}
          speed={1.1}
          visible={false} />
      </FlowField>
      <Dither
        colorA="#cfcfcf"
        pattern="blueNoise"
        visible={true} />
      <ChromaticAberration />
    </Shader>
  )
}