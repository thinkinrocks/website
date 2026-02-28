import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface SpaceImage {
  src: string;
  alt: string;
  caption: string;
}

interface SpaceCarouselProps {
  images: SpaceImage[];
}

export const SpaceCarousel: React.FC<SpaceCarouselProps> = ({ images }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Preload all images
  React.useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }, [images]);

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
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="eager"
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
