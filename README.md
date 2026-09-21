# GOALIX - PostgreSQL + Prisma v09

A betting platform built with Next.js, PostgreSQL, and Prisma ORM.

## Features
- Live betting updates
- Bet management and tracking
- Sports data integration with SportMonks
- PostgreSQL database with Prisma

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Setup environment variables:
```bash
cp .env.example .env.local
```

3. Setup database:
```bash
npx prisma migrate dev
```

4. Seed database:
```bash
ts-node prisma/seed.ts
```

5. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
