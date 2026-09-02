"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { formatQuotePrice, useLiveRates } from "@/hooks/useLiveRates";
import { cn } from "@/lib/utils";

function MarqueeItem({
  symbol,
  name,
  price,
  change,
}: {
  symbol: string;
  name: string;
  price: number;
  change: number;
}) {
  const isUp = change >= 0;

  return (
    <span className="inline-flex shrink-0 items-center gap-2 px-6 text-sm">
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {symbol}
      </span>
      <span className="font-medium text-foreground">{name}</span>
      <span className="font-mono font-semibold tabular-nums">
        {formatQuotePrice(symbol, price)}
      </span>
      <span
        className={cn(
          "inline-flex items-center gap-0.5 font-mono text-xs tabular-nums",
          isUp ? "text-success-600" : "text-danger-600"
        )}
      >
        {isUp ? (
          <TrendingUp className="h-3 w-3" />
        ) : (
          <TrendingDown className="h-3 w-3" />
        )}
        {isUp ? "+" : ""}
        {change.toFixed(2)}%
      </span>
      <span className="text-muted-foreground/40">|</span>
    </span>
  );
}

export function LiveRateMarquee() {
  const { quotes, lastUpdate } = useLiveRates();
  const items = [...quotes, ...quotes];

  return (
    <div className="border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex items-center gap-3 px-4 py-2 sm:px-6">
        <span className="shrink-0 rounded-full bg-success-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-success-700">
          Live
        </span>
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee items-center">
            {items.map((quote, index) => (
              <MarqueeItem key={`${quote.symbol}-${index}`} {...quote} />
            ))}
          </div>
        </div>
        <span className="hidden shrink-0 font-mono text-[10px] text-muted-foreground sm:inline">
          {lastUpdate}
        </span>
      </div>
    </div>
  );
}
