import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { getPrisma } from './prisma';

const SESSION_COOKIE = 'goalix_session';
const SESSION_DAYS = 30;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, expected] = stored.split(':');
  if (!salt || !expected) return false;
  const actual = scryptSync(password, salt, 64).toString('hex');
  return timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex'));
}

function sessionId(): string {
  return createHash('sha256').update(randomBytes(32)).digest('hex');
}

export async function createSession(userId: number): Promise<void> {
  const prisma = getPrisma();
  const id = sessionId();
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  await prisma.session.create({ data: { id, userId, expiresAt } });
  cookies().set(SESSION_COOKIE, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

export async function getCurrentUser() {
  const sessionIdValue = cookies().get(SESSION_COOKIE)?.value;
  if (!sessionIdValue) return null;

  const prisma = getPrisma();
  const session = await prisma.session.findUnique({
    where: { id: sessionIdValue },
    include: { user: { include: { wallet: true } } },
  });

  if (!session) return null;
  if (session.expiresAt <= new Date()) {
    await prisma.session.delete({ where: { id: session.id } }).catch(() => undefined);
    cookies().delete(SESSION_COOKIE);
    return null;
  }

  return session.user;
}

export async function destroyCurrentSession(): Promise<void> {
  const id = cookies().get(SESSION_COOKIE)?.value;
  if (id) {
    await getPrisma().session.delete({ where: { id } }).catch(() => undefined);
  }
  cookies().delete(SESSION_COOKIE);
}
