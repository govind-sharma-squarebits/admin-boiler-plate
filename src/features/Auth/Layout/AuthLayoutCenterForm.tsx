import { Outlet } from "react-router-dom";

import { CenteredBox, withoutAuth } from "@/components";

export const AuthLayoutCenterForm = withoutAuth(() => {
  return (
    <div className="h-dvh bg-red-500">
      <CenteredBox className="h-full">
        <Outlet />
      </CenteredBox>
    </div>
  );
});
