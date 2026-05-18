import { CenteredBox } from "@/components";
import { Outlet } from "react-router-dom";

export const AuthLayoutSideForm = () => {
  return (
    <div className="h-dvh grid grid-cols-[55%_1fr]">
      <div className="h-full bg-blue-500"></div>
      <CenteredBox className="h-full">
        <Outlet />
      </CenteredBox>
    </div>
  );
};
