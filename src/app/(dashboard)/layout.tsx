import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Dashboard/app-sidebar";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { useAuthStore } from "@/store/authStore";
import AuthSync from "@/components/Dashboard/auth-sync";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    return <h1>Unauthorized user</h1>;
  }

  return (
    <SidebarProvider className="bg-[url('/noise-bg.png')] ">
      <AuthSync user={user} />
      <AppSidebar />
      <SidebarInset className="ring-1 ring-neutral-500/20 bg-neutral-900 ml-0!">
        <section>{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
