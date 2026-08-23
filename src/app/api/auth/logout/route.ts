import { NextRequest, NextResponse } from 'next/server';
import { CUSTOMER_TOKEN_COOKIE } from '@/lib/shopify/customer-auth';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(CUSTOMER_TOKEN_COOKIE);
  return response;
}
