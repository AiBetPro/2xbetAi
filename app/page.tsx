import Link from 'next/link';

const matches = [
  { id:'arsenal-chelsea', league:'Premier League', time:'18:00', home:'Arsenal', away:'Chelsea', odds:['1.65','3.70','4.90'] },
  { id:'barcelona-sevilla', league:'La Liga', time:'20:30', home:'Barcelona', away:'Sevilla', odds:['1.42','4.40','6.80'] },
  { id:'inter-milan', league:'Serie A', time:'21:00', home:'Inter', away:'Milan', odds:['1.75','3.50','4.30'] },
];

export default function Home() {
  return (
    <main className="goalix-home">
      <header className="goalix-header">
        <Link href="/" className="logo">GOA<span>LIX</span></Link>
        <nav className="desktop-nav">
          <Link href="/dashboard">Sports</Link>
          <Link href="/live">🔴 Live</Link>
          <Link href="/ai-prono">🤖 IA Prono</Link>
          <Link href="/bets">Mes paris</Link>
        </nav>
        <Link href="/dashboard" className="account-button">👤</Link>
      </header>

      <section className="hero-v1">
        <div className="hero-content">
          <div className="live-badge"><span /> PARIS SPORTIFS & IA</div>
          <h1>Le sport.<br /><strong>Ton analyse.</strong><br />Ton pari.</h1>
          <p>Retrouvez les matchs, les cotes, le live et notre système d&apos;analyse IA dans une seule plateforme.</p>
          <div className="hero-actions">
            <Link href="/dashboard" className="primary-button">Voir les matchs</Link>
            <Link href="/ai-prono" className="secondary-button">🤖 IA Prono</Link>
          </div>
        </div>

        <Link href="/match/arsenal-chelsea" className="hero-card hero-card-link">
          <div className="hero-card-top"><span>🔥 MATCH À LA UNE</span><small>18:00</small></div>
          <div className="teams">
            <div><div className="team-icon">A</div><strong>Arsenal</strong></div>
            <span className="vs">VS</span>
            <div><div className="team-icon">C</div><strong>Chelsea</strong></div>
          </div>
          <div className="featured-odds">
            <div><small>1</small><strong>1.65</strong></div>
            <div><small>X</small><strong>3.70</strong></div>
            <div><small>2</small><strong>4.90</strong></div>
          </div>
          <div className="hero-card-cta">Voir les marchés du match →</div>
        </Link>
      </section>

      <section className="sports-section">
        <div className="section-title"><div><span>EXPLORER</span><h2>Sports populaires</h2></div><Link href="/dashboard">Voir tout →</Link></div>
        <div className="sports-grid">
          <Link href="/dashboard" className="sport-card active"><span>⚽</span><strong>Football</strong><small>245 matchs</small></Link>
          <Link href="/dashboard" className="sport-card"><span>🏀</span><strong>Basketball</strong><small>38 matchs</small></Link>
          <Link href="/dashboard" className="sport-card"><span>🎾</span><strong>Tennis</strong><small>64 matchs</small></Link>
          <Link href="/dashboard" className="sport-card"><span>🏎️</span><strong>Formule 1</strong><small>12 événements</small></Link>
        </div>
      </section>

      <section className="matches-section">
        <div className="section-title"><div><span>AUJOURD&apos;HUI</span><h2>Matchs populaires</h2></div><Link href="/live">🔴 Live →</Link></div>
        <div className="matches-list">
          {matches.map((match) => (
            <Link href={`/match/${match.id}`} className="match-card match-card-link" key={match.id}>
              <div className="match-info"><small>{match.league}</small><span>{match.time}</span></div>
              <div className="match-teams"><strong>{match.home}</strong><span>vs</span><strong>{match.away}</strong></div>
              <div className="match-odds">
                <div><small>1</small>{match.odds[0]}</div>
                <div><small>X</small>{match.odds[1]}</div>
                <div><small>2</small>{match.odds[2]}</div>
              </div>
              <div className="match-card-arrow">Voir les marchés →</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="ai-banner">
        <div><div className="ai-label">🤖 GOALIX AI</div><h2>Laissez l&apos;IA<br />analyser les matchs.</h2><p>Choisissez votre niveau de risque et laissez notre système classer les opportunités disponibles.</p><Link href="/ai-prono" className="primary-button">Découvrir IA Prono →</Link></div>
        <div className="ai-orb"><span>AI</span></div>
      </section>

      <footer className="goalix-footer"><div><Link href="/" className="logo">GOA<span>LIX</span></Link><p>Sports Betting & AI Predictions Platform</p></div><div className="footer-links"><Link href="/dashboard">Sports</Link><Link href="/live">Live</Link><Link href="/ai-prono">IA Prono</Link><Link href="/bets">Mes paris</Link></div></footer>
      <div className="mobile-nav"><Link href="/"><span>⌂</span>Accueil</Link><Link href="/dashboard"><span>⚽</span>Sports</Link><Link href="/live"><span>🔴</span>Live</Link><Link href="/ai-prono"><span>🤖</span>IA</Link><Link href="/bets"><span>🎫</span>Paris</Link></div>
    </main>
  );
   }
          
