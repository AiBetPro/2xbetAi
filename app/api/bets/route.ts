import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { getCurrentUser } from '../../../lib/auth';
import { getPrisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

function money(value: unknown) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  const prisma = getPrisma();
  const slips = await prisma.betSlip.findMany({
    where: { userId: user.id },
    include: { selections: true },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  return NextResponse.json({ success: true, bets: slips });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Connectez-vous pour placer un pari.' }, { status: 401 });

  let body: any;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: 'JSON invalide.' }, { status: 400 });
  }

  const stake = money(body.stake);
  const selections = Array.isArray(body.selections) ? body.selections : [];
  if (!stake) return NextResponse.json({ error: 'Mise invalide.' }, { status: 400 });
  if (selections.length < 1 || selections.length > 20) return NextResponse.json({ error: 'Le coupon doit contenir entre 1 et 20 sélections.' }, { status: 400 });

  const normalized = selections.map((s: any) => ({
    matchId: Number(s.matchId),
    market: String(s.market || '').trim(),
    choice: String(s.choice || '').trim(),
    odds: Number(s.odds),
  }));
  if (normalized.some((s: any) => !Number.isInteger(s.matchId) || !s.market || !s.choice || !Number.isFinite(s.odds) || s.odds <= 1 || s.odds > 1000)) {
    return NextResponse.json({ error: 'Une ou plusieurs sélections sont invalides.' }, { status: 400 });
  }

  const uniqueMatches = [...new Set(normalized.map((s: any) => s.matchId))];
  const prisma = getPrisma();

  try {
    const result = await prisma.$transaction(async (tx) => {
      const matches = await tx.match.findMany({ where: { id: { in: uniqueMatches } }, select: { id: true, status: true } });
      if (matches.length !== uniqueMatches.length) throw new Error('MATCH_NOT_FOUND');
      if (matches.some((m) => ['finished', 'cancelled', 'postponed'].includes(m.status.toLowerCase()))) throw new Error('MATCH_UNAVAILABLE');

      const totalOdds = normalized.reduce((acc: number, s: any) => acc * s.odds, 1);
      const potentialWin = stake * totalOdds;
      const wallet = await tx.wallet.findUnique({ where: { userId: user.id } });
      if (!wallet || Number(wallet.balance) < stake) throw new Error('INSUFFICIENT_FUNDS');

      const updatedWallet = await tx.wallet.update({
        where: { userId: user.id },
        data: { balance: { decrement: new Prisma.Decimal(stake) } },
      });

      const slip = await tx.betSlip.create({
        data: {
          userId: user.id,
          stake: new Prisma.Decimal(stake),
          totalOdds: new Prisma.Decimal(totalOdds),
          potentialWin: new Prisma.Decimal(potentialWin),
          selections: { create: normalized.map((s: any) => ({ matchId: s.matchId, market: s.market, choice: s.choice, odds: new Prisma.Decimal(s.odds) })) },
        },
        include: { selections: true },
      });

      await tx.walletTransaction.create({
        data: { userId: user.id, type: 'BET_STAKE', amount: new Prisma.Decimal(-stake), balanceAfter: updatedWallet.balance, reference: `BET-${slip.id}`, description: `Mise du pari #${slip.id}` },
      });

      return { slip, balance: updatedWallet.balance };
    });

    return NextResponse.json({ success: true, bet: result.slip, wallet: { balance: result.balance } }, { status: 201 });
  } catch (error) {
    const code = error instanceof Error ? error.message : 'UNKNOWN';
    const map: Record<string, [string, number]> = { MATCH_NOT_FOUND: ['Un match du coupon est introuvable.', 400], MATCH_UNAVAILABLE: ['Un match du coupon n’est plus disponible.', 409], INSUFFICIENT_FUNDS: ['Solde insuffisant.', 400] };
    const [message, status] = map[code] || ['Impossible de placer le pari.', 500];
    return NextResponse.json({ error: message }, { status });
  }
}
