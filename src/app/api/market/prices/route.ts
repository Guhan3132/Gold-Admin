import { NextResponse } from "next/server";

export async function GET() {
  const prices = [
    {
      metal: "gold",
      price: 295.39,
      buyPrice: 301.3,
      sellBackPrice: 289.48,
      high24h: 296.8,
      low24h: 293.1,
      change: 1.27,
      changePercent: 0.43,
      currency: "AED",
      unit: "g",
    },
    {
      metal: "silver",
      price: 3.64,
      buyPrice: 3.79,
      sellBackPrice: 3.5,
      high24h: 3.68,
      low24h: 3.61,
      change: 0.023,
      changePercent: 0.64,
      currency: "AED",
      unit: "g",
    },
  ];

  return NextResponse.json(prices);
}
