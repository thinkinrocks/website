import { useRef, useState, useEffect } from "react";
import {
  Shader,
  BrightnessContrast,
  ChromaticAberration,
  Dither,
  FlowField,
  ImageTexture,
  SimplexNoise,
  Stripes,
} from "shaders/react";
import { useShaderStore } from "../stores/shaderStore";

const aspectRatioValues: Record<string, number | undefined> = {
  "16:9": 16 / 9,
  "4:3": 4 / 3,
  "1:1": 1,
  free: undefined,
};

export default function ShaderPreview() {
  const ff = useShaderStore((s) => s.flowField);
  const st = useShaderStore((s) => s.stripes);
  const img = useShaderStore((s) => s.imageTexture);
  const sn = useShaderStore((s) => s.simplexNoise);
  const di = useShaderStore((s) => s.dither);
  const ca = useShaderStore((s) => s.chromaticAberration);
  const aspectRatio = useShaderStore((s) => s.aspectRatio);

  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const ar = aspectRatioValues[aspectRatio];
  let shaderW: number;
  let shaderH: number;

  if (!ar || size.width === 0 || size.height === 0) {
    shaderW = size.width;
    shaderH = size.height;
  } else {
    const containerAr = size.width / size.height;
    if (containerAr > ar) {
      // container is wider than target — height is the constraint
      shaderH = size.height;
      shaderW = shaderH * ar;
    } else {
      // container is taller than target — width is the constraint
      shaderW = size.width;
      shaderH = shaderW / ar;
    }
  }

  return (
    <div
      ref={containerRef}
      id="shader-preview"
      className="relative w-full h-full flex items-center justify-center bg-muted overflow-hidden"
    >
      {size.width > 0 && size.height > 0 && (
        <Shader
          style={{
            width: `${Math.floor(shaderW)}px`,
            height: `${Math.floor(shaderH)}px`,
          }}
        >
          <FlowField detail={ff.detail} speed={ff.speed} strength={ff.strength}>
            {img.url ? (
              <BrightnessContrast brightness={img.brightness} contrast={img.contrast}>
                <ImageTexture url={img.url} objectFit={img.objectFit} />
              </BrightnessContrast>
            ) : (
              <Stripes balance={st.balance} colorA={st.colorA} speed={st.speed} />
            )}
            <SimplexNoise
              balance={sn.balance}
              colorB={sn.colorB}
              contrast={sn.contrast}
              speed={sn.speed}
              visible={sn.visible}
            />
          </FlowField>
          <Dither
            colorA={di.colorA}
            pattern={di.pattern}
            visible={di.visible}
            pixelSize={di.pixelSize}
          />
          <ChromaticAberration strength={ca.strength} angle={ca.angle} />
        </Shader>
      )}
    </div>
  );
}
