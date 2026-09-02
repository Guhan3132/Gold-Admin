"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MetalQuote {
  metal: string;
  unit: string;
  price: number;
  buyPrice: number;
  sellBackPrice: number;
  high24h: number;
  low24h: number;
  changePercent: number;
  history: number[];
}

const HISTORY_LEN = 36;

function seedHistory(start: number, step: number) {
  const points: number[] = [];
  let value = start - step * 6;
  for (let i = 0; i < HISTORY_LEN; i += 1) {
    const wave = Math.sin(i / 4.2) * step * 1.4;
    const drift = ((i * 37) % 10) / 10 * step * 0.35;
    value = start - step * 2 + wave + drift;
    points.push(Number(value.toFixed(4)));
  }
  points[points.length - 1] = start;
  return points;
}

const initialQuotes: MetalQuote[] = [
  {
    metal: "Gold",
    unit: "AED / g",
    price: 295.39,
    buyPrice: 301.3,
    sellBackPrice: 289.48,
    high24h: 296.8,
    low24h: 293.1,
    changePercent: 0.43,
    history: seedHistory(295.39, 0.22),
  },
  {
    metal: "Silver",
    unit: "AED / g",
    price: 3.64,
    buyPrice: 3.79,
    sellBackPrice: 3.5,
    high24h: 3.68,
    low24h: 3.61,
    changePercent: 0.64,
    history: seedHistory(3.64, 0.018),
  },
];

function buildAreaPath(values: number[], width: number, height: number) {
  if (values.length < 2) {
    return { line: "", area: "" };
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const coords = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width;
    const y = height * 0.18 + (1 - (value - min) / span) * (height * 0.7);
    return { x, y };
  });

  let line = `M ${coords[0].x.toFixed(2)} ${coords[0].y.toFixed(2)}`;
  for (let i = 0; i < coords.length - 1; i += 1) {
    const p0 = coords[i - 1] ?? coords[i];
    const p1 = coords[i];
    const p2 = coords[i + 1];
    const p3 = coords[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    line += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }

  const area = `${line} L ${width} ${height} L 0 ${height} Z`;
  return { line, area };
}

function RateSpark({
  values,
  up,
}: {
  values: number[];
  up: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const width = 220;
  const height = 108;
  const { line, area } = useMemo(
    () => buildAreaPath(values, width, height),
    [values]
  );
  const stroke = up ? "#2E9B67" : "#C8422E";
  const fillStart = up ? "#2E9B67" : "#C8422E";

  return (
    <svg
      className="absolute inset-y-0 right-0 h-full w-[58%]"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`rate-fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillStart} stopOpacity="0.28" />
          <stop offset="100%" stopColor={fillStart} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#rate-fill-${uid})`} />
      <path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth="2.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function LiveTicker() {
  const [quotes, setQuotes] = useState<MetalQuote[]>(initialQuotes);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const interval = window.setInterval(() => {
      setQuotes((prev) =>
        prev.map((quote) => {
          const drift =
            quote.metal === "Gold"
              ? (Math.random() - 0.5) * 0.28
              : (Math.random() - 0.5) * 0.03;
          const nextPrice = Math.max(0.01, quote.price + drift);
          const history = [...quote.history.slice(1), nextPrice];
          const origin = history[0];
          const changePercent = ((nextPrice - origin) / origin) * 100;

          return {
            ...quote,
            price: nextPrice,
            high24h: Math.max(quote.high24h, nextPrice),
            low24h: Math.min(quote.low24h, nextPrice),
            changePercent,
            history,
          };
        })
      );
    }, 1400);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <Card className="h-full bg-white">
      <CardHeader className="flex-row items-start justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-base">Live market</CardTitle>
          <CardDescription>Spot rates, AED per gram</CardDescription>
        </div>
        <Badge
          variant="secondary"
          className="border-0 bg-success-50 font-normal text-success-700"
        >
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-success-500 motion-safe:animate-pulse-dot" />
          Open
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {quotes.map((quote) => {
          const up = quote.changePercent >= 0;
          return (
            <div
              key={quote.metal}
              className="relative overflow-hidden rounded-2xl border border-border bg-white px-4 py-3.5"
            >
              <RateSpark values={quote.history} up={up} />
              <div className="relative z-10 w-[48%] min-w-[9.5rem]">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "h-2.5 w-2.5 rounded-full ring-2 ring-white",
                      quote.metal === "Gold" ? "bg-gold-500" : "bg-navy-300"
                    )}
                  />
                  <div>
                    <p className="text-sm font-semibold leading-none">
                      {quote.metal}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {quote.unit}
                    </p>
                  </div>
                </div>
                <p
                  className={cn(
                    "mt-3 font-mono text-[1.65rem] font-semibold tracking-tight tabular",
                    quote.metal === "Gold" ? "text-gold-600" : "text-brand-ink"
                  )}
                >
                  {quote.price.toFixed(2)}
                </p>
                <p
                  className={cn(
                    "mt-1 inline-flex items-center gap-1 text-xs font-medium",
                    up ? "text-success-600" : "text-danger-600"
                  )}
                >
                  {up ? (
                    <TrendingUp className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5" />
                  )}
                  {up ? "+" : ""}
                  {quote.changePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          );
        })}

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="rounded-xl border border-border bg-white p-3">
            <p className="text-[11px] text-muted-foreground">Custody</p>
            <p className="mt-1 font-mono text-lg font-semibold tabular">
              AED 18.64M
            </p>
            <p className="text-[11px] text-success-600">+2.1% today</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-3">
            <p className="text-[11px] text-muted-foreground">Orders / volume</p>
            <p className="mt-1 font-mono text-lg font-semibold tabular">412</p>
            <p className="text-[11px] text-muted-foreground">AED 1.27M</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
