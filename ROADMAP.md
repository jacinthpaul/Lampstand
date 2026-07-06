# Lampstand Roadmap

A phased plan ordered by cost and infrastructure need. We ship the cheapest,
lowest-friction value first and defer anything that costs money per use.

**Guiding principle:** browser-only tools → free public APIs → database-backed
features → AI/LLM features (last, because they incur per-call cost).

## Current state

- **Vite + React 19 SPA**, pure client-side, no backend.
- **Study Companion** — *preview*. Verse text and the five "lenses"
  (meaning / context / cross-refs / application / reflect) are hardcoded in
  `src/data/verses.js` for a few verses. The "Ask the AI" panel is currently a
  mock (`setTimeout` canned reply in `Study.jsx`). Becomes fully real in
  Phase 2 (Bible text) and Phase 4 (real chat).
- **Timeline Explorer** — genuinely browser-only, static data in
  `src/data/timeline.js`. The model for how Phase 1 tools should look.
- **10 roadmap tools** listed as "coming soon" in the Library.

---

## Phase 1 — Browser-only (no API, no database, no cost)

Logic runs client-side; persistence via `localStorage`. Free forever, no
accounts needed. Ship these first.

1. **Notes / highlights / bookmarks / saved verses** — make the currently
   static `SAVED_VERSES` real via `localStorage`. Foundational; other tools
   build on it.
2. **Memory Coach** — spaced repetition (SM-2 algorithm). Pure JS, local verse
   set, progress in `localStorage`. Highest value, lowest cost.
3. **Question Bank / Quiz** — static curated question JSON, Kahoot-style flow
   in-browser.
4. **Reading Plans (curated, non-AI)** — hand-authored plans (e.g. "Bible in a
   Year", "Gospels in 30 days") as static data + progress in `localStorage`.
   The AI-generated version is Phase 4.
5. **Timeline + Journey Planner (static)** — expand Timeline; build Journey
   Planner with static SVG/image maps (Paul's journeys, the Exodus). No
   map-tile API yet.

## Phase 2 — Free public Christian APIs (still no database)

Make Study Companion work for any verse; add data-rich tools. All free, no or
low-friction keys.

6. **Real Bible text** — fetch any verse instead of hardcoding. Options:
   `bible-api.com` (no key), `bolls.life` (many translations, no key),
   API.Bible or ESV API (free key).
7. **Cross-references & places as bundled data** — ship openbible.info's
   downloadable cross-reference and geocoded-places datasets as static assets
   (no runtime API cost).
8. **Places Explorer** — Leaflet + free OpenStreetMap tiles + the geocoded
   biblical places data. Avoids paid Google Maps.

## Phase 3 — Database-backed (infra cost, no per-call LLM cost)

Add a lightweight backend (e.g. Supabase/Firebase) once identity and sync are
genuinely needed.

9. **Accounts + cross-device sync** — migrate notes/highlights/reading
   progress/saved verses from `localStorage` to the DB.
10. **Group Facilitator (shared groups)** — multi-user study groups, shared
    progress. Inherently needs a DB.
11. **History & sharing** — saved sermon outlines, study history, shareable
    links.

## Phase 4 — AI / LLM features (per-call cost — last)

Everything that calls an LLM. The UI shells exist as "coming soon"; wire real
models here.

12. **Study Companion real chat** — replace the mock reply with a real,
    cite-grounded model call.
13. **Character Chat**, **Sermon Builder**, **Multi-Agent Study**,
    **Visual Story Gen**, **AI Reading Plans**, **AI quiz / discussion-question
    generation**.

---

## Sequencing logic

- **Phase 1** ships value with no recurring cost and no signup friction.
- **Phase 2** keeps per-call cost at zero while making the flagship tool real.
- **Phase 3** introduces cost only when identity/sync require it.
- **Phase 4** is gated last because every interaction costs money — by then
  there are users and persistence to justify it.
