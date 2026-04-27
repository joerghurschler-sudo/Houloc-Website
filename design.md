# Le Houloc — Design Specification

## Brand DNA

**Le Houloc** is an artist collective and exhibition space in La Courneuve (93, Paris). The site is a working tool for artists and visitors, not a portfolio. It should feel like a physical space — confident, a little raw, architecturally considered. The current design achieves this through its brutalist grid structure. The next iteration should deepen the spatial metaphor without losing the directness.

**Core adjective:** *constructed* — like a gallery with exposed concrete. Not cold, not warm. Deliberate.

---

## Current Design

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `--blue-bg` | `#0047ff` | Page background (electric, saturated) |
| `--white` | `#ffffff` | Card backgrounds, text on dark |
| `--dark-text` | `#002d1a` | Headings on light backgrounds |
| `--red-accent` | `#ff3333` | Alerts, hover states |
| `--green-accent` | `#207b4f` | Secondary accent |
| `--yellow-accent` | `#fff800` | Highlights, active states |

### Typography
- **Headings:** `Syne:wght@800` — geometric, slightly alien. Used for `h1`.
- **Subheadings/UI:** `Inter:wght@800` — condensed grotesque.
- **Mono/Labels:** `Space Mono:wght@700` — code-like precision for metadata.
- **Body:** `'Helvetica Neue', Helvetica, Arial, sans-serif` — neutral fallback.

### Spatial System
- **Grid:** 12-column, 11-row CSS Grid with `0.625rem` gaps
- **Page padding:** `1.25rem`
- **Card padding:** `3.125rem` horizontal, `4.375rem` vertical
- **Border-radius:** `0` — zero rounding throughout (brutalist)
- **Hover lift:** `translate(-0.625rem, -0.625rem)` with shadow deepening

### Motion Philosophy
Currently: minimal. `vortexWave` keyframe on select elements (float animation), `fadeIn` on load. Hover states are purely positional. The site feels static despite its bold geometry.

### Component Inventory
- **Shape cards:** White panels with deep multi-layer `box-shadow`. Used for header, nav, footer, event boxes.
- **Green shape:** Variant with `--green-accent` background for featured content.
- **Overlay system:** Full-screen modal overlays (events, artist profiles, info popups) with dark backdrop.
- **Artist grid:** Flat grid of artist name links, opens in overlay.
- **Archive quad-scroll:** 4-column scrolling layout for exhibition history.
- **Footer:** Two-column (map + mail) on desktop, icon-row on mobile.
- **Social icons:** Fixed-position floating dots in bottom-right corner.

### Responsive Strategy
Desktop-first. Breakpoint handling via `clamp()` for type, grid rearrangement for panels. Mobile shows icon-row footer, simplified nav. Touch targets adequate at `40×40px`.

---

## Design Opportunities

### 1. Motion as Spatial Language
The grid should feel *inhabited*, not just arranged. Consider:
- Staggered entrance animations for grid panels (cascade from top-left, 50ms delay per cell)
- Parallax depth on hover (cards move at different rates = spatial layering)
- Scroll-driven reveal for archive content (elements emerge as you traverse)

### 2. Type Scale Overhaul
Current `h1` at `clamp(5rem, 10vw, 6rem)` is aggressive but the scale jumps too abruptly to body text. Add a true `h2`/`h3` hierarchy. The subtitle ("Atelier d'artistes et lieu de diffusion") should have its own distinct weight/style.

### 3. Navigation: Less Functional, More Curatorial
Current nav is a plain list inside a white card. For an art space, navigation *is* curation. Consider:
- Numbered navigation items with running tally
- Hover reveals a contextual snippet (next event date, new artist count)
- Breadcrumb or spatial indicator (you are here)

### 4. Artist Profiles: Beyond Overlay
The overlay system works but treats artists as data. If there's enough content per artist (statement, CV, contact), consider a dedicated subpage. If staying with overlays, add a "load more" expansion within the overlay rather than scrolling a tall panel.

### 5. Color Temperature
The blue is bold and correct for an art collective — it's not trying to be invisible. Consider warming it slightly for the archive section (deeper, more archival blue) to create section contrast without breaking brand.

### 6. Nuit Blanche Event (June 6, 2026)
Currently a simple card with morphing text animation. This is the site's most urgent content. Consider:
- Dedicated landing state for the event (full-bleed treatment, countdown, program details)
- A distinct visual mode that doesn't break the grid but intensifies it

### 7. Performance
- `script.js` is 228KB — mostly unused on any given page. Consider code-splitting or lazy-loading.
- `style.css` at 56KB is large but structured. Audit dead styles.
- Images in `/img` need lazy loading and modern format (WebP) audit.

---

## Technical Constraints
- Static HTML/CSS/JS — no build step, no framework
- Must remain hostable on basic shared hosting (Servertown, etc.)
- French-language content throughout
- No CMS currently (could add Decap/Netlify CMS)

---

## Proposed Design Direction: "Constructed Space"

**Keep:**
- The `#0047ff` ground — it's the brand now
- The white card + deep shadow system — architectural, spatial
- The 12-col grid — strong underlying logic
- Zero border-radius — discipline

**Evolve:**
- Typography: richer scale, Syne for display, Inter for UI, Space Mono for metadata
- Motion: purposeful entrance animations, scroll-driven reveals, hover parallax
- Navigation: curatorial personality, not just links
- Archive: deepen the temporal feel (darker section tone, running dates as design element)
- Event section: priority treatment for Nuit Blanche 2026
- Responsive: ensure mobile experience is as spatially considered as desktop
