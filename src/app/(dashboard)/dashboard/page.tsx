"use client";

import {
  FileCheck,
  MapPin,
  Package,
  RotateCcw,
  Users,
  Wallet,
  ArrowRight,
} from "lucide-react";
import { LiveTicker } from "@/components/layout/LiveTicker";
import { UserOnboardingChart } from "@/components/dashboard/UserOnboardingChart";
import { HoldingsDonut } from "@/components/dashboard/HoldingsDonut";
import { OrdersBarChart } from "@/components/dashboard/OrdersBarChart";
import { MembershipDonut } from "@/components/dashboard/MembershipDonut";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const pulse = [
  { label: "Users", value: "1,284", hint: "+264 mo" },
  { label: "KYC queue", value: "38", hint: "6 escalated" },
  { label: "Sell-back", value: "4", hint: "1 high-value" },
];

const attention = [
  {
    icon: FileCheck,
    label: "KYC / AML pending",
    value: "38",
    delta: "6 escalated",
    tone: "danger" as const,
  },
  {
    icon: Package,
    label: "Low stock SKUs",
    value: "2",
    delta: "Reorder vault bars",
    tone: "warn" as const,
  },
  {
    icon: RotateCcw,
    label: "Sell-back to approve",
    value: "4",
    delta: "1 above AED 250k",
    tone: "info" as const,
  },
  {
    icon: MapPin,
    label: "DMCC pickups today",
    value: "7",
    delta: "1 failed ID check",
    tone: "danger" as const,
  },
];

const toneClass = {
  danger: "bg-danger-50 text-danger-700",
  warn: "bg-warning-50 text-warning-700",
  info: "bg-info-50 text-info-700",
};

const approvals = [
  {
    ref: "SB-3303",
    type: "Sell-back",
    subject: "MG-10250 · AED 5,908",
    status: "Escalated",
    statusClass: "bg-warning-50 text-warning-700",
  },
  {
    ref: "KYC-5524",
    type: "KYC/AML",
    subject: "PEP alert · MG-10250",
    status: "Needs review",
    statusClass: "bg-warning-100 text-warning-800",
  },
  {
    ref: "MG-SC-050",
    type: "Inventory",
    subject: "Silver Coin 50g · 0 units",
    status: "Out of stock",
    statusClass: "bg-danger-50 text-danger-700",
  },
  {
    ref: "PK-7742",
    type: "Pickup",
    subject: "DMCC counter",
    status: "Failed",
    statusClass: "bg-danger-50 text-danger-700",
  },
];

const alerts = [
  {
    title: "Failed payout — bank mismatch (SB-3303)",
    meta: "Finance · 2m ago",
    tone: "danger" as const,
  },
  {
    title: "Out of stock — Silver Coin 50g",
    meta: "Inventory · 14m ago",
    tone: "danger" as const,
  },
  {
    title: "AML possible match — KYC-5521",
    meta: "KYC/AML · 31m ago",
    tone: "warn" as const,
  },
  {
    title: "PEP alert — KYC-5524",
    meta: "KYC/AML · 42m ago",
    tone: "warn" as const,
  },
];

const alertDotClass = {
  danger: "bg-danger-500",
  warn: "bg-warning-500",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-balance">
            Operations report
          </h1>
          <p className="mt-1 max-w-[65ch] text-sm leading-relaxed text-muted-foreground">
            Pulse across 1,284 onboarded users. Custody, approvals, and DMCC
            fulfillment in one view.
          </p>
        </div>
        <Tabs defaultValue="today" className="w-auto">
          <TabsList className="rounded-pill bg-brand-sunken p-1">
            <TabsTrigger value="today" className="rounded-pill data-[state=active]:bg-card data-[state=active]:shadow-soft">
              Today
            </TabsTrigger>
            <TabsTrigger value="week" className="rounded-pill data-[state=active]:bg-card data-[state=active]:shadow-soft">
              7 days
            </TabsTrigger>
            <TabsTrigger value="month" className="rounded-pill data-[state=active]:bg-card data-[state=active]:shadow-soft">
              30 days
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <Card className="xl:col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Platform pulse</CardTitle>
            <CardDescription>Users, queue load, and payouts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-3 gap-3">
              {pulse.map((item) => (
                <div key={item.label}>
                  <p className="text-[11px] text-muted-foreground">{item.label}</p>
                  <p className="mt-1 font-mono text-2xl font-semibold tracking-tight tabular">
                    {item.value}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{item.hint}</p>
                </div>
              ))}
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Queue mix</span>
                <span className="font-mono tabular">
                  KYC 38 · stock 2 · payout 4
                </span>
              </div>
              <div className="flex h-2.5 overflow-hidden rounded-full bg-muted">
                <div className="w-[70%] bg-primary" />
                <div className="w-[8%] bg-gold-500" />
                <div className="w-[22%] bg-navy-300" />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2.5">
              <div className="flex items-center gap-2 text-sm">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                Assets under custody
              </div>
              <p className="font-mono text-sm font-semibold tabular">
                AED 18.64M
                <span className="ml-2 font-sans text-[11px] font-normal text-success-600">
                  +2.1%
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:col-span-4">
          {attention.map((item) => (
            <Card key={item.label} className="transition-shadow hover:shadow-soft">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <item.icon
                    className="h-4 w-4 text-muted-foreground"
                    strokeWidth={1.75}
                  />
                  <Badge
                    variant="secondary"
                    className={cn("border-0 font-normal", toneClass[item.tone])}
                  >
                    {item.delta}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="mt-1 font-mono text-2xl font-semibold tabular">
                  {item.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="xl:col-span-4">
          <LiveTicker />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Card className="lg:col-span-8">
          <CardHeader className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 space-y-0 pb-4">
            <CardTitle className="text-base">Approvals queue</CardTitle>
            <CardDescription className="text-center text-xs">
              status-driven
            </CardDescription>
            <button className="inline-flex items-center justify-self-end gap-1 text-xs font-medium text-gold-600 transition-colors hover:text-gold-700">
              See all
              <ArrowRight className="h-3 w-3" />
            </button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-3 font-medium">Ref</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Subject</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {approvals.map((item) => (
                    <tr
                      key={item.ref}
                      className="border-b border-border/40 last:border-0"
                    >
                      <td className="px-6 py-3.5 font-mono text-xs">
                        {item.ref}
                      </td>
                      <td className="px-4 py-3.5 text-muted-foreground">
                        {item.type}
                      </td>
                      <td className="px-4 py-3.5">{item.subject}</td>
                      <td className="px-4 py-3.5">
                        <Badge
                          className={cn(
                            "border-0 font-normal",
                            item.statusClass
                          )}
                        >
                          {item.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <Button variant="outline" size="sm" className="h-8">
                          Open
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base">Alerts</CardTitle>
            <span className="text-xs text-muted-foreground">7 open</span>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-border/60">
              {alerts.map((alert) => (
                <li
                  key={alert.title}
                  className="flex items-start gap-3 px-6 py-4"
                >
                  <span
                    className={cn(
                      "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                      alertDotClass[alert.tone]
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-snug">{alert.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {alert.meta}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 shrink-0">
                    View
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Activity</h2>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          Own-inventory model. Pricing set in-house, DMCC vault fulfillment.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <UserOnboardingChart />
        <HoldingsDonut />
        <OrdersBarChart />
        <MembershipDonut />
      </div>
    </div>
  );
}
