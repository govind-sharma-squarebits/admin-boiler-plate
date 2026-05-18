import type React from "react";

import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
// import Logo from "../assets/icons/png/LOGO.png";
// import { ConfirmationModal } from "../components/modals/confirmation-modal/ConfirmationModal";

import { LogoutIcon } from "@/assets";
import { navigation } from "@/constants";
import type { NavigationItem } from "../types";
import { ConfirmationModal } from "./modals/confirmation-modal/ConfirmationModal";
import { useState } from "react";
import type { AppDispatch } from "@/redux";
import { useDispatch } from "react-redux";
import { handleLogout } from "@/features";

export const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const pathname = useLocation().pathname;

  const [signOutDialogOpen, setSignOutDialogOpen] = useState<boolean>(false);
  const activeTab = navigation.find((item) =>
    pathname.startsWith(item.path),
  )?.path;

  const handleLogoutFn = () => {
    setSignOutDialogOpen(true);
  };

  const handleParentClick = (item: NavigationItem) => {
    // dispatch(setSearchQuery(""));
    navigate(item.path);
  };

  return (
    <div className="bg-red-500 pt-8 px-4 pb-0 text-center">
      <div className="w-full h-20">
        <img src={""} alt="" className="mx-auto" />
      </div>

      <div className="flex flex-col gap-2.5 pt-8 justify-between h-[calc(100dvh-140px)]">
        <div className="flex flex-col gap-2.5 h-full pr-0.5 overflow-y-auto">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            const active = activeTab?.startsWith(item.path);

            return (
              <div key={item.label} onClick={() => handleParentClick(item)}>
                <div className="text-left relative p-2.5 px-5 cursor-pointer">
                  {active && (
                    <motion.span
                      className="bg-[#FDAF08] absolute z-1 rounded-lg inset-0"
                      layoutId="navItem"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.4,
                      }}
                    />
                  )}
                  <div className="relative z-2 flex items-center gap-2.5">
                    {Icon && (
                      <Icon
                        fill={index === 0 || index === 6 ? "black" : "none"}
                        stroke={index !== 0 && index !== 6 ? "black" : "none"}
                        size="30"
                        className="transition-all duration-400 ease-in-out"
                      />
                    )}
                    <span className="font-medium text-base text-black transition-all duration-400 ease-in-out">
                      {item.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          onClick={handleLogoutFn}
          className="flex items-center gap-2.5 p-2.5 px-5 cursor-pointer"
        >
          <LogoutIcon />
          <span className="font-medium text-base">Sign Out</span>
        </div>
      </div>

      <ConfirmationModal
        title="Sign Out"
        description="Are you sure you want to sign out?"
        confirmButtonText="Yes"
        cancelButtonText="Cancel"
        className="py-10!"
        onConfirm={() => {
          dispatch(handleLogout());
          setSignOutDialogOpen(false);
        }}
        onCancel={() => setSignOutDialogOpen(false)}
        showModal={signOutDialogOpen}
        setShowModal={setSignOutDialogOpen}
      />
    </div>
  );
};
