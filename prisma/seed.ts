import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth';

const prisma = new PrismaClient();

async function main() {
  const email = 'demo@goalix.local';
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: 'Utilisateur Demo',
      passwordHash: hashPassword('DemoPassword123!'),
      wallet: { create: { balance: 10000, currency: 'XOF' } },
    },
    include: { wallet: true },
  });

  if (!user.wallet) {
    await prisma.wallet.create({ data: { userId: user.id, balance: 10000, currency: 'XOF' } });
  }

  console.log(`Demo user: ${user.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
