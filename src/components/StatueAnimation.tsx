import { useEffect, useState } from "react";
import { Shader, Dither, ImageTexture, BrightnessContrast } from "shaders/react";

export default function StatueAnimation() {
  const [currentFrame, setCurrentFrame] = useState(84);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [highResReady, setHighResReady] = useState(false);

  const minFrame = 29;
  const maxFrame = 84;
  const reactionDistance = 800;

  // Preload high-res frames
  useEffect(() => {
    const preloadImages = async () => {
      const promises: Promise<void>[] = [];
      for (let i = minFrame; i <= maxFrame; i++) {
        const img = new Image();
        img.decoding = "async";
        img.src = `https://res.cloudinary.com/dby6mmmff/image/upload/f_auto,q_auto,w_200/statue-0-${i}`;
        promises.push(
          new Promise((resolve) => {
            img.onload = (ev: Event) => resolve();
            img.onerror = (ev: string | Event) => resolve();
          })
        );
      }
      await Promise.all(promises);
      setHighResReady(true);
      setTimeout(() => setShouldShow(true), 50);
    };
    preloadImages();
  }, []);

  // Attach mouse handler only once high-res frames are ready
  useEffect(() => {
    if (!highResReady) return;

    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const joinButton = document.querySelector('[data-umami-event="join-us-click"]');
        if (!joinButton) {
          ticking = false;
          return;
        }

        const rect = joinButton.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        if (distance > reactionDistance) {
          setCurrentFrame(prev => (prev === maxFrame ? prev : maxFrame));
          ticking = false;
          return;
        }

        const normalized = distance / reactionDistance;
        const frame = Math.min(
          maxFrame,
          Math.max(minFrame, Math.round(minFrame + normalized * (maxFrame - minFrame)))
        );

        setCurrentFrame(prev => (prev === frame ? prev : frame));
        ticking = false;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [highResReady]);

  const framePath = highResReady
    ? `https://res.cloudinary.com/dby6mmmff/image/upload/f_auto,q_auto,w_200/statue-0-${currentFrame}`
    : `https://res.cloudinary.com/dby6mmmff/image/upload/f_auto,q_auto,w_50/statue-0-${currentFrame}`;

  return (
    <div
      className="hidden md:block fixed bottom-0 right-0 -z-40 pointer-events-none"
      style={{
        width: "40vw",
        height: "40vw",
        maxWidth: "600px",
        maxHeight: "600px",
        backgroundColor: "#ffffff",
      }}
    >
      {shouldShow && (
        <div
          style={{
            width: "100%",
            height: "100%",
            animation: "fadeIn 1.2s ease-in",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          <Shader style={{ width: "100%", height: "100%" }}>
            <BrightnessContrast brightness={0} contrast={0}>
              <ImageTexture url={framePath} objectFit="contain" />
            </BrightnessContrast>
            <Dither colorA="#a5e4d8" pattern="bayer2" visible pixelSize={3} />
          </Shader>
        </div>
      )}
    </div>
  );
}