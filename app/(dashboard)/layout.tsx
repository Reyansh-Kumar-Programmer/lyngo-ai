export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-muted/20 hidden md:block">
        {/* Sidebar will go here */}
        <div className="p-4 font-bold">Lyngo Ai</div>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b flex items-center px-6">
          <div className="md:hidden">Menu</div>
          <div className="ml-auto">Profile</div>
        </header>
        <section className="p-6 flex-1">
          {children}
        </section>
      </main>
    </div>
  );
}
