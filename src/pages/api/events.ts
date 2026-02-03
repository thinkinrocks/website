import type { APIRoute } from 'astro';
import { fetchAllLumaEvents } from '../../utils/luma';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    const calendarId = import.meta.env.LUMA_CALENDAR_ID || '';
    
    if (!calendarId || calendarId === 'your-calendar-id') {
      return new Response(JSON.stringify({ error: 'Calendar ID not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const allEvents = await fetchAllLumaEvents(calendarId);
    
    return new Response(JSON.stringify({ events: allEvents }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' // 5 min cache
      }
    });
  } catch (error) {
    console.error('Error in /api/events:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch events' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
