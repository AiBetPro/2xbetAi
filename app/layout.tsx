import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GOALIX - Sports Betting & AI Predictions',
  description: 'Plateforme de paris sportifs et prédictions IA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen antialiased`}>
        <main className="max-w-md mx-auto min-h-screen bg-slate-900 shadow-2xl relative border-x border-slate-800 pb-20">
          {children}
        </main>
      </body>
    </html>
  );
}
