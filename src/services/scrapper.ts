import { KwaiLiveData } from "@/domain/user";
import * as cheerio from "cheerio";

interface InteractionStatistic {
  "@type": "InteractionCounter";
  interactionType: {
    "@type": string;
    [key: string]: string;
  };
  userInteractionCount: number;
}

export async function getKwaiProfileData(
  kwaiId: string,
): Promise<KwaiLiveData | null> {
  try {
    const url = `https://www.kwai.com/@${kwaiId}`;
    const MOBILE_USER_AGENT =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

    const response = await fetch(url, {
      signal: AbortSignal.timeout(5000),
      headers: {
        "User-Agent": MOBILE_USER_AGENT,
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cache-Control": "no-cache",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) throw new Error("Perfil não encontrado");

    const html = await response.text();

    const $ = cheerio.load(html);

    const jsonScript = $('script[type="application/ld+json"]#Person').html();

    if (!jsonScript) return null;

    const data = JSON.parse(jsonScript);
    const mainEntity = data.mainEntity;

    const stats: InteractionStatistic[] = mainEntity.interactionStatistic || [];

    const likes =
      stats.find((s) => s.interactionType["@type"].includes("LikeAction"))
        ?.userInteractionCount || 0;
    const followers =
      stats.find((s) => s.interactionType["@type"].includes("FollowAction"))
        ?.userInteractionCount || 0;

    return {
      name: mainEntity.name,
      kwaiId: mainEntity.alternateName,
      followers: followers,
      likes: likes,
      avatar: mainEntity.image,
      bio: mainEntity.description,
    };
  } catch (error) {
    console.error(`Erro ao escrapear ${kwaiId}:`, error);
    return null;
  }
}
