"use client";

import { IPage, KwaiUser } from "@/domain/user";
import { ScrollArea } from "./ui/scroll-area";
import { UserCard } from "./user-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRef, useState } from "react";
import { SearchInput } from "./search-input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getFullUsers } from "@/actions/users";
import { toast } from "sonner";

const UserListContainer = ({
  data,
  initialData,
}: {
  initialData: { page: string; users: KwaiUser[] };
  data: { pages: IPage[]; previewPages: string[] };
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const search = searchParams.get("search") ?? "";
  const type = searchParams.get("type");

  const [previewData, setPreviewData] = useState(initialData);
  const [isPending, setIsPending] = useState(false);

  const filterdUsers =
    previewData?.users.filter(
      (user) =>
        user.kwaiId.toLowerCase().includes(search.toLowerCase()) &&
        (type ? user.type.includes(type) : true),
    ) || [];

  const handleMonth = async (value: string) => {
    if (isPending) return;

    setIsPending(true);

    toast.promise(
      async () => {
        const selectedPage = data.pages.find((p) => p.page === value);
        if (!selectedPage) return;

        const u = await getFullUsers(
          value,
          data.pages.find((p) => p.page === value)!.users,
        );

        setPreviewData({ page: value, users: u });

        const pageParams = new URLSearchParams(searchParams);
        pageParams.set("page", value);
        replace(`${pathname}?${pageParams.toString()}`);
        setIsPending(false);

        const viewport = scrollAreaRef.current?.querySelector(
          "[data-radix-scroll-area-viewport]",
        ) as HTMLDivElement | null;

        viewport?.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
      {
        loading: "Carregando página...",
        success: () => `${value} => Carregado com sucesso!`,
        error: "Parece que deu erro!",
        position: "top-center",
        classNames: {
          toast: "!bg-white dark:!bg-zinc-900",
          success: "!text-green-500 !bg-green-50 !border-green-200",
          error: "!text-red-500 !bg-red-50 !border-red-200",
          loading: "!text-orange-500",
        },
      },
    );
  };

  return (
    <>
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full rounded-md p-4" ref={scrollAreaRef}>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {filterdUsers.map((user) => (
              <UserCard key={user.kwaiId} user={user} />
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex gap-4 text-zinc-50">
        <Select onValueChange={handleMonth} defaultValue={initialData.page}>
          <SelectTrigger
            className="w-full border-orange-500 "
            disabled={isPending}
          >
            <SelectValue placeholder="Selecionar Mês" />
          </SelectTrigger>
          <SelectContent>
            {data.previewPages.map((page) => (
              <SelectItem key={page} value={page}>
                {page}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <SearchInput className="max-md:hidden" />
      </div>
    </>
  );
};

export default UserListContainer;
