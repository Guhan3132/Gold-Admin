"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bell,
  Users,
  FileCheck,
  Package,
  ShoppingCart,
  RotateCcw,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Alerts", href: "/alerts", icon: Bell, badge: 7 },
  { label: "Users", href: "/users", icon: Users },
  { label: "KYC / AML", href: "/kyc", icon: FileCheck, badge: 38 },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
  { label: "Stock", href: "/inventory", icon: Package, badge: 2 },
  { label: "Sell-back", href: "/sell-back", icon: RotateCcw, badge: 4 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-full w-[232px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
      <div className="flex h-16 items-center gap-2.5 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500 text-sm font-semibold text-brand-ink">
          M
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">
            MeiGold
          </p>
          <p className="text-[11px] text-muted-foreground">UAE operations</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4 scrollbar-thin">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-sm transition-colors",
                isActive
                  ? "bg-gold-50 font-medium text-brand-ink"
                  : "text-muted-foreground hover:bg-gold-50/60 hover:text-brand-ink"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge ? (
                <Badge
                  variant="secondary"
                  className={cn(
                    "h-5 min-w-5 justify-center rounded-md px-1.5 font-mono text-[10px] font-medium",
                    item.badge > 10
                      ? "border-0 bg-danger-50 text-danger-700"
                      : "border-0 bg-warning-50 text-warning-700"
                  )}
                >
                  {item.badge}
                </Badge>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-4">
        <Separator className="mb-3" />
        <div className="flex items-center gap-2.5 rounded-xl border border-sidebar-border bg-sidebar-accent/60 p-2.5">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarFallback className="rounded-lg bg-gold-500 text-[11px] text-brand-ink">
              SA
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">S. Al Marri</p>
            <p className="truncate text-[11px] text-muted-foreground">
              s.almarri@meigold.ae
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
