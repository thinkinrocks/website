import {
  Shader,
  BrightnessContrast,
  Dither,
  FlowField,
  ImageTexture,
  SimplexNoise,
} from "shaders/react";
import { useState, useEffect } from "react";

export default function PresetBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Preset parameters
  const imageUrl = "https://res.cloudinary.com/dby6mmmff/image/upload/u8219894999_marble_graphics_on_a_white_background_technology_--_154f16c6-cd0a-4b56-bc11-ed9d553d6f29_tgxx31";
  
  const params = {
    flowField: {
      detail: 0.9,
      speed: 1.2,
      strength: 0.11,
    },
    image: {
      brightness: 0.19,
      contrast: 0.42,
      objectFit: "cover" as const,
    },
    simplexNoise: {
      visible: false,
      balance: 0.3,
      colorB: "#000000",
      contrast: 1,
      speed: 0.1,
    },
    dither: {
      visible: true,
      pattern: "bayer2" as const,
      pixelSize: 3,
      colorA: "#f1c9fe",
    },
  };

  // Preload background image
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(true); // Show even if image fails to prevent blocking
  }, []);

  return (
    <div 
      className="w-screen h-screen overflow-hidden" 
      style={{ 
        backgroundColor: "#ffffff"
      }}
    >
      {isLoaded && (
        <div 
          style={{ 
            width: "100%", 
            height: "100%",
            animation: "fadeIn 1s ease-in"
          }}
        >
          <Shader style={{ width: "100%", height: "100%" }}>
        <FlowField
          detail={params.flowField.detail}
          speed={params.flowField.speed}
          strength={params.flowField.strength}
        >
          <BrightnessContrast
            brightness={params.image.brightness}
            contrast={params.image.contrast}
          >
            <ImageTexture url={imageUrl} objectFit={params.image.objectFit} />
          </BrightnessContrast>
          <SimplexNoise
            balance={params.simplexNoise.balance}
            colorB={params.simplexNoise.colorB}
            contrast={params.simplexNoise.contrast}
            speed={params.simplexNoise.speed}
            visible={params.simplexNoise.visible}
          />
        </FlowField>
        <Dither
          colorA={params.dither.colorA}
          pattern={params.dither.pattern}
          visible={params.dither.visible}
          pixelSize={params.dither.pixelSize}
        />
        </Shader>
        </div>
      )}
    </div>
  );
}
