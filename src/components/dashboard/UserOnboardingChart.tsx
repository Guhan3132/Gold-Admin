"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { month: "Jan", users: 118 },
  { month: "Feb", users: 286 },
  { month: "Mar", users: 512 },
  { month: "Apr", users: 741 },
  { month: "May", users: 1048 },
  { month: "Jun", users: 1284 },
];

export function UserOnboardingChart() {
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-base">User onboarding</CardTitle>
          <CardDescription>Cumulative accounts, 2026</CardDescription>
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          Target 1,000
        </span>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#02091A" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#02091A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#D3D6DC" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#5C5A50" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#5C5A50" }}
              />
              <Tooltip />
              <ReferenceLine
                y={1000}
                stroke="#2E9B67"
                strokeDasharray="5 5"
                label={{ value: "Target", fill: "#2E9B67", fontSize: 11 }}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#02091A"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
