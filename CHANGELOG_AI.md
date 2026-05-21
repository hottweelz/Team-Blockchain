### 2026-05-13 18:25 local — Codex

Task:
- Initialize the required AI handoff ledger because `CHANGELOG_AI.md` was missing.

Selected agent team:
- engineering-minimal-change-engineer: create only the required shared-memory file before implementation proceeds.

Changes made:
- Created `CHANGELOG_AI.md` so future AI work can follow the repository handoff contract.

Files touched:
- CHANGELOG_AI.md

Commands/tests run:

```bash
# none
```

Results:
- Repository now has the required AI handoff ledger.

Decisions made:
- Added a minimal bootstrap entry instead of inventing prior history.

Known issues:
- None.

Next recommended steps:
- Read the latest optimization feedback and implement the smallest set of fixes needed.

Notes for next agent:
- This file did not exist before this session; do not assume earlier handoff history is available.

### 2026-05-13 18:40 local — Codex

Task:
- Apply the new LLM optimization feedback from `teamblockchain_agent-scan-2026-05-13-2.md`.

Selected agent team:
- engineering-llm-optimization-agent: map scan findings to retrieval and training fixes.
- engineering-minimal-change-engineer: keep the implementation tightly scoped to reported issues.
- engineering-git-workflow-master: prepare a clean commit/push path after verification.

Changes made:
- Updated `llms.txt` to use canonical extensionless URLs, added Wikidata and Crunchbase identity links, aligned crawler notes with `robots.txt`, and standardized James Tylee's experience claim to `25+ years`.
- Expanded `sitemap.xml` with `lastmod` values and added all article and podcast companion `.md` files.
- Added Wikidata and Crunchbase `sameAs` links to `brand.md` and `product.md`, and aligned visible "Last Updated" text with `dateModified`.
- Updated homepage, product page, legal page metadata, structured data, and internal links to use canonical extensionless public URLs instead of redirecting `.html` paths.

Files touched:
- CHANGELOG_AI.md
- llms.txt
- brand.md
- product.md
- product.html
- index.html
- legal/_index.md
- legal/privacy.html
- legal/tos.html
- legal/cookies.html
- legal/gdpr.html
- legal/us-privacy.html
- legal/esg.html
- legal/legal.html
- sitemap.xml

Commands/tests run:

```bash
git status --short
rg -n '^dateModified:|^datePublished:|^title:' articles podcast product.md brand.md
rg -n 'product\.html|legal/[a-z-]+\.html|index\.html|25\+|30\+|sameAs|Wikidata|Crunchbase|functions/' index.html llms.txt brand.md product.md legal articles podcast robots.txt _headers product.html sitemap.xml
git log -1 --format=%cs -- index.html product.html llms.txt brand.md product.md sitemap.xml legal/privacy.html legal/tos.html legal/cookies.html legal/gdpr.html legal/us-privacy.html legal/esg.html legal/legal.html articles/*.md podcast/*.md
xmllint --noout sitemap.xml
git diff --stat -- CHANGELOG_AI.md llms.txt brand.md product.md product.html index.html legal/_index.md legal/privacy.html legal/tos.html legal/cookies.html legal/gdpr.html legal/us-privacy.html legal/esg.html legal/legal.html sitemap.xml
```

Results:
- `sitemap.xml` is well-formed.
- Public-facing references no longer use the redirecting `.html` URLs in the updated files.
- LLM identity and freshness signals are more consistent across `llms.txt`, markdown companions, and page metadata.

Decisions made:
- Used the homepage/product page's existing `25+ years` wording as the canonical James Tylee experience claim for consistency.
- Left unrelated untracked repo files and the user-modified `img/.DS_Store` untouched.

Known issues:
- `robots.txt` still explicitly allows `/index.html` and `product.html`; this is harmless because `Allow: /` already covers the site, but it is a minor cleanup follow-up if desired.
- The scan's `https://teamblockchain.net/functions/` probe would still return a server-side error if requested directly; this task did not change runtime routing.

Next recommended steps:
- Review the diff, then commit only the touched LLM optimization files and `CHANGELOG_AI.md`.
- Push the commit to `origin/main` after confirmation.

Notes for next agent:
- Do not stage `.ai/`, `.codex/`, `AGENTS.md`, `GEMINI.md`, or `img/.DS_Store` as part of this optimization change unless the user explicitly asks.

### 2026-05-13 18:47 local — Codex

