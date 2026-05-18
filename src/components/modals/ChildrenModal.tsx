import { motion } from "framer-motion";

import { CloseIcon } from "../../assets";
import { cn } from "../../lib";

import "./model.css";
interface ChildrenModalProps {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  className?: string;
  zIndex?: number;
}

export const ChildrenModal: React.FC<ChildrenModalProps> = ({
  children,
  showModal,
  setShowModal,
  className,
  zIndex,
}) => {
  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 grid place-items-center backdrop-blur-sm bg-black/50"
      style={{ zIndex: zIndex || 50 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className={cn(
          "relative max-h-[90vh]  bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-[90%] h-auto min-h-96 text-center overflow-y-auto hidden-scrollbar",
          className,
        )}
      >
        <div
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setShowModal(false)}
        >
          <CloseIcon stroke="#EA2B2E" />
        </div>
        {children}
      </motion.div>
    </div>
  );
};
