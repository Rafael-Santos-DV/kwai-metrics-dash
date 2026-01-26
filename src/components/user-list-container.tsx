"use client";

import { Pages } from "@/domain/user";
import { ScrollArea } from "./ui/scroll-area";
import { UserCard } from "./user-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { useState } from "react";

export const UserListContainer = ({
  data,
}: {
  data: { pages: Pages[]; previewPages: string[] };
}) => {
  const [selectedMonth, setSelectedMonth] = useState(data.previewPages[0]);
  const [search, setSearch] = useState("");

  const currentPage = data.pages.find((p) => p.page === selectedMonth);

  const filterdUsers =
    currentPage?.users.filter((user) =>
      user.kwaiId.toLowerCase().includes(search.toLowerCase()),
    ) || [];
  return (
    <>
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full rounded-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {filterdUsers.map((user) => (
              <UserCard key={user.kwaiId} user={user} />
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex gap-4 text-zinc-50">
        <Select onValueChange={setSelectedMonth} defaultValue={selectedMonth}>
          <SelectTrigger className="w-full border-orange-500 ">
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

        <Input
          className="border-orange-500 max-md:hidden"
          placeholder="Pesquisar"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </>
  );
};
