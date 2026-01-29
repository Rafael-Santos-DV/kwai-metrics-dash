import { getFullUsers } from "@/actions/users";
import { FilterButton } from "@/components/filter-button";
import { SearchInput } from "@/components/search-input";
import { Toaster } from "@/components/ui/sonner";
import { UserListContainer } from "@/components/user-list-container";
import { getAllSheetsData } from "@/services/sheet";
import { CircleCheck } from "lucide-react";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  console.log("teste");
  const { page } = await searchParams;

  const pagesData = await getAllSheetsData();

  const selectedPage =
    pagesData.pages.find((u) => u.page === page) || pagesData.pages[0];

  const users = await getFullUsers(selectedPage.users);

  const initialPage = {
    page: selectedPage.page,
    users,
  };

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
        <SearchInput />
      </div>
      <div className="">
        <div className="flex gap-2">
          <FilterButton label="Tipo A" type="A" />
          <FilterButton label="Tipo B" type="B" />
        </div>
      </div>
      <Suspense
        fallback={<div className="text-zinc-50">Carregando lista...</div>}
      >
        <UserListContainer data={pagesData} initialData={initialPage} />
      </Suspense>
      <Toaster />
    </main>
  );
}
