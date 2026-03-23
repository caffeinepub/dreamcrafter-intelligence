# Dreamcrafter Intelligence

## Current State
Full SaaS platform with auth, profiles, API keys, reports, and browser API. No company database page exists yet.

## Requested Changes (Diff)

### Add
- Company Database page (`/companies`) with 500+ representative companies (seeded in frontend as static data to cover major global firms across industries)
- Search bar with autocomplete (name, industry, country)
- Filter sidebar/dropdowns: by Industry, by Country
- Company cards showing: Name, Industry, Country, Description, "Visit Official Website" button
- Navigation link "Companies" in navbar
- Route `/companies` in App.tsx

### Modify
- App.tsx: add `/companies` route
- Layout/Navbar: add "Companies" nav link

### Remove
- Nothing

## Implementation Plan
1. Create `src/frontend/src/data/companies.ts` with 500+ company entries (name, website, industry, country, description)
2. Create `src/frontend/src/pages/Companies.tsx` with search autocomplete, industry/country filters, company cards with Visit Website button
3. Update App.tsx to add companies route
4. Update Layout/Navbar to include Companies nav item
