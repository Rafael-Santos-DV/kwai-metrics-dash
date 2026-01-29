"use server";

import { KwaiUser } from "@/domain/user";
import { getKwaiProfileData } from "@/services/scrapper";

export async function getFullUsers(KwaiUser: KwaiUser[]): Promise<KwaiUser[]> {
  const fullUsers: Promise<KwaiUser>[] = KwaiUser.map(async (user) => {
    // await new Promise((resolve) => setTimeout(resolve, index * 800));

    const userInfo = await getKwaiProfileData(user.kwaiId);

    const customUser: KwaiUser = {
      ...user,
      ...userInfo,
    };

    return customUser;
  });

  return Promise.all(fullUsers);
}
