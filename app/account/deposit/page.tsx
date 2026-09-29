'use client';

import Link from 'next/link';
import SportsHeader from '../../../components/SportsHeader';
import BottomNav from '../../../components/BottomNav';
import { useState } from 'react';

export default function DepositPage() {
  const [amount, setAmount] = useState('');
  return <main className="min-h-screen bg-[#f4f5f6] pb-24 text-slate-900">
    <SportsHeader active="account" />
    <div className="mx-auto max-w-lg px-4 py-6 sm:px-6">
      <Link href="/account" className="text-sm font-bold text-slate-500">‹ Retour au compte</Link>
      <section className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-slate-950 px-5 py-6 text-white"><p className="text-xs font-black uppercase tracking-[.2em] text-lime-400">Portefeuille</p><h1 className="mt-2 text-2xl font-black">Déposer des fonds</h1><p className="mt-1 text-sm text-slate-400">Le dépôt reste volontairement séparé du coupon de pari.</p></div>
        <div className="p-5">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500">Montant</label>
          <div className="mt-2 flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"><input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" min="100" placeholder="1000" className="w-full bg-transparent text-2xl font-black outline-none" /><span className="font-black text-slate-500">FCFA</span></div>
          <div className="mt-4 grid grid-cols-3 gap-2">{[500, 1000, 5000].map((v) => <button key={v} onClick={() => setAmount(String(v))} className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-black hover:bg-lime-100">{v.toLocaleString('fr-FR')}</button>)}</div>
          <button disabled={!amount} className="mt-5 w-full rounded-2xl bg-lime-400 px-5 py-4 text-sm font-black text-slate-950 disabled:opacity-40">Continuer vers le paiement</button>
          <p className="mt-3 text-center text-xs leading-5 text-slate-400">L'intégration des moyens de paiement réels sera ajoutée séparément après validation de l'interface.</p>
        </div>
      </section>
    </div>
    <BottomNav active="compte" />
  </main>;
}
