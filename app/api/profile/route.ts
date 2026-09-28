import { NextResponse } from 'next/server';
import { getCurrentUser } from '../../../lib/auth';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });

  return NextResponse.json({
    success: true,
    profile: {
      id: user.id,
      name: user.name,
      email: user.email,
      currency: user.currency,
      wallet: user.wallet ? { balance: user.wallet.balance.toString(), currency: user.wallet.currency } : null,
    },
  });
}
