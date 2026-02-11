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

  const renderEventCard = (item: LumaEvent) => {
    const { text: shortDescription } = truncateDescription(item.event.description || '');
    
    const isNerdOut = item.event.name.toLowerCase().includes('nerd out');
    const borderColor = isNerdOut ? 'border-teal-600' : 'border-purple-600';
    const isPastEvent = new Date(item.event.start_at) < now;

    return (
      <div key={item.api_id} className={`border-l-4 ${isPastEvent ? 'border-gray-400' : borderColor} pl-4 py-2`}>
        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex gap-3 mb-3 items-center">
            {item.event.cover_url && (
              <div className="flex-shrink-0">
                {item.event.url ? (
                  <a href={item.event.url} target="_blank" rel="noopener noreferrer">
                    <img 
                      src={item.event.cover_url} 
                      alt={item.event.name}
                      className="w-16 h-16 object-cover rounded hover:opacity-90 transition-opacity cursor-pointer"
                    />
                  </a>
                ) : (
                  <img 
                    src={item.event.cover_url} 
                    alt={item.event.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-mono mb-2">
                {item.event.url ? (
                  <a href={item.event.url} target="_blank" rel="noopener noreferrer" className="text-gray-900 transition-colors hover:text-purple-600">
                    {item.event.name}
                  </a>
                ) : (
                  <span className="text-gray-900">{item.event.name}</span>
                )}
              </h3>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="font-mono text-gray-700">
                  {formatEventDate(item.event.start_at, item.event.timezone)}
                </span>
                <span className="font-mono text-gray-400">|</span>
                <span className={`${isPastEvent ? 'bg-gray-200 text-gray-700' : 'bg-purple-100 text-purple-700'} px-2 py-0.5 rounded font-mono font-semibold`}>
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
            {item.event.url && (
              <div className="flex justify-center pt-2">
                <div className={`${isPastEvent ? 'bg-gray-600' : 'bg-purple-600'} h-fit translate-y-0.5`}>
                  <a
                    href={item.event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${isPastEvent ? 'bg-gray-50 text-gray-600 hover:bg-gray-100' : 'bg-purple-50 text-purple-600 hover:bg-purple-100'} inline-flex px-4 py-2 -translate-y-0.5 items-center gap-2 whitespace-nowrap font-mono text-sm transition-colors`}
                  >
                    {isPastEvent ? 'View' : 'Join'}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex gap-4 items-center">
          {item.event.cover_url && (
            <div className="flex-shrink-0">
              {item.event.url ? (
                <a href={item.event.url} target="_blank" rel="noopener noreferrer">
                  <img 
                    src={item.event.cover_url} 
                    alt={item.event.name}
                    className="w-32 h-32 object-cover rounded hover:opacity-90 transition-opacity cursor-pointer"
                  />
                </a>
              ) : (
                <img 
                  src={item.event.cover_url} 
                  alt={item.event.name}
                  className="w-32 h-32 object-cover rounded"
                />
              )}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-mono mb-2">
              {item.event.url ? (
                <a href={item.event.url} target="_blank" rel="noopener noreferrer" className="text-gray-900 transition-colors hover:text-purple-600">
                  {item.event.name}
                </a>
              ) : (
                <span className="text-gray-900">{item.event.name}</span>
              )}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-sm font-mono text-gray-700">
                {formatEventDate(item.event.start_at, item.event.timezone)}
              </span>
              <span className="text-sm font-mono text-gray-400">|</span>
              <span className={`${isPastEvent ? 'bg-gray-200 text-gray-700' : 'bg-purple-100 text-purple-700'} px-2 py-1 rounded font-mono text-sm font-semibold`}>
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
          {item.event.url && (
            <div className="flex-shrink-0 self-center">
              <div className={`${isPastEvent ? 'bg-gray-600' : 'bg-purple-600'} h-fit translate-0.5`}>
                <a
                  href={item.event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${isPastEvent ? 'bg-gray-50 text-gray-600 hover:bg-gray-100' : 'bg-purple-50 text-purple-600 hover:bg-purple-100'} inline-flex px-4 py-2 -translate-0.5 items-center gap-2 whitespace-nowrap font-mono text-sm transition-colors`}
                >
                  {isPastEvent ? 'View' : 'Join'}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="border-l-4 border-gray-300 pl-4 py-2">
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

      {/* Color Coding Legend */}
      <div className="mb-6 md:mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <div className="flex items-start gap-2 md:gap-3">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-purple-600 rounded flex-shrink-0 mt-1"></div>
          <div>
            <div className="font-mono text-xs md:text-sm font-semibold mb-0.5 md:mb-1">Build & Chill</div>
            <p className="text-xs md:text-sm text-gray-600">
              <span className="md:hidden">Hands-on hardware building</span>
              <span className="hidden md:inline">Hands-on building sessions where we work on hardware projects together</span>
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2 md:gap-3">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-teal-600 rounded flex-shrink-0 mt-1"></div>
          <div>
            <div className="font-mono text-xs md:text-sm font-semibold mb-0.5 md:mb-1">Nerd Out</div>
            <p className="text-xs md:text-sm text-gray-600">
              <span className="md:hidden">Tech discussions and knowledge sharing</span>
              <span className="hidden md:inline">Deep-dive discussions and knowledge sharing on tech topics</span>
            </p>
          </div>
        </div>
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
          events.map(item => renderEventCard(item))
        )}
      </div>
    </div>
  );
}
