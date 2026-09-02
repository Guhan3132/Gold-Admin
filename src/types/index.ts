export interface MarketPrice {
  metal: "gold" | "silver";
  price: number;
  buyPrice: number;
  sellBackPrice: number;
  high24h: number;
  low24h: number;
  change: number;
  changePercent: number;
  currency: string;
  unit: string;
}

export interface DashboardStats {
  totalUsers: number;
  monthlyGrowth: number;
  assetsUnderCustody: number;
  aumChange: number;
  kycPending: number;
  kycEscalated: number;
  lowStock: number;
  sellBackPending: number;
  sellBackHighValue: number;
  dmccPickupsToday: number;
  dmccPickupsFailed: number;
}

export interface UserOnboardingData {
  month: string;
  users: number;
}

export interface OrdersByType {
  type: string;
  count: number;
}

export interface MembershipTier {
  name: string;
  percentage: number;
}
