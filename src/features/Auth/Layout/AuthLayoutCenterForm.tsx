import { Outlet } from "react-router-dom";

import { CenteredBox } from "@/components";

export const AuthLayoutCenterForm = () => {
  return (
    <div className="h-dvh">
      <CenteredBox className="h-full">
        <Outlet />
      </CenteredBox>
    </div>
  );
};
