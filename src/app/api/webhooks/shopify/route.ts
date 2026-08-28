import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET!;

function verifyHmac(rawBody: string, hmacHeader: string | null): boolean {
    if (!hmacHeader) return false;
    const digest = crypto
        .createHmac("sha256", WEBHOOK_SECRET)
        .update(rawBody, "utf8")
        .digest("base64");
    // Porównanie odporne na timing attack
    try {
        return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hmacHeader));
    } catch {
        return false;
    }
}

export async function POST(request: NextRequest) {
    const rawBody = await request.text();
    const hmacHeader = request.headers.get("x-shopify-hmac-sha256");
    const topic = request.headers.get("x-shopify-topic");
    const shopDomain = request.headers.get("x-shopify-shop-domain");

    if (!verifyHmac(rawBody, hmacHeader)) {
        console.error("Nieprawidłowy podpis webhooka Shopify", { topic, shopDomain });
        return NextResponse.json({ error: "Invalid HMAC" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    console.log(`Webhook GDPR: ${topic}`, { shopDomain, payload });

    switch (topic) {
        case "customers/data_request":
            // Nie przechowujemy własnej kopii danych klienta - wszystko żyje w Shopify.
            // TODO: opcjonalnie wyślij sobie e-mail/powiadomienie, żeby ręcznie
            // sprawdzić czy klient zostawił recenzję w Judge.me pod tym mailem.
            break;

        case "customers/redact":
            // Jak wyżej - nic nie przechowujemy poza Shopify.
            break;

        case "shop/redact":
            // Wysyłane 48h po odinstalowaniu aplikacji - też nie mamy własnej bazy.
            break;

        default:
            console.warn(`Nieobsłużony temat webhooka: ${topic}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
}