"use server";

import { KwaiUser } from "@/domain/user";
import { redis } from "@/lib/redis";
import { getKwaiProfileData } from "@/services/scrapper";

const FIFTEEN_DAYS_IN_SECONDS = 1296000;

export async function getFullUsers(
  pageName: string,
  KwaiUser: KwaiUser[],
): Promise<KwaiUser[]> {
  const cacheKey = `page:${pageName}`;

  const cachedPage = await redis.get(cacheKey);

  if (cachedPage) {
    console.log(`📦 Cache Hit para página: ${pageName}`);

    return cachedPage as KwaiUser[];
  }

  console.log(`🔍 Cache Miss. Iniciando scraping para: ${pageName}`);

  const fullUsers: Promise<KwaiUser>[] = KwaiUser.map(async (user) => {
    // await new Promise((resolve) => setTimeout(resolve, index * 800));

    const userInfo = await getKwaiProfileData(user.kwaiId);

    const customUser: KwaiUser = {
      ...user,
      ...userInfo,
    };

    return customUser;
  });

  const enrichedUsers = await Promise.all(fullUsers);

  await redis.set(cacheKey, enrichedUsers, { ex: FIFTEEN_DAYS_IN_SECONDS });

  return enrichedUsers;
}