Task:
- Add HTML inbound discovery links for markdown companion files.

Selected agent team:
- engineering-llm-optimization-agent: add crawler-visible HTML discovery for markdown companions.
- engineering-minimal-change-engineer: limit the follow-up to homepage and product-page discovery surfaces.
- engineering-git-workflow-master: keep the follow-up in a separate atomic commit.

Changes made:
- Added `rel="alternate" type="text/markdown"` tags on the homepage for `brand.md`, `product.md`, and all article/podcast companion markdown files.
- Added a compact footer link block on the homepage pointing to the same markdown resources.
- Added `rel="alternate" type="text/markdown"` tags plus a compact footer discovery block on the product page.

Files touched:
- CHANGELOG_AI.md
- index.html
- product.html

Commands/tests run:

```bash
sed -n '1,80p' index.html
sed -n '1030,1125p' index.html
sed -n '1,70p' product.html
sed -n '385,425p' product.html
rg -n 'rel="alternate"|type="text/markdown"|brand\.md|product\.md|articles/.+\.md|podcast/.+\.md' index.html product.html
git diff --stat -- index.html product.html
```

Results:
- Companion markdown files are now discoverable from HTML inbound links, not only via `llms.txt` and `sitemap.xml`.
- The homepage exposes the full markdown set in both the head and footer.

Decisions made:
- Kept the discovery block compact and text-only rather than adding a larger content archive section.

Known issues:
- Unrelated local-only files remain outside this change: `img/.DS_Store`, `.ai/`, `.codex/`, `AGENTS.md`, and `GEMINI.md`.

Next recommended steps:
- Commit this follow-up and push it if the user wants it live immediately.

Notes for next agent:
- This follow-up intentionally does not rename existing article/podcast URLs or add new HTML pages; it only improves discovery from current pages.

### 2026-05-21 11:06 local — Codex

Task:
- Promote the newly released Digital Bytes book and prepare the site for additional future books.

Selected agent team:
- engineering-frontend-developer: implement stable static pages, responsive layout, and navigation.
- marketing-book-launch-coordinator: shape the book catalogue, Amazon CTA, sales teaser, formats, and future-book path.
- marketing-seo-specialist: align canonical URLs, metadata, sitemap, robots, and book schema.
- marketing-ai-citation-strategist: add machine-readable book briefs and `llms.txt` discovery entries.
- testing-accessibility-auditor: review semantic structure, responsive text fit, alt text, focusable CTAs, and mobile layout.

Changes made:
- Added a `/books/` catalogue hub for current and future Digital Bytes books.
- Added a dedicated `/books/funny-money/` sales and reference page for *Funny Money: Stablecoins, CBDCs and the Tokenization of the Global Economy*.
- Added machine-readable book catalogue and book brief Markdown files.
- Added resized web-ready book artwork derived from the cover assets.
- Added homepage book promotion and navigation/footer links.
- Added product-page and product-markdown references to the book.
- Updated `llms.txt`, `robots.txt`, and `sitemap.xml` so crawlers, search engines, and AI retrieval systems can discover the new book surfaces.
- Added Book, CollectionPage, WebPage, FAQPage, and Breadcrumb JSON-LD on the new pages.

Files touched:
- CHANGELOG_AI.md
- index.html
- product.html
- product.md
- llms.txt
- robots.txt
- sitemap.xml
- books/index.html
- books/funny-money/index.html
- books.md
- books/funny-money.md
- img/books/funny-money-cover.jpg
- img/books/funny-money-paperback.jpg

Commands/tests run:

```bash
curl -LsI 'https://amzn.to/4tSHNpd'
curl -L 'https://amzn.to/4tSHNpd' -A 'Mozilla/5.0' -s -o /tmp/teamblockchain_amazon.html -w '%{url_effective}\n%{http_code}\n%{content_type}\n'
find Covers -maxdepth 1 -type f -print -exec file {} \;
sips -Z 1400 Covers/Funny_Money_Vol1_EPUB_Cover.jpg --out img/books/funny-money-cover.jpg
sips -Z 1600 Covers/db_vol1_paperback.jpg --out img/books/funny-money-paperback.jpg
python3 -m http.server 8080
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' http://127.0.0.1:8080/books/
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' http://127.0.0.1:8080/books/funny-money/
node -e "const fs=require('fs'); for (const f of ['index.html','books/index.html','books/funny-money/index.html','product.html']) { const s=fs.readFileSync(f,'utf8'); const blocks=[...s.matchAll(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/g)]; for (let i=0;i<blocks.length;i++) JSON.parse(blocks[i][1]); console.log(f, blocks.length, 'jsonld ok'); }"
xmllint --noout sitemap.xml
git diff --check
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --headless --disable-gpu --disable-background-networking --disable-component-update --no-first-run --user-data-dir=/tmp/teamblockchain-chrome-7 --screenshot=/tmp/teamblockchain-funny-money-6.png --window-size=390,1200 http://127.0.0.1:8080/books/funny-money/
```

