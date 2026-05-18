import { cn } from "@/lib";

import { ChildrenModal } from "../ChildrenModal";
import { CustomButton } from "@/components/CustomButton";

interface ConfirmationModalProps {
  title: string;
  description: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  loading?: boolean;
  className?: string;
}
export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  description,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
  showModal,
  setShowModal,
  loading,
  className,
}) => {
  return (
    <ChildrenModal
      showModal={showModal}
      setShowModal={setShowModal}
      className={cn("min-h-72 flex flex-col justify-center px-10!", className)}
    >
      <div className="flex flex-col items-center justify-center text-center gap-4 pt-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">{title}</h1>
          <p className="text-xl text-gray-500 my-4!">{description}</p>
        </div>
        <div className="flex items-center gap-4 justify-center w-full sm:w-auto mt-4">
          <CustomButton
            className="w-35 h-12 bg-gray-200 hover:bg-gray-300 text-gray-800"
            onClick={onCancel}
          >
            <span>{cancelButtonText}</span>
          </CustomButton>
          <CustomButton
            onClick={onConfirm}
            isLoading={loading}
            className="w-35 h-12! text-black!"
          >
            <span>{confirmButtonText}</span>
          </CustomButton>
        </div>
      </div>
    </ChildrenModal>
  );
};
