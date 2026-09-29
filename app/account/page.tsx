'use client';
import Link from 'next/link';
import SportsHeader from '../../components/SportsHeader';
import BottomNav from '../../components/BottomNav';
import { useEffect, useState } from 'react';

export default function AccountPage() {
  const [balance, setBalance] = useState('0');
  useEffect(() => { fetch('/api/profile').then(r => r.ok ? r.json() : null).then(d => setBalance(String(d?.profile?.wallet?.balance ?? '0'))).catch(() => {}); }, []);
  return <main className="min-h-screen bg-[#f4f5f6] pb-24 text-slate-900"><SportsHeader active="account" /><div className="mx-auto max-w-2xl px-4 py-6 sm:px-6"><section className="rounded-3xl bg-slate-950 p-6 text-white"><p className="text-xs font-black uppercase tracking-[.2em] text-slate-500">Portefeuille</p><p className="mt-3 text-4xl font-black">{Number(balance).toLocaleString('fr-FR')} <span className="text-lg text-lime-400">FCFA</span></p><div className="mt-6 grid grid-cols-2 gap-3"><Link href="/account/deposit" className="rounded-2xl bg-lime-400 px-4 py-3 text-center text-sm font-black text-slate-950">+ Dépôt</Link><button className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-black text-white">Retrait</button></div></section><div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">{[['Mes paris','/bets'],['Relevé','/account'],['Récompenses','#'],['Paramètres','#']].map(([label,href]) => <Link key={label} href={href} className="flex items-center justify-between border-b border-slate-100 px-5 py-4 text-sm font-bold last:border-0">{label}<span className="text-slate-400">›</span></Link>)}</div></div><BottomNav active="compte" /></main>;
}
