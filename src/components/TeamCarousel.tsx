import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface TeamMember {
  slug: string;
  alt: string;
  name: string;
  role?: string;
  tg: string;
  tgUrl: string;
  umamiEvent: string;
  imageClass?: string;
  imageStyle?: string;
}

interface TeamCarouselProps {
  members: TeamMember[];
}

const avatarUrl = (slug: string) => `/images/team/${slug}.jpg`;

export const TeamCarousel: React.FC<TeamCarouselProps> = ({ members }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  React.useEffect(() => {
    members.forEach((member) => {
      const img = new Image();
      img.src = avatarUrl(member.slug);
    });
  }, [members]);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const currentMember = members[current];

  return (
    <div className="relative mb-12">
      <div className="flex items-center justify-center">
        <div className="w-full px-4">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              startIndex: 0,
              loop: true,
              duration: 40,
            }}
          >
<Carousel className="w-full" setApi={setApi}>
  <CarouselContent className="ml-0">
    {members.map((member, index) => (
      <CarouselItem key={index} className="basis-full pl-0">
        <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-sm border border-gray-200 bg-white">
          <div className="relative aspect-[16/10] bg-gray-100">
            <img
              src={avatarUrl(member.slug)}
              alt={member.alt}
              className="h-full w-full object-cover object-center"
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="bg-[#f3f3f3] px-3 sm:px-4 py-3 font-mono text-s sm:text-xs md:text-[12px] leading-5 sm:leading-6 text-gray-700">
            <div>
              const name = <span className="text-gray-900">"{member.name}"</span>;
            </div>
            <div>
              const role = <span className="text-gray-900">"{member.role || "team"}"</span>;
            </div>
            <div>
              const tg ={" "}
              <a
                href={member.tgUrl}
                target="_blank"
                rel="noreferrer"
                data-umami-event={member.umamiEvent}
                className="text-gray-900 hover:underline"
              >
                "{member.tg}"
              </a>;
            </div>
          </div>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>
          </Carousel>

        
        </div>
      </div>
    </div>
  );
};