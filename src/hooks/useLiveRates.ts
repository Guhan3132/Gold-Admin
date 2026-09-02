"use client";

import { useEffect, useState } from "react";

export type Quote = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  history: number[];
};

const INITIAL_QUOTES: Quote[] = [
  {
    symbol: "XAU",
    name: "Gold",
    price: 2847.32,
    change: 0.42,
    history: [2838, 2840, 2842, 2841, 2844, 2846, 2847.32],
  },
  {
    symbol: "XAG",
    name: "Silver",
    price: 32.18,
    change: -0.18,
    history: [32.4, 32.35, 32.28, 32.3, 32.22, 32.2, 32.18],
  },
  {
    symbol: "XPT",
    name: "Platinum",
    price: 1042.5,
    change: 0.31,
    history: [1038, 1039, 1040, 1041, 1041.5, 1042, 1042.5],
  },
  {
    symbol: "XPD",
    name: "Palladium",
    price: 987.2,
    change: -0.12,
    history: [990, 989, 988.5, 988, 987.8, 987.5, 987.2],
  },
  {
    symbol: "AED",
    name: "AED/USD",
    price: 0.2723,
    change: 0.01,
    history: [0.2721, 0.2722, 0.2722, 0.2723, 0.2723, 0.2723, 0.2723],
  },
];

function tickQuote(quote: Quote): Quote {
  const delta = (Math.random() - 0.48) * (quote.price * 0.0015);
  const price = Math.max(0.0001, quote.price + delta);
  const change = quote.change + (Math.random() - 0.5) * 0.08;
  const history = [...quote.history.slice(-11), price];

  return { ...quote, price, change, history };
}

export function useLiveRates() {
  const [quotes, setQuotes] = useState<Quote[]>(INITIAL_QUOTES);
  const [lastUpdate, setLastUpdate] = useState("just now");

  useEffect(() => {
    const interval = setInterval(() => {
      setQuotes((prev) => prev.map(tickQuote));
      setLastUpdate(new Date().toLocaleTimeString("en-AE", { hour12: false }));
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  return { quotes, lastUpdate };
}

export function formatQuotePrice(symbol: string, price: number) {
  if (symbol === "AED") return price.toFixed(4);
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
