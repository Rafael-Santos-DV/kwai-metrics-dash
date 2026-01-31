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

  const cachedPage = (await redis.get(cacheKey)) as KwaiUser[];

  if (cachedPage) {
    console.log(`📦 Cache Hit para página: ${pageName}`);

    cachedPage.forEach((user) => {
      if (user.type.includes("TIPO")) {
        user.type = user.type
          .replace(/TIPO\s*/g, "TIPO ")
          .trim()
          .toUpperCase();
      }
    });

    return cachedPage;
  }

  console.log(`🔍 Cache Miss. Iniciando scraping para: ${pageName}`);

  const fullUsers: Promise<KwaiUser>[] = KwaiUser.map(async (user) => {
    // await new Promise((resolve) => setTimeout(resolve, index * 800));

    const userInfo = await getKwaiProfileData(user.kwaiId);

    if (user.type.includes("TIPO")) {
      user.type = user.type
        .replace(/TIPO\s*/g, "TIPO ")
        .trim()
        .toUpperCase();
    }

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
