import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Dashboard/app-sidebar";
import { getCurrentUser, userType } from "@/utils/getCurrentUser";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user = await getCurrentUser();
  if (!user) {
    return <h1>No user hello</h1>;
  }

  return (
    <SidebarProvider className="bg-[url('/noise-bg.png')] ">
      <AppSidebar user={user} />
      <SidebarInset className="ring-1 ring-neutral-500/20 bg-neutral-900 ml-0!">
        <section>{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
