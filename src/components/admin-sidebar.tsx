"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings, 
  ChevronRight,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Customers", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-accent/10 dark:bg-secondary/10">
      <div className="flex h-20 items-center border-b px-8">
        <Link href="/admin" className="font-serif text-xl font-bold tracking-tighter text-primary">
          AURELIA <span className="text-[10px] uppercase text-muted tracking-widest font-sans ml-1">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-2 p-4 pt-8">
        {adminLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center justify-between rounded-sm px-4 py-3 text-sm font-medium transition-all",
                isActive 
                  ? "bg-primary text-white shadow-md" 
                  : "text-muted hover:bg-accent hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} />
                {link.name}
              </div>
              {isActive && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <button className="flex w-full items-center gap-3 rounded-sm px-4 py-3 text-sm font-medium text-muted hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/20 transition-all">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};
