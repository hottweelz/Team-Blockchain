// Cloudflare Worker using fast-xml-parser to fetch, parse, and cache podcast RSS as JSON
import { XMLParser } from 'fast-xml-parser';

export default {
    async fetch(request, env, ctx) {
        const rssUrl = "https://anchor.fm/s/7bb47050/podcast/rss";
        const cacheKey = new Request("https://your-worker-url.workers.dev/cache");
        const cache = caches.default;

        // Try cache first
        let response = await cache.match(cacheKey);
        if (!response) {
            // Fetch RSS feed
            const rssResp = await fetch(rssUrl);
            const rssText = await rssResp.text();

            // Parse RSS to JSON
            const parser = new XMLParser({ ignoreAttributes: false });
            const json = parser.parse(rssText);
            const items = json.rss.channel.item.map(item => ({
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                enclosure: item.enclosure?.['@_url'] || '',
                description: item.description
            }));

            response = new Response(JSON.stringify({ items }), {
                headers: { "Content-Type": "application/json" }
            });
            // Cache for 30 minutes
            ctx.waitUntil(cache.put(cacheKey, response.clone()));
        }
        return response;
    }
};
