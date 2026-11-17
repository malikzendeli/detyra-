// Landing page. The only screen in v1 of the frame (weekend 2).
// Copy and colours follow docs/brand-book.md; the pitch comes from docs/business.md.

function StallMark({ size = 56 }) {
  // The awning + counter mark from docs/brand/logo-light.svg
  return (
    <svg
      className="stall-mark"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <rect x="6" y="6" width="52" height="6" rx="3" fill="var(--ink)" />
      <path d="M8 10H20V26A6 6 0 0 1 8 26Z" fill="var(--terracotta)" />
      <path d="M20 10H32V26A6 6 0 0 1 20 26Z" fill="var(--amber)" />
      <path d="M32 10H44V26A6 6 0 0 1 32 26Z" fill="var(--terracotta)" />
      <path d="M44 10H56V26A6 6 0 0 1 44 26Z" fill="var(--amber)" />
      <rect x="12" y="36" width="40" height="18" rx="3" fill="var(--ink)" />
    </svg>
  )
}

function Logo() {
  return (
    <span className="logo" aria-label="Tezga">
      <StallMark />
      <span className="wordmark">tezga</span>
    </span>
  )
}

export default function App() {
  return (
    <div className="page">
      <header className="top">
        <Logo />
      </header>

      <main className="hero">
        <h1 className="tagline">Dyqani yt online, sot.</h1>

        <p className="pitch">
          Tezga i jep dyqanit tënd të vogël faqen e vet online, në shqip,
          maqedonisht dhe anglisht, brenda një dite. Klientët porosisin me
          pagesë në dorëzim, dhe çdo porosi të vjen direkt në telefon në vend
          që të humbet në DM.
        </p>

        <div className="cta-row">
          <span className="cta" aria-disabled="true">
            Hap dyqanin
          </span>
          <span className="soon">Së shpejti · 14 ditë falas</span>
        </div>

        <ul className="other-langs" aria-label="Slogani në gjuhët e tjera">
          <li lang="mk">Твојата продавница онлајн, денес.</li>
          <li lang="en">Your shop online, today.</li>
        </ul>
      </main>

      <footer className="bottom">
        Prishtinë · Shkup · Tetovë · Pagesë në dorëzim
      </footer>
    </div>
  )
}
