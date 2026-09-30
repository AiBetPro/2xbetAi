import Link from 'next/link';
import SportsHeader from '../../components/SportsHeader';
import BottomNav from '../../components/BottomNav';

const games = [
  ['🎰', 'Slots', 'Jeux de machines à sous'],
  ['🃏', 'Casino classique', 'Tables et jeux de cartes'],
  ['🎲', 'Jeux rapides', 'Sessions courtes et simples'],
];

export default function CasinoPage() {
  return <main className="min-h-screen bg-[#f4f5f6] pb-24 text-slate-900"><SportsHeader active="casino" /><div className="mx-auto max-w-6xl px-4 py-6 sm:px-6"><div className="rounded-3xl bg-slate-950 p-6 text-white sm:p-8"><span className="text-xs font-black uppercase tracking-[.2em] text-lime-400">Casino</span><h1 className="mt-3 text-3xl font-black">Un espace Casino séparé des Sports</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">L'architecture est maintenant prête à accueillir les jeux sans mélanger les marchés sportifs, le coupon et le portefeuille.</p></div><div className="mt-6 grid gap-3 sm:grid-cols-3">{games.map(([icon,title,desc]) => <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="text-3xl">{icon}</div><h2 className="mt-4 text-lg font-black">{title}</h2><p className="mt-1 text-sm text-slate-500">{desc}</p><span className="mt-5 inline-block rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-400">Bientôt disponible</span></div>)}</div><Link href="/dashboard" className="mt-6 inline-flex rounded-2xl bg-lime-400 px-5 py-3 text-sm font-black text-slate-950">← Retour aux Sports</Link></div><BottomNav active="casino" /></main>;
}
