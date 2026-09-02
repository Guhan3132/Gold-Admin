"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
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
  { type: "Buy", count: 2412 },
  { type: "Recurring", count: 1784 },
  { type: "Sell-back", count: 612 },
  { type: "Swap", count: 318 },
  { type: "Pickup", count: 247 },
  { type: "Corp", count: 196 },
];

export function OrdersBarChart() {
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-base">Orders by type</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D3D6DC" vertical={false} />
              <XAxis
                dataKey="type"
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
              <Bar dataKey="count" fill="#02091A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
