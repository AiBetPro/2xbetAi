import { NextResponse } from 'next/server';
import { getCurrentUser } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  return NextResponse.json({ success: true, wallet: user.wallet });
}
