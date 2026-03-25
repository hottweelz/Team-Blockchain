// Cloudflare Pages Function: Podcast RSS to JSON using fast-xml-parser
import { XMLParser } from 'fast-xml-parser';

const CORS_ORIGIN = '*';

function applyCors(headers) {
  headers.set('access-control-allow-origin', CORS_ORIGIN);
  headers.set('access-control-allow-methods', 'GET, OPTIONS');
  return headers;
}

export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: applyCors(new Headers()) });
  }

  const rssUrl = "https://anchor.fm/s/7bb47050/podcast/rss";
  const cache = caches.default;
  const cacheKey = new Request(context.request.url);

  // Try cache first; use Headers.set() (case-insensitive) to ensure exactly
  // one ACAO header regardless of how the cached copy was stored.
  const cachedResponse = await cache.match(cacheKey);
  if (cachedResponse) {
    const h = new Headers(cachedResponse.headers);
    applyCors(h);
    return new Response(cachedResponse.body, { status: cachedResponse.status, headers: h });
  }

  try {
    // Fetch RSS feed
    const rssResp = await fetch(rssUrl);
    if (!rssResp.ok) throw new Error(`RSS fetch failed with status ${rssResp.status}`);
    const rssText = await rssResp.text();

    // Parse RSS to JSON
    // processEntities: false prevents the default 1000-entity expansion limit
    // from crashing on large feeds; HTML entities in descriptions render
    // correctly when inserted via innerHTML.
    const parser = new XMLParser({ ignoreAttributes: false, processEntities: false });
    const json = parser.parse(rssText);

    // item can be a single object when there is only one episode; guard accordingly
    const rawItems = json?.rss?.channel?.item;
    const itemsArray = Array.isArray(rawItems) ? rawItems : (rawItems ? [rawItems] : []);

    const items = itemsArray.slice(0, 5).map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      enclosure: item.enclosure?.['@_url'] || '',
      description: item.description,
    }));

    const response = new Response(JSON.stringify({ items }), {
      headers: applyCors(new Headers({ 'content-type': 'application/json' })),
    });
    // Cache for 30 minutes
    context.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (_err) {
    return new Response(JSON.stringify({ error: "Failed to load podcast feed", items: [] }), {
      status: 500,
      headers: applyCors(new Headers({ 'content-type': 'application/json' })),
    });
  }
}
