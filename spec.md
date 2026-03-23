# Dreamcrafter Intelligence

## Current State
Full SaaS platform with Companies page (150+ companies with search/filter), Analytics page (charts), Open Roles page (job listings), Market Scout AI agent, and a Login page with a split-panel layout.

## Requested Changes (Diff)

### Add
- Company Detail page (`/company/:name`) with 4 tabs: Overview, Analytics, Open Roles, Market Scout
- Clicking a company card in Companies page navigates to that detail page
- Login page: animated gradient background with color and motion

### Modify
- Companies.tsx: make CompanyCard clickable (navigate to detail page)
- Login.tsx: replace static background with animated gradient/particles
- App.tsx: add `/company/:name` route

### Remove
- Nothing removed

## Implementation Plan
1. Create `CompanyDetail.tsx` — tabbed page with Overview, Analytics, Open Roles, Market Scout sections pre-filled with the company name
2. Update `Companies.tsx` — wrap card in a click handler that navigates to `/company/:companyName`
3. Update `App.tsx` — add companyDetailRoute
4. Update `Login.tsx` — animated gradient background (CSS keyframes + motion)
