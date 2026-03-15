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
    if (!api) return;

    let interval: ReturnType<typeof setInterval> | null = null;
    let isVisible = false;
    const carouselElement = document.getElementById('tools-carousel');

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !interval) {
          interval = setInterval(() => {
            if (api.canScrollNext()) {
              api.scrollNext();
            } else {
              api.scrollTo(0);
            }
          }, 4000);
        } else if (!isVisible && interval) {
          clearInterval(interval);
          interval = null;
        }
      },
      { threshold: 0.1 }
    );
    if (carouselElement) observer.observe(carouselElement);

    return () => {
      if (interval) clearInterval(interval);
      if (carouselElement) observer.unobserve(carouselElement);
    };
  }, [api]);

  return (
    <div id="tools-carousel" className="w-full mt-8 px-2 md:px-4">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
            loop: false,
        }}
        className="w-full"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 2%, black 98%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 2%, black 98%, transparent)",
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {tools.map((tool, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
            >
              <div className="h-full text-card-foreground">
                <div className="p-3 flex h-full flex-col items-center justify-between gap-3">
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center h-20 sm:h-24"
                  >
                    <img  loading="lazy"
                    decoding="async"
                      src={tool.image}
                      alt={tool.name}
                      className="max-h-full max-w-full object-contain dark:invert"
                    />
                  </a>

                  <div className="w-full text-center min-h-[2rem] flex items-start justify-center">
                    <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground leading-tight">
                      {tool.category}
                    </p>
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