import type { APIRoute } from 'astro';
import { fetchAllLumaEvents } from '../../utils/luma';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    // You can set a separate calendar ID for workshops in your .env file, or use the same as events
    const calendarId = import.meta.env.LUMA_WORKSHOPS_CALENDAR_ID || import.meta.env.LUMA_CALENDAR_ID || '';
    
    if (!calendarId || calendarId === 'your-calendar-id') {
      return new Response(JSON.stringify({ error: 'Workshops calendar ID not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const allEvents = await fetchAllLumaEvents(calendarId);
    // Filter for workshops only, similar to luma.ts event filtering
    const workshops = allEvents.filter(e => {
      const name = (e.event.name || '').toLowerCase();
      const description = (e.event.description || '').toLowerCase();
      // You can adjust these keywords as needed
      return name.includes('frontier interfaces workshop');
    });
    return new Response(JSON.stringify({ events: workshops }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    console.error('Error in /api/workshops:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch workshops' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
