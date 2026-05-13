import { AdminSidebar } from "@/components/admin-sidebar";
import { Container } from "@/components/ui/container";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <header className="h-20 border-b bg-white dark:bg-black/40">
          <div className="flex h-full items-center justify-between px-8">
            <h1 className="text-sm font-bold uppercase tracking-widest">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-primary" />
              <div className="text-right">
                <p className="text-xs font-bold">Admin User</p>
                <p className="text-[10px] text-muted">Administrator</p>
              </div>
            </div>
          </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
