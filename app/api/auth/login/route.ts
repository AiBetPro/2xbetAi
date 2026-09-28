import { NextResponse } from 'next/server';
import { getPrisma } from '../../../../lib/prisma';
import { createSession, verifyPassword } from '../../../../lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    if (!email || !password) return NextResponse.json({ error: 'E-mail et mot de passe obligatoires.' }, { status: 400 });

    const user = await getPrisma().user.findUnique({ where: { email } });
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: 'E-mail ou mot de passe incorrect.' }, { status: 401 });
    }

    await createSession(user.id);
    return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, currency: user.currency } });
  } catch (error) {
    console.error('POST /api/auth/login:', error);
    return NextResponse.json({ error: 'Impossible de se connecter.' }, { status: 500 });
  }
}
