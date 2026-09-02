import { NextResponse } from "next/server";

export async function GET() {
  const stats = {
    totalUsers: 1284,
    monthlyGrowth: 264,
    assetsUnderCustody: 18640000,
    aumChange: 2.1,
    kycPending: 38,
    kycEscalated: 6,
    lowStock: 2,
    sellBackPending: 4,
    sellBackHighValue: 1,
    dmccPickupsToday: 7,
    dmccPickupsFailed: 1,
  };

  return NextResponse.json(stats);
}
