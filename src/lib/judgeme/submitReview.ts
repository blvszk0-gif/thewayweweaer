import "server-only";

interface SubmitReviewInput {
  name: string;
  email: string;
  rating: number;
  title?: string;
  body: string;
  pictureUrls?: string[];
}

/**
 * Submits a customer review to Judge.me's moderation queue so it can be
 * approved from the same dashboard the shop already uses for its reviews.
 * Returns false (never throws) on any failure so the caller can fall back
 * to emailing the review instead of losing it.
 */
export async function submitReviewToJudgeMe(input: SubmitReviewInput): Promise<boolean> {
  const apiToken = process.env.JUDGEME_API_TOKEN;
  const shopDomain = process.env.SHOPIFY_STORE_DOMAIN;
  if (!apiToken || !shopDomain) return false;

  try {
    const res = await fetch("https://judge.me/api/v1/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_token: apiToken,
        shop_domain: shopDomain,
        platform: "shopify",
        name: input.name,
        email: input.email,
        rating: input.rating,
        title: input.title,
        body: input.body,
        picture_urls: input.pictureUrls,
      }),
    });

    return res.ok;
  } catch (error) {
    console.error("submitReviewToJudgeMe failed", error);
    return false;
  }
}