Results:
- Amazon short link redirects to the Amazon ASIN URL for `B0GX2VNS7F`.
- Local `/books/`, `/books/funny-money/`, `/books.md`, `/books/funny-money.md`, and generated book images return `200`.
- JSON-LD parses successfully on `index.html`, `books/index.html`, `books/funny-money/index.html`, and `product.html`.
- `sitemap.xml` validates with `xmllint --noout sitemap.xml`.
- `git diff --check` reports no whitespace errors.
- Headless Chrome screenshots confirmed desktop and mobile rendering; mobile typography was tightened after the first pass to prevent long title overflow.

Decisions made:
- Used both a `/books/` hub and a dedicated `/books/funny-money/` page: the hub supports the coming catalogue, while the dedicated page gives this first book its own SEO, schema, and sales surface.
- Used the Amazon short link as the primary buy CTA and captured the ASIN from the redirect.
- Used the manuscript for non-spoiler positioning and summary themes, without publishing the manuscript content itself.
- Kept the user-supplied `Covers/` assets and manuscript unmodified; only derived smaller web images were added under `img/books/`.

Known issues:
- Source cover PDFs/JPGs and `Digital_Bytes_VOL1_MANUSCRIPT.md` remain untracked user-provided assets. Only the derived web images are needed by the site.
- Amazon page markup was not cleanly parseable from the terminal, so listing facts were corroborated from the Amazon redirect plus indexed bookstore listings and the manuscript.
- The existing site still has unrelated `xmllint --html` noise from HTML5 tags and pre-existing unescaped ampersands in older metadata.

Next recommended steps:
- Review the new pages locally, then commit and push the intended site files when ready.
- Add more retailer links to `books/funny-money/index.html` and `books/funny-money.md` as new stores go live.
- Consider adding review quotes, editorial reviews, or author headshots if available.

Notes for next agent:
- Do not accidentally publish the full manuscript unless the user explicitly asks; use it only as source material for summaries and sales positioning.
- Preserve the `/books/` hub plus `/books/funny-money/` detail pattern for future books.

### 2026-05-21 11:21 local — Codex

Task:
- Refine the new book promotion layout based on visual feedback.

Selected agent team:
- engineering-frontend-developer: correct responsive layout, desktop card grid, and book-page columns.
- marketing-book-launch-coordinator: connect the edition-specific Amazon purchase paths.
- testing-accessibility-auditor: preserve readable wrapping, alt text, focusable links, and mobile fallbacks.

Changes made:
- Removed the text-heavy book cover artwork from the hero backgrounds and replaced it with a restrained abstract grid/gradient treatment.
- Switched the visible book artwork on the book pages from the skinny front-cover crop to the full paperback spread image at a smaller proportional display size.
- Replaced the fragile Bootstrap column layout for the homepage hero cards with a custom three-column desktop grid that falls back to one column on smaller screens.
- Changed the homepage book card button text from "View Book" to "View Books".
- Replaced the `/books/` "Why buy it now" and "Book details" Bootstrap row with a custom two-column grid that stacks only on mobile.
- Added edition-specific Amazon links for eBook, paperback, and hardcover on the book hub, dedicated book page, product surfaces, Markdown briefs, JSON-LD offers, and `llms.txt`.

Files touched:
- CHANGELOG_AI.md
- index.html
- product.html
- product.md
- llms.txt
- books/index.html
- books/funny-money/index.html
- books.md
- books/funny-money.md

Commands/tests run:

