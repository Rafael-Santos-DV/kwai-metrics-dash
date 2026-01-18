"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface FilterButtonProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const FilterButton = ({
  label,
  isActive,
  onClick,
}: FilterButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        isActive && "bg-orange-500",
        "border-[0.1px] border-zinc-50 text-[0.7rem] transition-all",
      )}
    >
      {label}
    </Button>
  );
};
