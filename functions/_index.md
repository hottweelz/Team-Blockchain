---
title: Cloudflare Pages Functions
description: Serverless functions for Digital Bytes website and API endpoints
section: functions
order: 5
---

# Cloudflare Pages Functions

Serverless functions running on Cloudflare Pages for dynamic functionality and API endpoints.

## Functions

### `podcast.js`

**Purpose:** Fetch and parse podcast RSS feed, convert to JSON for dynamic display

**Source Feed:** Anchor.fm RSS (Show ID: `7bb47050`)

**Functionality:**
- Fetches latest podcast episodes from Anchor.fm RSS
- Parses XML feed and converts to JSON
- Returns structured episode metadata (title, link, publish date, description)
- Caches responses for performance
- Handles CORS for cross-origin requests

**API Endpoint:** `https://www.teamblockchain.net/api/podcast`

**Response Format:**
```json
{
  "episodes": [
    {
      "title": "Episode Title",
      "link": "https://anchor.fm/...",
      "pubDate": "2026-04-04",
      "description": "Episode description"
    }
  ]
}
```

## Deployment

Deployed via Cloudflare Pages using `wrangler.json` configuration.

---

Browse also: [Main Repository](../README)
