# Source Overview

High-level overview for Astro app structure (no file moves).

- `components/` - Reusable UI and sections
- `content/` - Markdown collections (blog, podcasts, pages)
- `data/` - Typed data modules
- `layouts/` - Page layouts
- `lib/seo/` - SEO utilities
- `pages/` - Astro routes
- `styles/` - CSS

Routing is file-based via `src/pages/`. Components are imported using relative paths.
