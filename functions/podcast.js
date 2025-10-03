// Cloudflare Pages Function: Podcast RSS to JSON using fast-xml-parser
import { XMLParser } from 'fast-xml-parser';

export async function onRequest(context) {
  const rssUrl = "https://anchor.fm/s/7bb47050/podcast/rss";
  const cache = caches.default;
  const cacheKey = new Request(context.request.url);

  // Try cache first
  let response = await cache.match(cacheKey);
  if (!response) {
    // Fetch RSS feed
    const rssResp = await fetch(rssUrl);
    const rssText = await rssResp.text();

    // Parse RSS to JSON
    const parser = new XMLParser({ ignoreAttributes: false });
    const json = parser.parse(rssText);
    const items = (json.rss.channel.item || []).map(item => ({
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
    context.waitUntil(cache.put(cacheKey, response.clone()));
  }
  return response;
}
