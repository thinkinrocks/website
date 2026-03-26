import { useState, useEffect } from 'react';
import type { LumaEvent } from '../utils/luma';
import { formatEventDate, formatEventTime } from '../utils/luma';

function truncateDescription(description: string, maxLength: number = 300): { text: string, wasTruncated: boolean } {
  if (!description || description.length <= maxLength) {
    return { text: description || '', wasTruncated: false };
  }

  const truncated = description.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  const cutPoint = lastSpace > 0 ? lastSpace : maxLength;

  return {
    text: description.substring(0, cutPoint) + '...',
    wasTruncated: true
  };
}

interface WorkshopCardProps {
  item: LumaEvent;
  isPast: boolean;
}

function WorkshopCard({ item, isPast }: WorkshopCardProps) {
  // Only use the truncated description version of cardContent
  const { text: shortDescriptionMobile } = truncateDescription(item.event.description || "", 300);
  const { text: shortDescriptionMd } = truncateDescription(item.event.description || "", 180);
  const { text: shortDescriptionLg } = truncateDescription(item.event.description || "", 300);
  const cardContent = (
    <div className="flex flex-col md:flex-row items-center p-4 h-full gap-4">
      {item.event.cover_url && (
        <img
          src={item.event.cover_url}
          alt={item.event.name}
          className="w-full md:w-30 object-cover  mb-4 md:mb-0"
        />
      )}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-display font-semibold mb-1 text-gray-900 group-hover:text-fuchsia-600 transition-colors">
            {item.event.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 mb-2">
            <span className="font-mono">
              {formatEventDate(item.event.start_at, item.event.timezone)}
              {" • "}
              {formatEventTime(item.event.start_at, item.event.timezone)}
            </span>
           
          </div>
          {/* Show longest description on mobile, medium on md, longest on lg+ */}
          {item.event.description && (
            <>
              <p className="text-sm text-muted-foreground mb-2 md:hidden">{shortDescriptionMobile}</p>
              <p className="text-sm text-muted-foreground mb-2 hidden md:block lg:hidden">{shortDescriptionMd}</p>
              <p className="text-sm text-muted-foreground mb-2 hidden lg:block">{shortDescriptionLg}</p>
            </>
          )}
          
        </div>
        {item.event.register_url && (
          <a
            href={item.event.register_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex w-fit items-center gap-2 whitespace-nowrap bg-fuchsia-50 px-3 py-1.5 text-fuchsia-600 hover:bg-fuchsia-100 font-mono rounded transition-colors border border-fuchsia-200 shadow-sm"
          >
            Register
          </a>
        )}
      </div>
    </div>
  );

  if (item.event.url) {
    return (
      <a
        href={item.event.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group h-full"
        data-umami-event="workshop-luma-open"
        data-umami-event-url={item.event.url}
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

export default function WorkshopsList() {
  const [allWorkshops, setAllWorkshops] = useState<LumaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/workshops')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setAllWorkshops(data.events || []);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load workshops');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="py-2">
              <div className="flex gap-4">
                <div className="w-32 h-32 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-mono">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="space-y-6">
        {allWorkshops.length === 0 ? (
          <p className="font-sans text-lg text-gray-700">
            No workshops to display at the moment.
          </p>
        ) : (
          allWorkshops.map(item => (
            <WorkshopCard key={item.api_id} item={item} isPast={false} />
          ))
        )}
      </div>
    </div>
  );
}
