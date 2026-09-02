"use client";

import { useEffect, useState } from "react";
import { MarketPrice } from "@/types";

export function useMarketData() {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("/api/market/prices");
        const data = await res.json();
        setPrices(data);
      } catch (error) {
        console.error("Failed to fetch market prices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 1000);

    return () => clearInterval(interval);
  }, []);

  return { prices, loading };
}
