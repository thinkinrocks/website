import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface SpaceImage {
  /** Optimized fallback URL (e.g. WebP from Astro getImage) */
  src: string;
  /** Optional responsive srcset (e.g. "url-400.webp 400w, url-800.webp 800w") */
  srcSet?: string;
  /** Sizes attribute paired with srcSet */
  sizes?: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

interface SpaceCarouselProps {
  images: SpaceImage[];
}

export const SpaceCarousel: React.FC<SpaceCarouselProps> = ({ images }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-scroll carousel
  React.useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [api]);

  const currentCaption = images[current]?.caption || '';

  return (
    <div className="relative mb-12">
      <div className="flex items-center justify-center">
        <div className="flex flex-col max-w-4xl mx-auto w-full px-4">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          startIndex: 0,
          loop: true,
          duration: 40
        }}
      >
        <CarouselContent className="-ml-4">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-4">
              <div className="aspect-[3/2] overflow-hidden rounded-lg">
                <img
                  src={image.src}
                  srcSet={image.srcSet}
                  sizes={image.sizes}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  // Only the first slide is critical for LCP. Lazy-load the rest
                  // so we don't fetch ~7 MB of images the user hasn't scrolled to yet.
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <p className="text-base font-sans text-gray-700 mt-4 text-center leading-relaxed">{currentCaption}</p>
        </div>
      </div>
    </div>
  );
};
