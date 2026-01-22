import { FilterButton } from "@/components/filter-button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserCard } from "@/components/user-card";
import { CircleCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 w-full h-[90vh] justify-between max-w-5xl lg:max-w-7xl mx-auto bg-zinc-900/40 border border-orange-500 rounded-md p-4">
      <header className="flex justify-between py-5">
        <h1 className="text-zinc-50 text-3xl md:text-5xl font-bold">
          Kwai <span className="text-orange-500">Score</span>
        </h1>
        <div className="flex items-center gap-2">
          <span>
            <CircleCheck className="text-green-500" size={20} />
          </span>
          <span className="text-zinc-50 text-xs md:text-2xl font-bold">
            Google Drive Conectado
          </span>
        </div>
      </header>
      <div className="md:hidden lg:hidden">
        <Input
          className="border-orange-500 text-zinc-50"
          placeholder="Pesquisar"
        />
      </div>
      <div className="">
        <div className="flex gap-2">
          <FilterButton label="Alta qualidade" isActive />
          <FilterButton label="Alta qualidade" isActive={false} />
          <FilterButton label="Alta qualidade" isActive={false} />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full rounded-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <UserCard />
          </div>
        </ScrollArea>
      </div>
      <div className="flex gap-4 text-zinc-50">
        <Select>
          <SelectTrigger className="w-full border-orange-500 ">
            <SelectValue placeholder="Selecionar Mês" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>

        <Input
          className="border-orange-500 max-md:hidden"
          placeholder="Pesquisar"
        />
      </div>
    </main>
  );
}
