import { NextResponse } from "next/server";
import { getStoreReviewsWithPhotos } from "@/lib/judgeme/reviews";

export const revalidate = 300; // cache 5 min po stronie Next.js

export async function GET() {
    const reviews = await getStoreReviewsWithPhotos(6);
    return NextResponse.json({ reviews });
}