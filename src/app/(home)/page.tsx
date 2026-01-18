import { FilterButton } from "@/components/filter-button";
import { CircleCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="w-full max-w-5xl mx-auto h-3/4 bg-[#09090b] border border-orange-500 rounded-md p-4">
      <div className="flex justify-between py-5">
        <h1 className="text-zinc-50 text-5xl font-bold">
          Kwai <span className="text-orange-500">Score</span>
        </h1>
        <div className="flex items-center gap-2">
          <span>
            <CircleCheck className="text-green-500" />
          </span>
          <span className="text-zinc-50">Google Drive Conectado</span>
        </div>
      </div>
      <div className="">
        <div className="flex gap-2">
          <FilterButton label="Alta qualidade" isActive />
          <FilterButton label="Alta qualidade" isActive={false} />
          <FilterButton label="Alta qualidade" isActive={false} />
          <FilterButton label="Alta qualidade" isActive={false} />
        </div>
      </div>
    </main>
  );
}
