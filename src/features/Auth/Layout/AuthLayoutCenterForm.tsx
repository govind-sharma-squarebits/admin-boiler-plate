import { Outlet } from "react-router-dom";

import { CenteredBox } from "@/components";

export const AuthLayoutCenterForm = () => {
  return (
    <div className="h-dvh bg-red-500">
      <CenteredBox className="h-full">
        <Outlet />
      </CenteredBox>
    </div>
  );
};
