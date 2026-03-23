# Dreamcrafter Intelligence

## Current State
Market Scout page has: 6-step animated pipeline, company overview, live analysis (4 metric cards), WoW stats, AI summary, technical features, scraped results, activity charts, open roles, competitor briefing. Intelligence Sources section was removed. Company URL mapping exists for 27 companies with 6 categories each.

## Requested Changes (Diff)

### Add
- **Intelligence Dashboard header** in ResultPanel: title "INTELLIGENCE DASHBOARD", subtitle "Your Intelligence Analysis Path", live timestamp, company name, tagline "Real-time competitive monitoring · 4 signal categories · 8-week rolling window · analyzing [Company]"
- **Signal category tab pills** already exist but make them prominent at top of results: Release Notes, Features, Press, Dev, Strategy, News, Open Roles, Intelligence Sources
- **Intelligence Sources card** ("Quick access to [Company] signals across 6 intelligence categories") — shows 6 source cards each with icon, label, description, and a clickable link to the real company URL (from COMPANY_URLS mapping, fallback to Google search). Display "6 SOURCES" badge.
- **AI Competitor Briefing** section already exists — ensure it shows ACCEPTED/REJECTED counts visually (e.g. "✓ ACCEPTED (3)  ✗ REJECTED (1)")
- **Live Analysis Report** — upgrade to show per-category signal breakdown: Release Notes (28 signals, +16.7%), Features (25 signals, +8.7%), Press (18 signals, -5.3%), Dev Updates (38 signals, +22.4%), with trend text for each. Values derived from features.length with per-category variation.
- **TRENDING INTEL SIGNALS** section — horizontal scrolling chips showing trending signal tags from the result features
- **Intelligence Pipeline** — 5-step vertical/horizontal pipeline at the bottom: 01 Define (DONE), 02 Collect (DONE), 03 Process (ACTIVE), 04 Analyze (QUEUED), 05 Deliver (QUEUED) — with labels and descriptions. Animate state based on pipeline progress.
- **Export button** visible in Live Analysis Report header area

### Modify
- The ResultPanel layout to incorporate all sections in this order: Intelligence Dashboard header → signal tabs → Intelligence Sources (with links) → AI Competitor Briefing → Live Analysis Report (per-category) → Weekly Activity Charts → TRENDING INTEL SIGNALS → Intelligence Pipeline
- Intelligence Sources section uses COMPANY_URLS to show real clickable links per category for known companies, Google search fallback for unknown

### Remove
- Nothing to remove

## Implementation Plan
1. Add `IntelligenceDashboardHeader` component with timestamp, company, tagline
2. Restore `IntelligenceSourcesCard` component showing 6 category cards with real links from COMPANY_URLS (or google fallback), "6 SOURCES" badge, description per category
3. Upgrade `LiveAnalysisReport` to show per-category rows: category name, signal count, WoW % change, trend description
4. Add `TrendingIntelSignals` component — horizontal chip row from features array
5. Add `IntelligencePipeline` component — 5 stages with DONE/ACTIVE/QUEUED states, animated
6. Update CompetitorBriefingCard to show ACCEPTED/REJECTED count badges
7. Re-order ResultPanel to match requested layout
