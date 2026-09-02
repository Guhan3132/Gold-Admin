"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Period, PERIOD_LABELS } from "@/lib/period-data";

type PeriodFilterProps = {
  value: Period;
  onChange: (period: Period) => void;
};

export function PeriodFilter({ value, onChange }: PeriodFilterProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as Period)}>
      <TabsList className="h-9 rounded-full bg-muted p-1">
        {(Object.keys(PERIOD_LABELS) as Period[]).map((period) => (
          <TabsTrigger
            key={period}
            value={period}
            className="rounded-full px-4 text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            {PERIOD_LABELS[period]}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
