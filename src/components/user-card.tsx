import { ThumbsUp, Users } from "lucide-react";
import Image from "next/image";

export const UserCard = () => {
  return (
    <article
      className="space-y-3 gap-3 border p-4 backdrop-blur-md border-hairline border-white/10 hover:bg-zinc-900/60
  hover:border-orange-500 rounded-md"
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <Image
            className="rounded-full border-2 border-orange-500"
            src={"/logo-test.jpg"}
            alt="user"
            width={70}
            height={70}
          />
          <div className="self-center text-zinc-50">
            <h3 className="font-bold uppercase text-[0.7rem]">
              Mma fight zone
            </h3>
            <h3 className="lowercase text-[0.6rem]">@mmafightzone</h3>
          </div>
        </div>
        <div className="flex items-center bg-green-800 p-1 rounded-md">
          <span className="text-[0.6rem] text-zinc-50">Alta Qualidade</span>
        </div>
      </div>
      <footer className="mx-auto w-2/3 border border-hairline border-white/10 p-3 rounded-md">
        <div className="flex justify-between text-zinc-50">
          <div className="flex-col flex text-center gap-1">
            <span className="text-zinc-400 text-[0.8rem]">Seguidores</span>

            <div className="flex gap-1 items-center">
              <Users size={18} className="text-orange-500" />
              <span className="text-amber-50 font-bold">963.2K</span>
            </div>
          </div>
          <div className="flex-col flex text-center gap-1">
            <span className="text-zinc-400 text-[0.8rem]">Curtidas</span>

            <div className="flex gap-1  items-center">
              <ThumbsUp size={18} className="text-orange-500" />
              <span className="text-amber-50 font-bold">20.5M</span>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
};
