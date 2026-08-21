import { NextRequest, NextResponse } from 'next/server';
import { storefrontFetch } from '@/lib/shopify/server';

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type');
  if (!type || !/^[a-z_]+$/.test(type)) return NextResponse.json({ error: 'Invalid metaobject type.' }, { status: 400 });
  try {
    type MetaobjectData = { metaobjects: { nodes: Array<{ id: string; handle: string; type: string; fields: Array<{ key: string; value: string | null; reference: { __typename: string; image?: { url: string; altText: string | null } | null } | null; references: { nodes: Array<{ __typename: string; image?: { url: string; altText: string | null } | null }> } | null }> }> } };
    const data = await storefrontFetch<MetaobjectData>(`query Metaobjects($type: String!) { metaobjects(type: $type, first: 100) { nodes { id handle type fields { key value reference { __typename ... on MediaImage { image { url altText } } } references(first: 30) { nodes { __typename ... on MediaImage { image { url altText } } } } } } } }`, { type });
    return NextResponse.json({ metaobjects: data.metaobjects.nodes });
  } catch { return NextResponse.json({ error: 'Unable to retrieve content.' }, { status: 502 }); }
}
