export interface LumaEvent {
  api_id: string;
  event: {
    name: string;
    description?: string;
    start_at: string;
    end_at?: string;
    timezone?: string;
    cover_url?: string;
    url?: string;
    geo_address_json?: {
      address?: string;
      full_address?: string;
    };
    hosts?: Array<{
      name?: string;
      api_id?: string;
    }>;
    [key: string]: any;
  };
  hosts?: Array<{
    name?: string;
    api_id?: string;
  }>;
  [key: string]: any;
}

export interface LumaApiResponse {
  entries: LumaEvent[];
  has_more: boolean;
  next_cursor?: string;
}

/**
 * Fetch all events from Luma Calendar API (2026+)
 */
export async function fetchAllLumaEvents(calendarId: string): Promise<LumaEvent[]> {
  const apiKey = import.meta.env.LUMA_API_KEY;

  // Check if API key and calendar ID are properly configured
  if (!apiKey || apiKey === "your-luma-api-key-here") {
    console.warn("Luma API key not configured");
    return [];
  }

  if (!calendarId || calendarId === "your-calendar-id") {
    console.warn("Luma calendar ID not configured");
    return [];
  }

  try {
    const startOf2026 = '2026-01-01T00:00:00.000Z';
    // Use the filter we know works
    const filterParam = `after=${startOf2026}`;
    
    let allEvents: LumaEvent[] = [];
    let hasMore = true;
    let cursor: string | undefined = undefined;
    let pageCount = 0;
    const maxPages = 5;
    
    while (hasMore && pageCount < maxPages) {
      const url = cursor 
        ? `https://public-api.luma.com/v1/calendar/list-events?calendar_api_id=${calendarId}&${filterParam}&pagination_limit=100&pagination_cursor=${cursor}`
        : `https://public-api.luma.com/v1/calendar/list-events?calendar_api_id=${calendarId}&${filterParam}&pagination_limit=100`;
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'x-luma-api-key': apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Luma API error: ${response.status} ${response.statusText}`);
      }

      const data: LumaApiResponse = await response.json();
      allEvents = allEvents.concat(data.entries || []);
      
      hasMore = data.has_more;
      cursor = data.next_cursor;
      pageCount++;
    }

    // Filter for 2026+ events
    const events2026Plus = allEvents.filter(item => {
      try {
        const eventDate = new Date(item.event.start_at);
        return eventDate >= new Date(startOf2026);
      } catch {
        return false;
      }
    });

    // Filter for Thinkin' Rocks events
    const thinkinRocksEvents = events2026Plus.filter(item => {
      const searchText = JSON.stringify(item).toLowerCase();
      return searchText.includes("thinkin") || 
             searchText.includes("rocks") ||
             searchText.includes("thinkinrocks");
    });

    console.log(`Fetched ${thinkinRocksEvents.length} Thinkin' Rocks events from 2026+`);
    
    return thinkinRocksEvents;
  } catch (error) {
    console.error("Error fetching Luma events:", error);
    return [];
  }
}

/**
 * Get upcoming or past events
 * @param calendarId - Your Luma calendar ID
 * @param upcoming - If true, return upcoming events. If false, return past events
 */
export async function fetchLumaEvents(
  calendarId: string,
  upcoming: boolean = true
): Promise<LumaEvent[]> {
  const allEvents = await fetchAllLumaEvents(calendarId);
  const now = new Date();
  
  if (upcoming) {
    return allEvents.filter(item => {
      try {
        return new Date(item.event.start_at) >= now;
      } catch {
        return false;
      }
    }).sort((a, b) => 
      new Date(a.event.start_at).getTime() - new Date(b.event.start_at).getTime()
    );
  } else {
    return allEvents.filter(item => {
      try {
        return new Date(item.event.start_at) < now;
      } catch {
        return false;
      }
    }).sort((a, b) => 
      new Date(b.event.start_at).getTime() - new Date(a.event.start_at).getTime()
    );
  }
}

/**
 * Format event date
 */
export function formatEventDate(dateString: string, timezone?: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: timezone || 'Europe/Helsinki', // Default to Helsinki timezone
    });
  } catch (error) {
    return 'Date TBA';
  }
}

/**
 * Format event time
 */
export function formatEventTime(dateString: string, timezone?: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone || 'Europe/Helsinki', // Default to Helsinki timezone
    });
  } catch (error) {
    return 'Time TBA';
  }
}