```bash
rg -n "4tSHNpd|49aMmUf|4urBJ89|4wIP4dM|View\s+Book|View\s+Books|url\(.*funny-money|background: url|funny-money-paperback|book-info-grid|hero-feature-grid" index.html books/index.html books/funny-money/index.html books.md books/funny-money.md product.md product.html llms.txt
node -e "const fs=require('fs'); for (const f of ['index.html','books/index.html','books/funny-money/index.html','product.html']) { const s=fs.readFileSync(f,'utf8'); const blocks=[...s.matchAll(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/g)]; for (let i=0;i<blocks.length;i++) JSON.parse(blocks[i][1]); console.log(f, blocks.length, 'jsonld ok'); }"
xmllint --noout sitemap.xml
git diff --check
python3 -m http.server 8080
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' http://127.0.0.1:8080/
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' http://127.0.0.1:8080/books/
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' http://127.0.0.1:8080/books/funny-money/
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --headless --disable-gpu --disable-background-networking --disable-component-update --no-first-run --user-data-dir=/tmp/tb-chrome-a --screenshot=/tmp/tb-home-desktop.png --window-size=1440,1100 http://127.0.0.1:8080/
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --headless --disable-gpu --disable-background-networking --disable-component-update --no-first-run --user-data-dir=/tmp/tb-chrome-b --screenshot=/tmp/tb-books-desktop.png --window-size=1440,1100 http://127.0.0.1:8080/books/
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --headless --disable-gpu --disable-background-networking --disable-component-update --no-first-run --user-data-dir=/tmp/tb-chrome-f --screenshot=/tmp/tb-funny-desktop2.png --window-size=1440,1100 http://127.0.0.1:8080/books/funny-money/
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --headless --disable-gpu --disable-background-networking --disable-component-update --no-first-run --user-data-dir=/tmp/tb-chrome-d --screenshot=/tmp/tb-funny-mobile.png --window-size=390,1200 http://127.0.0.1:8080/books/funny-money/
```

Results:
- Local homepage, `/books/`, and `/books/funny-money/` return `200`.
- JSON-LD still parses successfully on all touched HTML pages.
- `sitemap.xml` still validates.
- `git diff --check` reports no whitespace errors.
- Headless Chrome screenshots confirmed the homepage cards are three-across on desktop, the cover art is no longer used as the background, and the mobile book page remains readable.

Decisions made:
- Kept the cover art as the product image only, not a page background.
- Used the paperback spread for visible book art because it has the wider, less-skinny aspect ratio the user asked for.
- Kept the front-cover crop for social/metadata images because it is the more standard share-card asset.

Known issues:
- The original `Covers/` assets and `Digital_Bytes_VOL1_MANUSCRIPT.md` remain untracked user-provided files.

Next recommended steps:
- Review the adjusted pages in a live browser, then commit the intended files.
- Add additional retailer links using the same edition-specific pattern as stores come online.

Notes for next agent:
- The homepage feature cards intentionally use `.hero-feature-grid`, not Bootstrap columns, because the local theme CSS overrides some Bootstrap column behavior.
- The book hub details section intentionally uses `.book-info-grid`, not Bootstrap columns, for the same reason.

### 2026-05-21 11:27 local — Codex

Task:
- Restore the `/books/` hero product image to the original front cover without distorted intrinsic dimensions.

Selected agent team:
- engineering-frontend-developer: scoped image/CSS correction.
- testing-accessibility-auditor: preserve image alt text and responsive behavior.

Changes made:
- Changed the `/books/` hero `.book-cover` image back from the paperback spread to `img/books/funny-money-cover.jpg`.
- Removed the `width` and `height` attributes from that `<img class="book-cover">`.
- Set `.book-cover` to `height: 700px; width: auto;` with responsive max constraints so the 937x1400 front cover keeps its natural aspect ratio.
- Kept mobile behavior responsive with `height: auto` and a 300px width cap.

Files touched:
- CHANGELOG_AI.md
- books/index.html

Commands/tests run:

```bash
rg -n "book-cover|funny-money-paperback|funny-money-cover|cover-art" books/index.html books/funny-money/index.html
node -e "const fs=require('fs'); for (const f of ['index.html','books/index.html','books/funny-money/index.html','product.html']) { const s=fs.readFileSync(f,'utf8'); const blocks=[...s.matchAll(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/g)]; for (let i=0;i<blocks.length;i++) JSON.parse(blocks[i][1]); console.log(f, blocks.length, 'jsonld ok'); }"
xmllint --noout sitemap.xml
git diff --check
python3 -m http.server 8080
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --headless --disable-gpu --disable-background-networking --disable-component-update --no-first-run --user-data-dir=/tmp/tb-chrome-coverfix --screenshot=/tmp/tb-books-cover-fix.png --window-size=1440,1100 http://127.0.0.1:8080/books/
```

