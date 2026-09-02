export type Period = "today" | "week" | "month";

export const PERIOD_LABELS: Record<Period, string> = {
  today: "Today",
  week: "7 days",
  month: "30 days",
};

export type PulseStat = {
  label: string;
  value: string;
  delta: string;
  tone: "neutral" | "positive" | "negative";
};

export type AttentionCard = {
  title: string;
  detail: string;
  count: number;
  tone: "warning" | "danger" | "info";
};

export type DashboardPeriodData = {
  subtitle: string;
  pulse: PulseStat[];
  attention: AttentionCard[];
  onboardingChart: { label: string; users: number }[];
  onboardingDescription: string;
  ordersChart: { type: string; count: number }[];
  ordersDescription: string;
};

export const dashboardDataByPeriod: Record<Period, DashboardPeriodData> = {
  today: {
    subtitle:
      "Pulse across 1,284 onboarded users. Custody, approvals, and DMCC fulfillment in one view.",
    pulse: [
      { label: "Active users", value: "1,284", delta: "+12 today", tone: "positive" },
      { label: "Pending KYC", value: "47", delta: "8 awaiting review", tone: "neutral" },
      { label: "Open orders", value: "156", delta: "+23 vs yesterday", tone: "positive" },
      { label: "Custody value", value: "AED 48.2M", delta: "+0.8% today", tone: "positive" },
    ],
    attention: [
      {
        title: "KYC expiring",
        detail: "Documents due within 7 days",
        count: 12,
        tone: "warning",
      },
      {
        title: "Failed payments",
        detail: "Recurring buy attempts",
        count: 5,
        tone: "danger",
      },
      {
        title: "Pickup ready",
        detail: "DMCC vault releases",
        count: 18,
        tone: "info",
      },
    ],
    onboardingChart: [
      { label: "6am", users: 4 },
      { label: "9am", users: 18 },
      { label: "12pm", users: 31 },
      { label: "3pm", users: 42 },
      { label: "6pm", users: 51 },
      { label: "Now", users: 58 },
    ],
    onboardingDescription: "New sign-ups today",
    ordersChart: [
      { type: "Buy", count: 84 },
      { type: "Recurring", count: 62 },
      { type: "Sell-back", count: 18 },
      { type: "Swap", count: 11 },
      { type: "Pickup", count: 9 },
      { type: "Corp", count: 7 },
    ],
    ordersDescription: "Today",
  },
  week: {
    subtitle:
      "7-day pulse across 1,284 onboarded users. Week-over-week custody and fulfillment trends.",
    pulse: [
      { label: "Active users", value: "1,284", delta: "+86 this week", tone: "positive" },
      { label: "Pending KYC", value: "47", delta: "-11 vs last week", tone: "positive" },
      { label: "Open orders", value: "892", delta: "+14% WoW", tone: "positive" },
      { label: "Custody value", value: "AED 48.2M", delta: "+2.4% this week", tone: "positive" },
    ],
    attention: [
      {
        title: "KYC expiring",
        detail: "Documents due within 7 days",
        count: 34,
        tone: "warning",
      },
      {
        title: "Failed payments",
        detail: "Recurring buy attempts",
        count: 22,
        tone: "danger",
      },
      {
        title: "Pickup ready",
        detail: "DMCC vault releases",
        count: 64,
        tone: "info",
      },
    ],
    onboardingChart: [
      { label: "Mon", users: 62 },
      { label: "Tue", users: 78 },
      { label: "Wed", users: 71 },
      { label: "Thu", users: 94 },
      { label: "Fri", users: 88 },
      { label: "Sat", users: 54 },
      { label: "Sun", users: 48 },
    ],
    onboardingDescription: "New sign-ups this week",
    ordersChart: [
      { type: "Buy", count: 612 },
      { type: "Recurring", count: 448 },
      { type: "Sell-back", count: 156 },
      { type: "Swap", count: 82 },
      { type: "Pickup", count: 64 },
      { type: "Corp", count: 51 },
    ],
    ordersDescription: "Last 7 days",
  },
  month: {
    subtitle:
      "30-day operations view across 1,284 onboarded users. Monthly custody, approvals, and DMCC throughput.",
    pulse: [
      { label: "Active users", value: "1,284", delta: "+312 this month", tone: "positive" },
      { label: "Pending KYC", value: "47", delta: "Stable vs last month", tone: "neutral" },
      { label: "Open orders", value: "3,412", delta: "+9% MoM", tone: "positive" },
      { label: "Custody value", value: "AED 48.2M", delta: "+6.1% this month", tone: "positive" },
    ],
    attention: [
      {
        title: "KYC expiring",
        detail: "Documents due within 30 days",
        count: 89,
        tone: "warning",
      },
      {
        title: "Failed payments",
        detail: "Recurring buy attempts",
        count: 67,
        tone: "danger",
      },
      {
        title: "Pickup ready",
        detail: "DMCC vault releases",
        count: 214,
        tone: "info",
      },
    ],
    onboardingChart: [
      { label: "W1", users: 198 },
      { label: "W2", users: 246 },
      { label: "W3", users: 284 },
      { label: "W4", users: 312 },
    ],
    onboardingDescription: "New sign-ups this month",
    ordersChart: [
      { type: "Buy", count: 2412 },
      { type: "Recurring", count: 1784 },
      { type: "Sell-back", count: 612 },
      { type: "Swap", count: 318 },
      { type: "Pickup", count: 247 },
      { type: "Corp", count: 196 },
    ],
    ordersDescription: "Last 30 days",
  },
};
