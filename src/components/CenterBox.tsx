import { cn } from "@/lib";

export const CenteredBox = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {children}
    </div>
  );
};