Results:
- JSON-LD still parses on touched HTML pages.
- `sitemap.xml` still validates.
- `git diff --check` reports no whitespace errors.
- Headless Chrome screenshot confirms the `/books/` hero shows the front cover without squeeze distortion.

Decisions made:
- Used CSS height rather than HTML `height` attribute because the user explicitly asked not to specify intrinsic image dimensions.

Known issues:
- None for this scoped visual fix.

Next recommended steps:
- Review the live browser page, then commit the intended files.

Notes for next agent:
- Keep the `/books/` `.book-cover` as the front-cover image unless the user asks to change it again; do not add `width`/`height` attributes back to that image.

### 2026-05-21 12:33 local — Codex

Task:
- Add the full paperback spread as a thumbnail inside the `/books/` "Why buy it now?" panel.

Selected agent team:
- engineering-frontend-developer: place supporting artwork inside the existing panel without breaking layout.
- testing-accessibility-auditor: keep the image proportionate, lazy-loaded, and descriptive.

Changes made:
- Added `img/books/funny-money-paperback.jpg` below the final paragraph in the "Why buy it now?" box.
- Added `.book-spread-thumb` CSS with constrained width, `height: auto`, border radius, and subtle border/shadow.
- Added a mobile-specific width cap so the thumbnail stays inside the panel on small screens.

Files touched:
- CHANGELOG_AI.md
- books/index.html

Commands/tests run:

```bash
rg -n "book-spread-thumb|funny-money-paperback|Why buy it now" books/index.html
node -e "const fs=require('fs'); for (const f of ['index.html','books/index.html','books/funny-money/index.html','product.html']) { const s=fs.readFileSync(f,'utf8'); const blocks=[...s.matchAll(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/g)]; for (let i=0;i<blocks.length;i++) JSON.parse(blocks[i][1]); console.log(f, blocks.length, 'jsonld ok'); }"
xmllint --noout sitemap.xml
git diff --check
python3 -m http.server 8080
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --headless --disable-gpu --disable-background-networking --disable-component-update --no-first-run --user-data-dir=/tmp/tb-chrome-spreadthumb2 --screenshot=/tmp/tb-books-spread-thumb2.png --window-size=1440,2200 'http://127.0.0.1:8080/books/#funny-money'
```

Results:
- JSON-LD still parses on touched HTML pages.
- `sitemap.xml` still validates.
- `git diff --check` reports no whitespace errors.
- Local server confirmed `/books/` assets load, including `img/books/funny-money-paperback.jpg`.

Decisions made:
- Used CSS `width` and `height: auto` rather than image `width`/`height` attributes, to preserve the image's aspect ratio and avoid another squeezed-cover problem.

Known issues:
- None for this scoped thumbnail change.

Next recommended steps:
- Review in the browser and adjust thumbnail max width if a larger or smaller in-panel image is preferred.

Notes for next agent:
- The full paperback spread now belongs in the "Why buy it now?" panel as `.book-spread-thumb`; keep the hero `.book-cover` as the front cover.

### 2026-05-21 12:34 local — Codex

Task:
- Reduce redundant title repetition in the homepage book promotion section.

Selected agent team:
- engineering-frontend-developer: scoped homepage text hierarchy change.
- marketing-book-launch-coordinator: simplify promo copy so the title appears once in the section.

Changes made:
- Changed the homepage book section eyebrow from "New Digital Bytes Book" to "Digital Bytes Book".
- Changed the homepage book section heading from "Funny Money" to "New".
- Left the full book title in the lead sentence as the single title mention in that promo block.

Files touched:
- CHANGELOG_AI.md
- index.html

Commands/tests run:

```bash
rg -n "New Digital Bytes Book|<h2 id=\"books-heading\"|Digital Bytes Book|Funny Money" index.html
node -e "const fs=require('fs'); for (const f of ['index.html','books/index.html','books/funny-money/index.html','product.html']) { const s=fs.readFileSync(f,'utf8'); const blocks=[...s.matchAll(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/g)]; for (let i=0;i<blocks.length;i++) JSON.parse(blocks[i][1]); console.log(f, blocks.length, 'jsonld ok'); }"
xmllint --noout sitemap.xml
git diff --check
```

Results:
- JSON-LD still parses on touched HTML pages.
- `sitemap.xml` still validates.
- `git diff --check` reports no whitespace errors.
- Homepage promo now has a simpler "Digital Bytes Book" / "New" hierarchy.

