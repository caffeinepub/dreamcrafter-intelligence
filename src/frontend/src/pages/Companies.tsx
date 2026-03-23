import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import { Building2, ExternalLink, Globe, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Company } from "../data/companies";
import { companies, countries, industries } from "../data/companies";

const industryColors: Record<string, string> = {
  Technology: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Finance: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Healthcare: "bg-red-500/15 text-red-400 border-red-500/30",
  Retail: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Automotive: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Energy: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Aerospace: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  Consulting: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  Manufacturing: "bg-slate-400/15 text-slate-300 border-slate-400/30",
  "Consumer Goods": "bg-pink-500/15 text-pink-400 border-pink-500/30",
  Media: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  Telecommunications: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  Logistics: "bg-teal-500/15 text-teal-400 border-teal-500/30",
  "Real Estate": "bg-lime-500/15 text-lime-400 border-lime-500/30",
  "Food & Beverage": "bg-rose-500/15 text-rose-400 border-rose-500/30",
  Aviation: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  Mining: "bg-stone-400/15 text-stone-300 border-stone-400/30",
  Conglomerate: "bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30",
  Insurance: "bg-green-500/15 text-green-400 border-green-500/30",
  Agriculture: "bg-lime-600/15 text-lime-300 border-lime-600/30",
  Chemicals: "bg-yellow-600/15 text-yellow-300 border-yellow-600/30",
  Education: "bg-sky-600/15 text-sky-300 border-sky-600/30",
};

const countryFlags: Record<string, string> = {
  "United States": "🇺🇸",
  "United Kingdom": "🇬🇧",
  Germany: "🇩🇪",
  Japan: "🇯🇵",
  China: "🇨🇳",
  France: "🇫🇷",
  Sweden: "🇸🇪",
  Switzerland: "🇨🇭",
  Netherlands: "🇳🇱",
  India: "🇮🇳",
  "South Korea": "🇰🇷",
  Canada: "🇨🇦",
  Australia: "🇦🇺",
  Singapore: "🇸🇬",
  Spain: "🇪🇸",
  Italy: "🇮🇹",
  Finland: "🇫🇮",
  Denmark: "🇩🇰",
  Norway: "🇳🇴",
  Ireland: "🇮🇪",
  Belgium: "🇧🇪",
  Brazil: "🇧🇷",
  Russia: "🇷🇺",
  Taiwan: "🇹🇼",
  "Saudi Arabia": "🇸🇦",
};

function getIndustryColor(industry: string) {
  return (
    industryColors[industry] ??
    "bg-muted/50 text-muted-foreground border-border"
  );
}

function getFlag(country: string) {
  return countryFlags[country] ?? "🌍";
}

function CompanyCard({
  company,
  index,
  onClick,
}: {
  company: Company;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.article
      data-ocid={`companies.item.${index + 1}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }}
      onClick={onClick}
      className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-primary/40 transition-colors group cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
            <Building2
              size={16}
              className="text-muted-foreground group-hover:text-primary transition-colors"
            />
          </div>
          <h3 className="font-semibold text-foreground text-sm leading-tight truncate">
            {company.name}
          </h3>
        </div>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border flex-shrink-0 ${getIndustryColor(company.industry)}`}
        >
          {company.industry}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span>{getFlag(company.country)}</span>
        <span>{company.country}</span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
        {company.description}
      </p>

      <a
        href={company.website}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid={`companies.link.${index + 1}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2 text-xs hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
        >
          <Globe size={12} />
          Visit Official Website
          <ExternalLink size={10} className="ml-auto" />
        </Button>
      </a>

      <p className="text-xs text-primary/70 text-center group-hover:text-primary transition-colors">
        View Details →
      </p>
    </motion.article>
  );
}

export default function CompaniesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return companies.filter((c) => {
      const matchQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      const matchIndustry =
        industryFilter === "all" || c.industry === industryFilter;
      const matchCountry =
        countryFilter === "all" || c.country === countryFilter;
      return matchQuery && matchIndustry && matchCountry;
    });
  }, [query, industryFilter, countryFilter]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return companies
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query]);

  const hasFilters =
    industryFilter !== "all" || countryFilter !== "all" || query.trim();

  function clearFilters() {
    setQuery("");
    setIndustryFilter("all");
    setCountryFilter("all");
  }

  function pickSuggestion(company: Company) {
    setQuery(company.name);
    setShowSuggestions(false);
    inputRef.current?.blur();
  }

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        !inputRef.current?.contains(e.target as Node) &&
        !suggestionsRef.current?.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
              <Building2 size={18} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Company Database
            </h1>
            <Badge
              variant="secondary"
              className="ml-1 bg-primary/15 text-primary border border-primary/20 font-semibold"
            >
              {companies.length}+ Companies
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm ml-12">
            Search and explore global companies. Click any card to view
            Analytics, Open Roles, and Market Scout.
          </p>
        </div>
      </div>

      {/* Search + Filters + Results */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <Input
              ref={inputRef}
              data-ocid="companies.search_input"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder={`Search ${companies.length}+ companies...`}
              className="pl-9 bg-card border-border"
            />
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  ref={suggestionsRef}
                  data-ocid="companies.popover"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.12 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden"
                >
                  {suggestions.map((s) => (
                    <button
                      key={s.name}
                      type="button"
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-muted transition-colors text-sm"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        pickSuggestion(s);
                      }}
                    >
                      <Building2
                        size={13}
                        className="text-muted-foreground flex-shrink-0"
                      />
                      <span className="font-medium text-foreground truncate">
                        {s.name}
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground flex-shrink-0">
                        {s.country}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger
              data-ocid="companies.industry.select"
              className="w-full sm:w-44 bg-card border-border"
            >
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map((ind) => (
                <SelectItem key={ind} value={ind}>
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger
              data-ocid="companies.country.select"
              className="w-full sm:w-44 bg-card border-border"
            >
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {countries.map((c) => (
                <SelectItem key={c} value={c}>
                  {getFlag(c)} {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results bar */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="text-foreground font-semibold">
              {filtered.length}
            </span>{" "}
            of{" "}
            <span className="text-foreground font-semibold">
              {companies.length}
            </span>{" "}
            companies
          </p>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              data-ocid="companies.clear.button"
              onClick={clearFilters}
              className="gap-1.5 text-muted-foreground hover:text-foreground text-xs"
            >
              <X size={12} /> Clear filters
            </Button>
          )}
        </div>

        {hasFilters && (
          <div className="flex flex-wrap gap-2 mb-5">
            {query.trim() && (
              <Badge variant="secondary" className="gap-1 text-xs">
                <Search size={10} />
                {query}
              </Badge>
            )}
            {industryFilter !== "all" && (
              <Badge variant="secondary" className="gap-1 text-xs">
                {industryFilter}
              </Badge>
            )}
            {countryFilter !== "all" && (
              <Badge variant="secondary" className="gap-1 text-xs">
                {getFlag(countryFilter)} {countryFilter}
              </Badge>
            )}
          </div>
        )}

        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((company, i) => (
                <CompanyCard
                  key={company.name}
                  company={company}
                  index={i}
                  onClick={() =>
                    navigate({
                      to: "/company/$companyName",
                      params: { companyName: company.name },
                    })
                  }
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            data-ocid="companies.empty_state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
              <Building2 size={28} className="text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-foreground font-semibold mb-1">
                No companies found
              </p>
              <p className="text-muted-foreground text-sm">
                Try adjusting your search or filters.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              data-ocid="companies.clear.button"
            >
              Clear filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
