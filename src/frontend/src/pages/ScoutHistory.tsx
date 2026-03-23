import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { History } from "lucide-react";
import { useScoutHistory } from "../hooks/useQueries";

export default function ScoutHistoryPage() {
  const { data: history, isLoading } = useScoutHistory();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <History size={24} className="text-primary" />
        <h1 className="text-2xl font-bold">Scout History</h1>
      </div>

      {isLoading && (
        <div
          className="flex items-center justify-center py-16"
          data-ocid="scout_history.loading_state"
        >
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      )}

      {!isLoading && (!history || history.length === 0) && (
        <div
          className="flex flex-col items-center justify-center py-20 text-center"
          data-ocid="scout_history.empty_state"
        >
          <History
            size={48}
            className="text-muted-foreground mb-4 opacity-40"
          />
          <p className="text-muted-foreground text-lg">No scout runs yet.</p>
          <p className="text-muted-foreground text-sm mt-1">
            Run Market Scout to see history here.
          </p>
          <Link to="/market-scout">
            <Button
              className="mt-6"
              data-ocid="scout_history.go_to_market_scout_button"
            >
              Go to Market Scout
            </Button>
          </Link>
        </div>
      )}

      {!isLoading && history && history.length > 0 && (
        <div className="space-y-4" data-ocid="scout_history.list">
          {history.map((item, index) => {
            const date = new Date(Number(item.timestamp) / 1_000_000);
            return (
              <Card
                key={`${item.companyName}-${String(item.timestamp)}`}
                className="border-border"
                data-ocid={`scout_history.item.${index + 1}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">
                      {item.companyName}
                    </CardTitle>
                    <Badge variant="secondary">
                      {date.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {item.features.length} features extracted
                    </Badge>
                  </div>
                  {item.summary && (
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {item.summary}
                    </p>
                  )}
                  <Link to="/market-scout">
                    <Button
                      size="sm"
                      variant="outline"
                      data-ocid={`scout_history.view_button.${index + 1}`}
                    >
                      View in Market Scout
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
