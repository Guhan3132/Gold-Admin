"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subInfo?: string;
  subInfoColor?: "green" | "red" | "orange" | "blue";
  badge?: {
    text: string;
    color: "red" | "orange" | "blue" | "green";
  };
}

const badgeColors = {
  red: "bg-red-500/10 text-red-500",
  orange: "bg-orange-500/10 text-orange-500",
  blue: "bg-blue-500/10 text-blue-500",
  green: "bg-green-500/10 text-green-500",
};

const subInfoColors = {
  green: "text-green-500",
  red: "text-red-500",
  orange: "text-orange-500",
  blue: "text-blue-500",
};

export function StatsCard({
  icon: Icon,
  label,
  value,
  subInfo,
  subInfoColor = "green",
  badge,
}: StatsCardProps) {
  return (
    <div className="rounded-xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-sm">{label}</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold">{value}</div>
          {subInfo && (
            <div className={cn("mt-1 text-xs", subInfoColors[subInfoColor])}>
              {subInfo}
            </div>
          )}
        </div>
        {badge && (
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-[10px] font-semibold",
              badgeColors[badge.color]
            )}
          >
            {badge.text}
          </span>
        )}
      </div>
    </div>
  );
}
