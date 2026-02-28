import { useEffect, useState } from "react";
import { Shader, Dither, ImageTexture, BrightnessContrast } from "shaders/react";

export default function StatueAnimation() {
  const [currentFrame, setCurrentFrame] = useState(84);
  const [isLoaded, setIsLoaded] = useState(false);
  const minFrame = 29;
  const maxFrame = 84;
  const reactionDistance = 800; // Distance in pixels when statue starts reacting

  // Preload all frames on mount
  useEffect(() => {
    const preloadImages = async () => {
      const promises = [];
      for (let i = minFrame; i <= maxFrame; i++) {
        const img = new Image();
        img.src = `https://res.cloudinary.com/dby6mmmff/image/upload/f_auto,q_auto,w_600/statue-0-${i}`;
        promises.push(
          new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve; // Resolve even on error to prevent blocking
          })
        );
      }
      await Promise.all(promises);
      setIsLoaded(true);
    };
    preloadImages();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Find the "Join Us" button
      const joinButton = document.querySelector('[data-umami-event="join-us-click"]');
      
      if (!joinButton) return;

      // Get button's center position
      const buttonRect = joinButton.getBoundingClientRect();
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;

      // Calculate distance from mouse to button center
      const deltaX = e.clientX - buttonCenterX;
      const deltaY = e.clientY - buttonCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Only react if within reaction distance
      if (distance > reactionDistance) {
        setCurrentFrame(maxFrame);
        return;
      }

      // Map distance to frame index (linear interpolation)
      // Min distance (0) = min frame (29)
      // Reaction distance = max frame (84)
      const normalizedDistance = distance / reactionDistance;
      const frame = Math.round(minFrame + normalizedDistance * (maxFrame - minFrame));

      setCurrentFrame(frame);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const framePath = `https://res.cloudinary.com/dby6mmmff/image/upload/f_auto,q_auto,w_600/statue-0-${currentFrame}`;

  return (
    <div 
      className="hidden md:block fixed bottom-0 right-0 -z-40 pointer-events-none" 
      style={{ 
        width: "40vw", 
        height: "40vw", 
        maxWidth: "600px", 
        maxHeight: "600px",
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
          <BrightnessContrast brightness={0} contrast={0}>
            <ImageTexture url={framePath} objectFit="contain" />
          </BrightnessContrast>
          <Dither
            colorA="#a5e4d8"
            pattern="bayer2"
            visible={true}
            pixelSize={3}
          />
        </Shader>
        </div>
      )}
    </div>
  );
}
