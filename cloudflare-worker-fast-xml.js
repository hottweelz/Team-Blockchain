// Cloudflare Worker using fast-xml-parser to fetch, parse, and cache podcast RSS as JSON
import { XMLParser } from 'fast-xml-parser';

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "https://www.teamblockchain.net",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Max-Age": "86400",
};

export default {
    async fetch(request, env, ctx) {
        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: CORS_HEADERS });
        }

        const url = new URL(request.url);

        // If requesting /api/podcast, return JSON podcast data
        if (url.pathname === '/api/podcast') {
            const rssUrl = "https://anchor.fm/s/7bb47050/podcast/rss";
            const cacheKey = new Request("https://teamblockchain.cyberfm.workers.dev/api/podcast/cache");
            const cache = caches.default;

            // Try cache first; re-apply CORS headers in case response was cached before this fix
            const cachedResponse = await cache.match(cacheKey);
            if (cachedResponse) {
                return new Response(cachedResponse.body, {
                    status: cachedResponse.status,
                    headers: { ...Object.fromEntries(cachedResponse.headers), ...CORS_HEADERS },
                });
            }

            try {
                // Fetch RSS feed
                const rssResp = await fetch(rssUrl);
                if (!rssResp.ok) throw new Error(`RSS fetch failed with status ${rssResp.status}`);
                const rssText = await rssResp.text();

                // Parse RSS to JSON
                const parser = new XMLParser({ ignoreAttributes: false });
                const json = parser.parse(rssText);

                // item can be a single object when there is only one episode; guard accordingly
                const rawItems = json?.rss?.channel?.item;
                const itemsArray = Array.isArray(rawItems) ? rawItems : (rawItems ? [rawItems] : []);

                const items = itemsArray.map(item => ({
                    title: item.title,
                    link: item.link,
                    pubDate: item.pubDate,
                    enclosure: item.enclosure?.['@_url'] || '',
                    description: item.description,
                }));

                const response = new Response(JSON.stringify({ items }), {
                    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
                });
                // Cache for 30 minutes
                ctx.waitUntil(cache.put(cacheKey, response.clone()));
                return response;
            } catch (_err) {
                return new Response(JSON.stringify({ error: "Failed to load podcast feed", items: [] }), {
                    status: 500,
                    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
                });
            }
        }

        // Otherwise, serve static assets
        return env.ASSETS.fetch(request);
    }
};
