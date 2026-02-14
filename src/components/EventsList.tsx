import { useState, useEffect } from 'react';
import type { LumaEvent } from '../utils/luma';
import { formatEventDate, formatEventTime } from '../utils/luma';

function truncateDescription(description: string, maxLength: number = 200): { text: string, wasTruncated: boolean } {
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

interface EventCardProps {
  item: LumaEvent;
  isPast: boolean;
}

function EventCard({ item, isPast }: EventCardProps) {
  const { text: shortDescription } = truncateDescription(item.event.description || '');

  const cardContent = (
    <div className="py-2">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex gap-3 mb-3 items-center">
          {item.event.cover_url && (
            <div className="flex-shrink-0">
              <img
                src={item.event.cover_url}
                alt={item.event.name}
                className="w-16 h-16 object-cover rounded"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-display mb-2 text-gray-900 group-hover:text-purple-600 transition-colors">
              {item.event.name}
            </h3>
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-mono text-gray-700">
                {formatEventDate(item.event.start_at, item.event.timezone)}
              </span>
              <span className="font-mono text-gray-400">|</span>
              <span className={`${isPast ? 'bg-gray-200 text-gray-700' : 'bg-purple-100 text-purple-700'} px-2 py-0.5 rounded font-mono font-semibold`}>
                {formatEventTime(item.event.start_at, item.event.timezone)}
              </span>
              {item.event.geo_address_json?.address && (
                <>
                  <span className="font-mono text-gray-400">|</span>
                  <span className="font-mono text-gray-600">
                    {item.event.geo_address_json.address}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {shortDescription && (
            <p className="font-sans text-sm text-gray-700 break-words">{shortDescription}</p>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex gap-4 items-center">
        {item.event.cover_url && (
          <div className="flex-shrink-0">
            <img
              src={item.event.cover_url}
              alt={item.event.name}
              className="w-32 h-32 object-cover rounded"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-3xl font-display mb-2 text-gray-900 group-hover:text-purple-600 transition-colors">
            {item.event.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-sm font-mono text-gray-700">
              {formatEventDate(item.event.start_at, item.event.timezone)}
            </span>
            <span className="text-sm font-mono text-gray-400">|</span>
            <span className={`${isPast ? 'bg-gray-200 text-gray-700' : 'bg-purple-100 text-purple-700'} px-2 py-1 rounded font-mono text-sm font-semibold`}>
              {formatEventTime(item.event.start_at, item.event.timezone)}
            </span>
            {item.event.geo_address_json?.address && (
              <>
                <span className="text-sm font-mono text-gray-400">|</span>
                <span className="text-sm font-mono text-gray-700">
                  {item.event.geo_address_json.address}
                </span>
              </>
            )}
          </div>
          {shortDescription && (
            <p className="font-sans text-gray-700">{shortDescription}</p>
          )}
        </div>
      </div>
    </div>
  );

  if (item.event.url) {
    return (
      <a
        href={item.event.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
        data-umami-event="event-luma-open"
        data-umami-event-url={item.event.url}
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

export default function EventsList() {
  const [allEvents, setAllEvents] = useState<LumaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setAllEvents(data.events || []);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load events');
        setLoading(false);
      });
  }, []);

  const now = new Date();
  const upcomingEvents = allEvents
    .filter(item => new Date(item.event.start_at) >= now)
    .sort((a, b) => new Date(a.event.start_at).getTime() - new Date(b.event.start_at).getTime());
  
  const pastEvents = allEvents
    .filter(item => new Date(item.event.start_at) < now)
    .sort((a, b) => new Date(b.event.start_at).getTime() - new Date(a.event.start_at).getTime());


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

  const events = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`border-b-2 pb-2 text-sm font-mono transition-colors ${
              activeTab === 'upcoming'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`border-b-2 pb-2 text-sm font-mono transition-colors ${
              activeTab === 'past'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Past Events
          </button>
        </nav>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {events.length === 0 ? (
          <p className="font-sans text-lg text-gray-700">
            {activeTab === 'upcoming' 
              ? <>No upcoming events at the moment. Check back soon or join our <a href="https://discord.gg/5MEu6njksN" className="text-purple-600 hover:text-purple-800 transition-colors">Discord</a> to stay updated.</>
              : 'No past events to display yet.'
            }
          </p>
        ) : (
          events.map(item => (
            <EventCard key={item.api_id} item={item} isPast={new Date(item.event.start_at) < now} />
          ))
        )}
      </div>
    </div>
  );
}
