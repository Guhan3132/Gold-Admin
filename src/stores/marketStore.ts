import { create } from "zustand";
import { MarketPrice } from "@/types";

interface MarketStore {
  prices: MarketPrice[];
  setPrices: (prices: MarketPrice[]) => void;
  lastUpdate: string;
  setLastUpdate: (time: string) => void;
}

export const useMarketStore = create<MarketStore>((set) => ({
  prices: [],
  setPrices: (prices) => set({ prices }),
  lastUpdate: "just now",
  setLastUpdate: (time) => set({ lastUpdate: time }),
}));
