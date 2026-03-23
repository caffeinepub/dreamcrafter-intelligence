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
import {
  Building2,
  ExternalLink,
  Globe,
  LayoutGrid,
  List,
  Search,
  Sparkles,
  X,
} from "lucide-react";
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

const industryBorderColors: Record<string, string> = {
  Technology: "border-l-blue-500",
  Finance: "border-l-emerald-500",
  Healthcare: "border-l-red-500",
  Retail: "border-l-orange-500",
  Automotive: "border-l-yellow-500",
  Energy: "border-l-amber-500",
  Aerospace: "border-l-indigo-500",
  Consulting: "border-l-purple-500",
  Manufacturing: "border-l-slate-400",
  "Consumer Goods": "border-l-pink-500",
  Media: "border-l-violet-500",
  Telecommunications: "border-l-cyan-500",
  Logistics: "border-l-teal-500",
  "Real Estate": "border-l-lime-500",
  "Food & Beverage": "border-l-rose-500",
  Aviation: "border-l-sky-500",
  Mining: "border-l-stone-400",
  Conglomerate: "border-l-fuchsia-500",
  Insurance: "border-l-green-500",
  Agriculture: "border-l-lime-600",
  Chemicals: "border-l-yellow-600",
  Education: "border-l-sky-600",
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

function getIndustryBorderColor(industry: string) {
  return industryBorderColors[industry] ?? "border-l-border";
}

function getFlag(country: string) {
  return countryFlags[country] ?? "🌍";
}

function CompanyCard({
  company,
  index,
  onClick,
  onScout,
}: {
  company: Company;
  index: number;
  onClick: () => void;
  onScout: () => void;
}) {
  return (
    <motion.article
      data-ocid={`companies.item.${index + 1}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.3) }}
      onClick={onClick}
      className={`bg-card border border-border border-l-4 ${getIndustryBorderColor(company.industry)} rounded-xl p-5 flex flex-col gap-3 hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 transition-all group cursor-pointer`}
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

      <Button
        variant="ghost"
        size="sm"
        data-ocid={`companies.scout.button.${index + 1}`}
        className="w-full gap-2 text-xs text-primary hover:bg-primary/10"
        onClick={(e) => {
          e.stopPropagation();
          onScout();
        }}
      >
        <Sparkles size={12} />
        Scout This Company
      </Button>
    </motion.article>
  );
}

function CompanyListRow({
  company,
  index,
  onClick,
  onScout,
}: {
  company: Company;
  index: number;
  onClick: () => void;
  onScout: () => void;
}) {
  return (
    <motion.article
      data-ocid={`companies.item.${index + 1}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.15, delay: Math.min(index * 0.02, 0.2) }}
      onClick={onClick}
      className={`bg-card border border-border border-l-4 ${getIndustryBorderColor(company.industry)} rounded-lg px-4 py-3 flex items-center gap-4 hover:border-primary/40 hover:shadow-sm hover:shadow-primary/10 transition-all cursor-pointer group`}
    >
      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
        <Building2
          size={14}
          className="text-muted-foreground group-hover:text-primary transition-colors"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground text-sm truncate">
          {company.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {getFlag(company.country)} {company.country}
        </p>
      </div>
      <span
        className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border flex-shrink-0 ${getIndustryColor(company.industry)}`}
      >
        {company.industry}
      </span>
      <div className="flex items-center gap-2 flex-shrink-0">
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
            className="gap-1.5 text-xs h-7 px-2.5"
          >
            <Globe size={11} /> Website
          </Button>
        </a>
        <Button
          variant="ghost"
          size="sm"
          data-ocid={`companies.scout.button.${index + 1}`}
          className="gap-1.5 text-xs h-7 px-2.5 text-primary hover:bg-primary/10"
          onClick={(e) => {
            e.stopPropagation();
            onScout();
          }}
        >
          <Sparkles size={11} /> Scout
        </Button>
      </div>
    </motion.article>
  );
}

export default function CompaniesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
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

  function handleScout(companyName: string) {
    sessionStorage.setItem("scout_prefill", companyName);
    navigate({ to: "/market-scout" });
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

      {/* Hero Stats Banner */}
      <div className="px-6 py-5">
        <div className="max-w-6xl mx-auto">
          <div
            className="relative rounded-2xl overflow-hidden p-6"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.18 0.04 275) 0%, oklch(0.15 0.06 285) 40%, oklch(0.13 0.05 260) 100%)",
            }}
          >
            {/* Animated radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 50% 50%, oklch(0.45 0.15 275 / 0.18) 0%, transparent 70%)",
                animation: "pulse 4s ease-in-out infinite",
              }}
            />
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                {
                  value: "1,026+",
                  label: "Companies Tracked",
                  color: "text-indigo-300",
                },
                { value: "20+", label: "Industries", color: "text-purple-300" },
                { value: "30+", label: "Countries", color: "text-violet-300" },
                {
                  value: "Real-time",
                  label: "Intelligence",
                  color: "text-blue-300",
                },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-indigo-200/70 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search + Filters + Results */}
      <div className="max-w-6xl mx-auto px-6 pb-10">
        {/* Search Row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
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

          {/* Country filter — always visible */}
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

          {/* Industry select — mobile fallback (hidden on desktop) */}
          <div className="sm:hidden">
            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger
                data-ocid="companies.industry.select"
                className="w-full bg-card border-border"
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
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1 flex-shrink-0">
            <button
              type="button"
              data-ocid="companies.grid.toggle"
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              type="button"
              data-ocid="companies.list.toggle"
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Industry chips (desktop) */}
        <div className="hidden sm:flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          <button
            type="button"
            data-ocid="companies.industry.tab"
            onClick={() => setIndustryFilter("all")}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
              industryFilter === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
            }`}
          >
            All
          </button>
          {industries.map((ind) => (
            <button
              key={ind}
              type="button"
              onClick={() =>
                setIndustryFilter(industryFilter === ind ? "all" : ind)
              }
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                industryFilter === ind
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Results bar */}
        {hasFilters && (
          <div className="flex items-center justify-end mb-5">
            <Button
              variant="ghost"
              size="sm"
              data-ocid="companies.clear.button"
              onClick={clearFilters}
              className="gap-1.5 text-muted-foreground hover:text-foreground text-xs"
            >
              <X size={12} /> Clear filters
            </Button>
          </div>
        )}

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
          viewMode === "grid" ? (
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
                    onScout={() => handleScout(company.name)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-2">
              <AnimatePresence mode="popLayout">
                {filtered.map((company, i) => (
                  <CompanyListRow
                    key={company.name}
                    company={company}
                    index={i}
                    onClick={() =>
                      navigate({
                        to: "/company/$companyName",
                        params: { companyName: company.name },
                      })
                    }
                    onScout={() => handleScout(company.name)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )
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
