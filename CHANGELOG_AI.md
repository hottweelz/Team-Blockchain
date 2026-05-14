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
