import { KwaiUser } from "@/domain/user";
import { cn } from "@/lib/utils";
import { ThumbsUp, Users } from "lucide-react";
import Image from "next/image";

interface UserCardProps {
  user: KwaiUser;
}

const formatNumber = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

export const UserCard = ({ user }: UserCardProps) => {
  const userType = user.type.toUpperCase();

  return (
    <article
      className="space-y-3 gap-3 border p-4 backdrop-blur-md border-hairline border-white/10 hover:bg-zinc-900/60
  hover:border-orange-500 rounded-md"
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <Image
            className="rounded-full border-2 border-orange-500"
            src={user.avatar || "/kwai-avatar.jpg"}
            alt="user"
            width={70}
            height={70}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/kwai-avatar.jpg";
            }}
          />
          <div className="self-center text-zinc-50">
            <h3 className="font-bold uppercase text-[0.7rem]">{user.kwaiId}</h3>
            <h3 className="lowercase text-[0.6rem]">@{user.kwaiId}</h3>
          </div>
        </div>
        <div
          className={cn(
            `flex items-center px-2 py-1 rounded-md`,
            userType === "TIPO B" && "bg-red-500",
            userType === "TIPO A" && "bg-green-800",
            userType !== "TIPO A" && userType !== "TIPO B" && "bg-zinc-500",
          )}
        >
          <span className={`text-[0.6rem] text-zinc-50`}>
            {userType.length < 10
              ? userType.toUpperCase()
              : userType.substring(0, 9).trim() + "..."}
          </span>
        </div>
      </div>
      <footer className="mx-auto w-2/3 border border-hairline border-white/10 p-3 rounded-md">
        <div className="flex justify-between text-zinc-50">
          <div className="flex-col flex text-center gap-1">
            <span className="text-zinc-400 text-[0.8rem]">Seguidores</span>

            <div className="flex gap-1 items-center">
              <Users size={18} className="text-orange-500" />
              <span className="text-amber-50 font-bold">
                {user.followers ? formatNumber.format(user.followers) : 0.0}
              </span>
            </div>
          </div>
          <div className="flex-col flex text-center gap-1">
            <span className="text-zinc-400 text-[0.8rem]">Curtidas</span>

            <div className="flex gap-1  items-center">
              <ThumbsUp size={18} className="text-orange-500" />
              <span className="text-amber-50 font-bold">
                {user.likes ? formatNumber.format(user.likes) : 0.0}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
};
