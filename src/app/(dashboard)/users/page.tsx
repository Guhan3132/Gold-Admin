"use client";

import { useMemo, useState } from "react";
import { Filter, MoreHorizontal, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usersMock, UserRecord } from "@/lib/users-data";
import { cn } from "@/lib/utils";

const statusStyles: Record<UserRecord["status"], string> = {
  active: "border-0 bg-success-50 text-success-700",
  pending: "border-0 bg-warning-50 text-warning-700",
  suspended: "border-0 bg-danger-50 text-danger-700",
};

const kycStyles: Record<UserRecord["kyc"], string> = {
  verified: "border-0 bg-success-50 text-success-700",
  pending: "border-0 bg-warning-50 text-warning-700",
  expiring: "border-0 bg-warning-100 text-warning-800",
};

const tierLabels: Record<UserRecord["tier"], string> = {
  standard: "Standard",
  premium: "Premium",
  corporate: "Corporate",
};

export default function UsersPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | UserRecord["status"]>(
    "all"
  );

  const filteredUsers = useMemo(() => {
    return usersMock.filter((user) => {
      const matchesQuery =
        query === "" ||
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.id.toLowerCase().includes(query.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [query, statusFilter]);

  const stats = useMemo(
    () => ({
      total: usersMock.length,
      active: usersMock.filter((u) => u.status === "active").length,
      pending: usersMock.filter((u) => u.status === "pending").length,
      kycIssues: usersMock.filter((u) => u.kyc !== "verified").length,
    }),
    []
  );

  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              User management
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              {stats.total.toLocaleString()} onboarded accounts. Search, filter,
              and review KYC status across all tiers.
            </p>
          </div>
          <Button className="shrink-0 gap-2">
            <Plus className="h-4 w-4" />
            Add user
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Total users", value: stats.total },
            { label: "Active", value: stats.active },
            { label: "Pending onboarding", value: stats.pending },
            { label: "KYC attention", value: stats.kycIssues },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold tabular-nums">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">All users</CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search name, email, ID..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-9 w-full pl-9 sm:w-64"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    {statusFilter === "all"
                      ? "All statuses"
                      : statusFilter.charAt(0).toUpperCase() +
                        statusFilter.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("suspended")}
                  >
                    Suspended
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-left text-xs text-muted-foreground">
                    <th className="px-6 py-3 font-medium">User</th>
                    <th className="px-4 py-3 font-medium">Tier</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">KYC</th>
                    <th className="px-4 py-3 font-medium">AUM</th>
                    <th className="px-4 py-3 font-medium">Joined</th>
                    <th className="px-4 py-3 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-border/40 transition-colors last:border-0 hover:bg-muted/30"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                          <p className="font-mono text-[10px] text-muted-foreground/70">
                            {user.id}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant="secondary" className="text-xs">
                          {tierLabels[user.tier]}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge
                          className={cn("text-xs capitalize", statusStyles[user.status])}
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge
                          className={cn("text-xs capitalize", kycStyles[user.kyc])}
                        >
                          {user.kyc}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 font-mono text-xs tabular-nums">
                        {user.aum}
                      </td>
                      <td className="px-4 py-4 text-xs text-muted-foreground">
                        {user.joined}
                      </td>
                      <td className="px-4 py-4">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredUsers.length === 0 ? (
              <p className="px-6 py-8 text-center text-sm text-muted-foreground">
                No users match your search.
              </p>
            ) : null}
          </CardContent>
        </Card>
    </div>
  );
}
