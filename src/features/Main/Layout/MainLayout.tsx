import { SideBar, withAuth } from "@/components";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {
  isSideBarLayout?: boolean;
}

export const MainLayout = withAuth((props: MainLayoutProps) => {
  const { isSideBarLayout = false } = props;
  return (
    <div
      className={`grid ${isSideBarLayout ? "grid-cols-[250px_1fr]" : "grid-cols-[1fr]"} h-dvh overflow-hidden`}
    >
      {isSideBarLayout && <SideBar />}

      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
});
