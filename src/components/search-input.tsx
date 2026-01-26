"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const SearchInput = ({ className }: { className?: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { replace } = useRouter();

  const handleSearch = (search: string) => {
    const params = new URLSearchParams(searchParams);

    if (search) params.set("search", search);
    else params.delete("search");

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Input
      className={cn("border-orange-500 text-zinc-50", className)}
      placeholder="Pesquisar"
      defaultValue={searchParams.get("search")?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};
