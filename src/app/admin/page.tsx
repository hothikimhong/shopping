"use client";

import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const stats = [
  { 
    name: "Total Revenue", 
    value: "$128,430", 
    change: "+12.5%", 
    isPositive: true, 
    icon: DollarSign 
  },
  { 
    name: "Total Orders", 
    value: "1,240", 
    change: "+8.2%", 
    isPositive: true, 
    icon: ShoppingBag 
  },
  { 
    name: "New Customers", 
    value: "450", 
    change: "-2.4%", 
    isPositive: false, 
    icon: Users 
  },
  { 
    name: "Active Sessions", 
    value: "3,120", 
    change: "+15.1%", 
    isPositive: true, 
    icon: TrendingUp 
  },
];

const data = [
  { name: "Jan", total: 4000 },
  { name: "Feb", total: 3000 },
  { name: "Mar", total: 2000 },
  { name: "Apr", total: 2780 },
  { name: "May", total: 1890 },
  { name: "Jun", total: 2390 },
  { name: "Jul", total: 3490 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="rounded-sm border bg-white p-6 shadow-sm dark:bg-black/40">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-accent p-2 dark:bg-secondary">
                  <Icon size={20} className="text-primary" />
                </div>
                <div className={cn(
                  "flex items-center text-xs font-bold",
                  stat.isPositive ? "text-green-500" : "text-red-500"
                )}>
                  {stat.change}
                  {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted">{stat.name}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-sm border bg-white p-6 shadow-sm dark:bg-black/40">
          <h3 className="mb-6 text-sm font-bold uppercase tracking-widest">Revenue Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="var(--primary)" 
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-sm border bg-white p-6 shadow-sm dark:bg-black/40">
          <h3 className="mb-6 text-sm font-bold uppercase tracking-widest">Sales by Month</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip />
                <Bar 
                  dataKey="total" 
                  fill="var(--primary)" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders Table (Simplified) */}
      <div className="rounded-sm border bg-white shadow-sm dark:bg-black/40">
        <div className="border-b p-6">
          <h3 className="text-sm font-bold uppercase tracking-widest">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-accent/30 dark:bg-secondary/30">
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Order ID</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Customer</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Status</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Amount</th>
                <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Date</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b hover:bg-accent/10 dark:hover:bg-secondary/10">
                  <td className="px-6 py-4 font-medium text-primary">#ORD-00{i}</td>
                  <td className="px-6 py-4">Customer {i}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold text-green-700 dark:bg-green-950/40 dark:text-green-400 uppercase">
                      Delivered
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold">$249.00</td>
                  <td className="px-6 py-4 text-muted">May 12, 2024</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