Decisions made:
- Kept the book title in the lead copy rather than in the eyebrow or H2 so the section still names the product clearly without repeating itself.

Known issues:
- None for this scoped copy change.

Next recommended steps:
- Review the homepage in browser before committing the full batch of book-promo changes.

Notes for next agent:
- Avoid reintroducing duplicate "Funny Money" headings in the same homepage promo block unless the user asks for stronger repetition.

### 2026-05-21 12:41 local — Codex

Task:
- Run a final SEO, LLM discovery, WCAG, and Open Graph validation pass for the new book pages.

Selected agent team:
- marketing-seo-specialist: validate canonical URLs, titles, descriptions, Open Graph, Twitter cards, sitemap, and robots signals.
- marketing-ai-citation-strategist: verify `llms.txt`, markdown companion discovery, and machine-readable book facts.
- testing-accessibility-auditor: sanity-check headings, image alt text, link text, and obvious keyboard/screen-reader risks.
- engineering-frontend-developer: apply tightly scoped static-site fixes found during validation.

Changes made:
- Added a dedicated 1200x630 social preview image for Funny Money at `img/books/funny-money-og.jpg`.
- Updated `/books/` and `/books/funny-money/` Open Graph and Twitter image tags to use the new landscape social image.
- Added `og:image:secure_url`, `og:image:type`, `og:image:width`, `og:image:height`, `og:locale`, and Twitter account metadata on the new book pages.
- Added book-specific Open Graph facts for ISBN, release date, and topic tags on `/books/funny-money/`.
- Shortened the dedicated book page `<title>` for cleaner search result display while keeping the full book title in OG and page content.

Files touched:
- CHANGELOG_AI.md
- books/index.html
- books/funny-money/index.html
- img/books/funny-money-og.jpg

Commands/tests run:

```bash
sed -n '1,260p' books/index.html
sed -n '1,320p' books/funny-money/index.html
rg -n "books|funny-money|amzn|og:image|twitter:image|rel=\"alternate\"|sitemap|llms" index.html product.html product.md books.md books/funny-money.md llms.txt robots.txt sitemap.xml
command -v magick; command -v convert; command -v sips; command -v ffmpeg
sips -g pixelWidth -g pixelHeight img/books/funny-money-cover.jpg img/books/funny-money-paperback.jpg
ffmpeg -y -i img/books/funny-money-paperback.jpg -i img/books/funny-money-cover.jpg -filter_complex "[0:v]scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630,boxblur=12:1,eq=brightness=-0.28:saturation=0.7[bg];[1:v]scale=-1:560[cover];[bg][cover]overlay=x=W-w-92:y=(H-h)/2" -frames:v 1 -q:v 2 img/books/funny-money-og.jpg
sips -g pixelWidth -g pixelHeight img/books/funny-money-og.jpg
node - <<'NODE'
const fs=require('fs');
for (const file of ['books/index.html','books/funny-money/index.html']) {
  const html=fs.readFileSync(file,'utf8');
  const title=html.match(/<title>([^<]+)<\/title>/i)?.[1].replace(/&amp;/g,'&') || '';
  const desc=html.match(/<meta name="description" content="([^"]*)"/i)?.[1] || '';
  const ogImage=html.match(/<meta property="og:image" content="([^"]*)"/i)?.[1] || '';
  const ogSize=[html.match(/<meta property="og:image:width" content="([^"]*)"/i)?.[1], html.match(/<meta property="og:image:height" content="([^"]*)"/i)?.[1]].join('x');
  console.log(`${file}: title ${title.length}, desc ${desc.length}, og ${ogImage}, size ${ogSize}`);
}
NODE
node -e "const fs=require('fs'); for (const f of ['index.html','books/index.html','books/funny-money/index.html','product.html']) { const s=fs.readFileSync(f,'utf8'); const blocks=[...s.matchAll(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/g)]; for (let i=0;i<blocks.length;i++) JSON.parse(blocks[i][1]); console.log(f, blocks.length, 'jsonld ok'); }"
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path
class P(HTMLParser):
    def __init__(self): super().__init__(); self.hs=[]; self.imgs=[]; self.links=[]; self._a=None; self._h=None
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag in ['h1','h2','h3','h4','h5','h6']: self._h=[tag,'']
        if tag=='img': self.imgs.append((a.get('src',''), a.get('alt'), a.get('width'), a.get('height')))
        if tag=='a': self._a=[a.get('href',''), a.get('aria-label',''), '']
    def handle_data(self, data):
        if self._h: self._h[1]+=data
        if self._a: self._a[2]+=data
    def handle_endtag(self, tag):
        if self._h and tag==self._h[0]: self.hs.append(tuple(self._h)); self._h=None
        if self._a and tag=='a': self.links.append(tuple(self._a)); self._a=None
for f in ['books/index.html','books/funny-money/index.html']:
    p=P(); p.feed(Path(f).read_text())
    print('\n',f)
    print('headings:', [(h,t.strip()) for h,t in p.hs[:12]])
    print('images', p.imgs)
    print('missing_alt', [i for i in p.imgs if i[1] is None])
    print('empty_links', [l for l in p.links if not l[1].strip() and not l[2].strip()][:5])
PY
xmllint --noout sitemap.xml
git diff --check
git status --short
```

