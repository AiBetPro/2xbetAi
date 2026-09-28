import { NextResponse } from 'next/server';
import { getPrisma } from '../../../../lib/prisma';
import { createSession, hashPassword } from '../../../../lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!name || !email || !password) return NextResponse.json({ error: 'Tous les champs sont obligatoires.' }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ error: 'Le mot de passe doit contenir au moins 8 caractères.' }, { status: 400 });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Adresse e-mail invalide.' }, { status: 400 });

    const prisma = getPrisma();
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return NextResponse.json({ error: 'Un compte existe déjà avec cet e-mail.' }, { status: 409 });

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashPassword(password),
        wallet: { create: { balance: 0, currency: 'XOF' } },
      },
      select: { id: true, name: true, email: true, currency: true },
    });

    await createSession(user.id);
    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    console.error('POST /api/auth/register:', error);
    return NextResponse.json({ error: 'Impossible de créer le compte.' }, { status: 500 });
  }
}
