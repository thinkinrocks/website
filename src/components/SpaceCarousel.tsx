import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface SpaceImage {
  src: string;
  alt: string;
  caption: string;
}

interface SpaceCarouselProps {
  images: SpaceImage[];
  cloudName?: string;
}

export const SpaceCarousel: React.FC<SpaceCarouselProps> = ({ images, cloudName = "dlzxrzthe" }) => {
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

  const currentCaption = images[current]?.caption || '';

  return (
    <div className="flex flex-col mb-16 max-w-2xl mx-auto">
      <Carousel 
        setApi={setApi} 
        className="w-full"
        opts={{
          startIndex: 0,
          loop: true
        }}
      >
        <CarouselContent className="-ml-4">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-4">
              <div className="aspect-[4/3] overflow-hidden rounded">
                <img
                  src={`https://res.cloudinary.com/${cloudName}/image/upload/w_800,h_600,c_fill/${image.src}`}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      <p className="text-sm font-sans text-gray-600 mt-3 text-center">{currentCaption}</p>
    </div>
  );
};