Results:
- `/books/` title length is 36 and description length is 151.
- `/books/funny-money/` title length is 52 and description length is 153.
- Both new pages now point OG and Twitter image tags to `https://www.teamblockchain.net/img/books/funny-money-og.jpg` with explicit 1200x630 JPEG dimensions.
- `img/books/funny-money-og.jpg` validates at 1200x630.
- JSON-LD parses on `index.html`, `books/index.html`, `books/funny-money/index.html`, and `product.html`.
- `sitemap.xml` validates with `xmllint --noout sitemap.xml`.
- `git diff --check` reports no whitespace errors.
- Heading order, image alt text, and CTA link text are acceptable for the two new book pages. The only "empty" link detected is the logo link, which contains an image with alt text.
- `llms.txt`, `books.md`, `books/funny-money.md`, `sitemap.xml`, and `robots.txt` all include the book discovery surfaces and purchase links from the broader book launch work.

Decisions made:
- Kept the visible `/books/` hero image without HTML `width`/`height` attributes because the user explicitly requested that cover slot not use those attributes.
- Used a dedicated social preview image rather than the tall front cover so Open Graph and Twitter scrapers get a proper large-card aspect ratio.
- Left the full book title in `og:title`, JSON-LD, H1, and page copy, but shortened the browser title for search snippet fit.

Known issues:
- `img/.DS_Store` remains locally modified and unrelated to this validation pass.
- Source cover assets and manuscript files remain untracked user-provided assets; the site uses the derived web images under `img/books/`.
- No external live social-card debugger was run; validation was local/static against the generated tags and asset dimensions.

Next recommended steps:
- Commit the intended book-promotion files and derived web images when ready.
- After deploy, optionally run a live share-card refresh in LinkedIn/X/Facebook debuggers to force their caches to pick up the new 1200x630 OG image.

Notes for next agent:
- Preserve `img/books/funny-money-og.jpg` for social metadata and `img/books/funny-money-cover.jpg` for the visible `/books/` cover slot; they serve different purposes.

### 2026-05-21 12:43 local — Codex

Task:
- Commit and push the completed Digital Bytes book promotion work to Git.

Selected agent team:
- engineering-git-workflow-master: stage only the intended site files, commit them, and push the current branch.
- engineering-minimal-change-engineer: keep user-provided source assets and local editor noise out of the commit.

Changes made:
- Added this release handoff entry before staging.
- Prepared the book promotion site changes, LLM/SEO discovery updates, and derived web images for commit.

Files touched:
- CHANGELOG_AI.md
- index.html
- product.html
- product.md
- llms.txt
- robots.txt
- sitemap.xml
- books.md
- books/index.html
- books/funny-money.md
- books/funny-money/index.html
- img/books/funny-money-cover.jpg
- img/books/funny-money-paperback.jpg
- img/books/funny-money-og.jpg

Commands/tests run:

```bash
git status --short
git branch --show-current
git remote -v
git diff --stat
git diff --check
node -e "const fs=require('fs'); for (const f of ['index.html','books/index.html','books/funny-money/index.html','product.html']) { const s=fs.readFileSync(f,'utf8'); const blocks=[...s.matchAll(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/g)]; for (let i=0;i<blocks.length;i++) JSON.parse(blocks[i][1]); console.log(f, blocks.length, 'jsonld ok'); }"
xmllint --noout sitemap.xml
git add CHANGELOG_AI.md index.html product.html product.md llms.txt robots.txt sitemap.xml books.md books/index.html books/funny-money.md books/funny-money/index.html img/books/funny-money-cover.jpg img/books/funny-money-paperback.jpg img/books/funny-money-og.jpg
git diff --cached --stat
git commit -m "Add Digital Bytes book pages"
git push origin main
```

