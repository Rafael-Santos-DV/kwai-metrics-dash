"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FilterButtonProps {
  type: "A" | "B";
  label: string;
}

export const FilterButton = ({
  type,
  label,
  // isActive,
}: FilterButtonProps) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const paramType = params.get("type");
  const isActive = paramType?.toUpperCase() === type;

  const handleFilter = () => {
    const searchParams = new URLSearchParams(params.toString());

    if (isActive) searchParams.delete("type");
    else searchParams.set("type", type);

    replace(`${pathname}?${searchParams.toString()}`, { scroll: false });
  };

  return (
    <Button
      onClick={handleFilter}
      variant={isActive ? "default" : "outline"}
      className={cn(
        isActive && "bg-orange-500",
        "border-[0.1px] border-zinc-50 text-[0.7rem] transition-all",
      )}
    >
      {label}
    </Button>
  );
};
