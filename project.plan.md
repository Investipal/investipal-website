<!-- 23b9691f-5443-42d3-9767-53b200166b4a 5682623c-3f73-4005-8f9d-aa579b9bc201 -->
# US Keyword Research Expansion (Plan)

## Clarifications Needed (answer before execution)
1. Scope breadth: limit to advisor/RIA workflows and compliance, or also include broader investor-facing finance topics for TOFU?
 - a) Advisor/RIA-only
 - b) Include broader finance TOFU
2. Branded coverage: include brand and competitor-branded queries (e.g., Riskalyze, Portfolio Visualizer), or exclude branded terms?
 - a) Include branded (preferred)
 - b) Exclude branded

## Data Collection
- Extract seeds from existing materials: `docs/ai-cmo/projects/value-propositions.md`, `docs/ai-cmo/projects/competitor-landscape.md`, `docs/ai-cmo/icp/*.md`, `src/pages/features/index.astro`, `audit-summary.md`.
- DataForSEO endpoints (US/en):
  - keyword_ideas (up to 200 seeds in batches)
  - keyword_suggestions (per seed)
  - related_keywords depth 2–4 on head terms
  - keyword_overview (CPC, volume, intent, SERP features)
  - bulk_keyword_difficulty
  - search_intent (up to 1K terms/batch)
  - serp_competitors for head terms per pillar
  - google_trends_explore (optional) for seasonality checks

## Processing & Clustering
- Normalize/clean: lowercase, dedupe, strip punctuation, merge near-duplicates.
- Annotate: pillar, suggested page type, main intent, funnel stage, SERP features, CPC, KD, volume.
- Cluster: n-gram grouping + parent topic mapping; merge tiny clusters into nearest pillar; flag high-CPC commercial clusters.
- Competitive gaps: intersect clusters with SERP competitor domains to find gaps and quick-win SERPs.

## Deliverables (repo additions/updates)
- `docs/ai-cmo/research/keywords/keyword-universe.csv`: all keywords with metrics (keyword, volume, KD, CPC, intent, pillar, cluster_id, serp_features, competitors, notes).
- `docs/ai-cmo/research/keywords/clusters.csv`: cluster_id, pillar, label, keywords_count, total_volume, avg_KD, intent_split.
- `docs/ai-cmo/research/keywords/pages-map.csv`: keyword → current/proposed URL, page_type, priority.
- `docs/ai-cmo/research/keywords/queries-missing-coverage.csv`: high-opportunity terms lacking pages.
- `docs/ai-cmo/research/keywords-summary.md`: update with expanded pillars (Proposal Generation, Onboarding, IPS, Statements, Held‑away, Reg BI, RIA software, Portfolio optimization) and top queries per cluster.
- Update `docs/ai-cmo/research/keyword-research-us.md`: insert expanded metrics, new clusters, prioritization and roadmap.
- Update `docs/ai-cmo/pages/landing/strategy.md`: map any net-new clusters to page concepts; add internal linking plan.

## Page & Content Implications
- Recommend net-new pages where needed (proposal hub, onboarding hub variants per custodian, additional templates and checklists).
- Define content formats per cluster: learn hubs, solution pages, downloads, FAQs, comparison pages.

## QA & Handover
- Spot-check 100 random rows for correctness.
- Summarize top 20 clusters by ETV and lowest KD.
- Provide a shortlist of 10 briefs to draft first.

## Task-by-task Execution & Tracking
- Work in small PR-sized edits; after each artifact or doc update, mark the corresponding TODO complete.
- Sequence: seeds → DFSEO pulls → universe.csv → clustering → docs updates → page mapping → gaps → roadmap.


### To-dos

- [x] Extract/compile seed list from ICPs, features, competitors, audit.
- [x] Run keyword_ideas/suggestions/related/overview/difficulty/intent/serp_competitors.
- [x] Assemble keyword-universe.csv with metrics and annotations.
- [x] Cluster keywords, label pillars, compute cluster metrics.
- [x] Update keyword-research-us.md and keywords-summary.md.
- [x] Create pages-map.csv and gaps list.
- [x] Update landing-page-strategy.md with new mappings.
- [x] Summarize top clusters and first 10 briefs.
