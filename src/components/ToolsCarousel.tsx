import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import tools from "../content/hackathon-tools.json";

export const ToolsCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="w-full mt-8 md:px-4">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 2%, black 98%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 2%, black 98%, transparent)'
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {tools.map((tool, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
              <div className="flex flex-col h-full text-card-foreground">
                <div className="p-4 flex-1 flex flex-col items-center justify-end gap-6 h-full">
                  <div className="h-20 w-full flex items-center justify-center">
                    <a href={tool.link} target="_blank" rel="noopener noreferrer">
                      <img 
                        src={tool.image} 
                        alt={tool.name} 
                        className="max-h-full w-full object-contain filter opacity-100 transition-all dark:invert" 
                      />
                    </a>
                  </div>
                  <div className="w-full text-center h-8 flex items-start justify-center">
                    <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground leading-tight">{tool.category}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
