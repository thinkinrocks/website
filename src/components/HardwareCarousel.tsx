import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface HardwareCarouselProps {
  images: string[];
  name: string;
  captions?: string[];
}

export const HardwareCarousel: React.FC<HardwareCarouselProps> = ({ images, name, captions }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Preload all images
  React.useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
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

  if (images.length === 1) {
    const caption = captions && captions[0] ? captions[0] : name;
    return (
      <div className="flex flex-col items-center justify-center mb-8">
        <img
          src={images[0]}
          alt={caption}
          className="w-96 h-96 object-contain"
          loading="eager"
          decoding="async"
          style={{ imageRendering: 'auto' }}
        />
        <p className="text-gray-400 text-sm mt-2 font-mono">{caption}</p>
      </div>
    );
  }

  const currentCaption = captions && captions[current] ? captions[current] : `${name} - Image ${current + 1}`;

  return (
    <div className="flex flex-col items-center justify-center mb-8 px-12">
      <Carousel 
        setApi={setApi} 
        className="w-full max-w-md"
        opts={{
          startIndex: 0,
          loop: false
        }}
      >
        <CarouselContent className="-ml-4">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-4">
              <div className="flex flex-col items-center justify-center p-4">
                <img
                  src={image}
                  alt={captions && captions[index] ? captions[index] : `${name} - Image ${index + 1}`}
                  className="w-96 h-96 object-contain"
                  loading="eager"
                  decoding="async"
                  style={{ imageRendering: 'auto', willChange: 'transform' }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p className="text-gray-400 text-sm mt-2 font-mono">{currentCaption}</p>
    </div>
  );
};