Results:
- Intended outcome: book promotion files are committed and pushed to `origin/main`.
- Validation immediately before commit includes JSON-LD parsing, sitemap XML validation, and whitespace diff checks.

Decisions made:
- Committed the current branch directly because the user explicitly asked to push to Git.
- Excluded `Covers/`, `Digital_Bytes_VOL1_MANUSCRIPT.md`, and `img/.DS_Store` from staging because the public site uses the derived web images and those files are source/local artifacts.

Known issues:
- `img/.DS_Store`, `Covers/`, and `Digital_Bytes_VOL1_MANUSCRIPT.md` remain uncommitted local files.

Next recommended steps:
- Verify the deployed site after the host picks up `origin/main`.

Notes for next agent:
- The commit intentionally includes the public HTML/Markdown/discovery files and `img/books/` web images only, not the manuscript or source cover bundle.

### 2026-05-21 12:45 local — Codex

Task:
- Add local book manuscript/source Markdown files to `.gitignore`.

Selected agent team:
- engineering-minimal-change-engineer: keep the change scoped to manuscript ignore rules.
- engineering-git-workflow-master: verify ignored status before committing.

Changes made:
- Added ignore rules for `Digital_Bytes_VOL1_MANUSCRIPT.md` and `_vol1_src_*.md`.

Files touched:
- .gitignore
- CHANGELOG_AI.md

Commands/tests run:

```bash
git status --short --ignored
git check-ignore -v Digital_Bytes_VOL1_MANUSCRIPT.md _vol1_src_hardcover.md
git diff --check
git add .gitignore CHANGELOG_AI.md
git commit -m "Ignore local book manuscripts"
git push origin main
```

Results:
- `Digital_Bytes_VOL1_MANUSCRIPT.md` is ignored by the exact filename rule.
- `_vol1_src_hardcover.md` is ignored by the `_vol1_src_*.md` pattern.

Decisions made:
- Left `Covers/` unignored because this request specifically targeted manuscript/source Markdown files.
- Left existing local `img/.DS_Store` untouched.

Known issues:
- `Covers/` remains untracked and visible in `git status`.
- `img/.DS_Store` remains locally modified.

Next recommended steps:
- If source cover PDFs/JPGs should also remain private, add a separate explicit ignore rule for `Covers/`.

Notes for next agent:
- Do not stage `Digital_Bytes_VOL1_MANUSCRIPT.md` or `_vol1_src_*.md`; they are local source manuscripts, not public site assets.

### 2026-05-21 12:52 local — Codex

Task:
- Remove the "Digital Bytes Book" eyebrow from the homepage book launch section so the section only says "New" above the book copy.

Selected agent team:
- engineering-minimal-change-engineer: make only the requested homepage copy cleanup.
- engineering-git-workflow-master: commit and push the targeted fix.

Changes made:
- Removed the `Digital Bytes Book` span from the homepage book launch section.
- Removed the extra top-margin class from the `New` heading now that it no longer follows an eyebrow label.

Files touched:
- CHANGELOG_AI.md
- index.html

Commands/tests run:

```bash
rg -n "Digital Bytes Book|books-heading|Book Launch Section" index.html
node -e "const fs=require('fs'); const s=fs.readFileSync('index.html','utf8'); const blocks=[...s.matchAll(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/g)]; for (let i=0;i<blocks.length;i++) JSON.parse(blocks[i][1]); console.log('index.html', blocks.length, 'jsonld ok');"
git diff --check
git diff -- index.html
git add CHANGELOG_AI.md index.html
git commit -m "Simplify homepage book label"
git push origin main
```

Results:
- The homepage book launch section now has `New` as the only small/heading label before the book description.
- Homepage JSON-LD still parses successfully.
- `git diff --check` reports no whitespace errors.

Decisions made:
- Left other uses of "Digital Bytes Books" intact in discovery/footer contexts because the request targeted the homepage book promo section only.

Known issues:
- `img/.DS_Store` remains locally modified.
- `Covers/` remains untracked.

Next recommended steps:
- Verify the deployed homepage once the hosting platform updates from `origin/main`.

Notes for next agent:
- Do not re-add an eyebrow label above the homepage `New` heading unless the user asks for a new label there.
