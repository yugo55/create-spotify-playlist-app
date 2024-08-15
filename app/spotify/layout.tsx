import SideNav from "@/app/ui/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex p-3 gap-3 h-screen overflow-hidden bg-black">
      <SideNav />
      <div className="flex-grow">{children}</div>
    </div>
  );
}