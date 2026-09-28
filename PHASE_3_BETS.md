# Phase 3 — Wallet et placement de paris

Cette phase remplace la validation fictive par une opération serveur.

## Migration

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

## API

- `GET /api/wallet` : solde de l'utilisateur connecté.
- `GET /api/bets` : 50 derniers coupons placés par l'utilisateur.
- `POST /api/bets` : vérifie l'utilisateur, les matchs, la mise et le solde puis crée le BetSlip et ses sélections dans une transaction PostgreSQL.

Le débit du wallet et l'écriture de la transaction financière sont atomiques avec la création du pari.

## Important

Les `matchId` envoyés au serveur doivent correspondre à des matchs présents dans PostgreSQL. Les cotes envoyées par le navigateur ne doivent pas être considérées comme définitives : avant la mise en production, elles devront être relues depuis la source de cotes côté serveur et éventuellement resynchronisées au moment du placement.
