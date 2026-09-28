# Phase 2 — Authentification serveur

## Ce qui est ajouté
- Inscription serveur avec mot de passe haché par `scrypt`.
- Connexion serveur et session persistante via cookie `goalix_session` HttpOnly.
- Déconnexion et endpoint `/api/auth/me`.
- `/api/profile` protégé par la session.
- Portefeuille XOF créé automatiquement à l'inscription.
- Dashboard alimenté par le solde retourné par le serveur.

## Migration locale

1. Configurer `DATABASE_URL`.
2. Installer les dépendances : `npm install`.
3. Générer Prisma : `npm run prisma:generate`.
4. Créer la migration en développement : `npm run prisma:migrate`.
5. Optionnel : `npm run prisma:seed` pour créer `demo@goalix.local` avec le mot de passe `DemoPassword123!`.

Ne pas utiliser le compte de démonstration en production.
