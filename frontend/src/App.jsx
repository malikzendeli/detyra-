// Landing page. The only screen in v1 of the frame (weekend 2).
// Copy and colours follow docs/brand-book.md; pitch and price come from docs/business.md.

function StallMark({ size = 56 }) {
  // The awning + counter mark from docs/brand/logo-light.svg
  return (
    <svg className="stall-mark" viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <rect x="6" y="6" width="52" height="6" rx="3" fill="var(--mark-ink)" />
      <path d="M8 10H20V26A6 6 0 0 1 8 26Z" fill="var(--terracotta)" />
      <path d="M20 10H32V26A6 6 0 0 1 20 26Z" fill="var(--amber)" />
      <path d="M32 10H44V26A6 6 0 0 1 32 26Z" fill="var(--terracotta)" />
      <path d="M44 10H56V26A6 6 0 0 1 44 26Z" fill="var(--amber)" />
      <rect x="12" y="36" width="40" height="18" rx="3" fill="var(--mark-ink)" />
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

// Decorative preview of a shop on a phone, with an order alert. Not a real screen.
function PhonePreview() {
  return (
    <div className="preview" aria-hidden="true">
      <div className="phone">
        <div className="phone-notch" />
        <div className="shop-head">
          <span className="shop-avatar">E</span>
          <div>
            <div className="shop-name">Butiku Era</div>
            <div className="shop-url">era.tezga.shop</div>
          </div>
          <span className="lang-pill">SQ · MK · EN</span>
        </div>
        <div className="products">
          <div className="product">
            <div className="product-img img-a" />
            <div className="product-name">Bluzë liri</div>
            <div className="product-price">12 €</div>
          </div>
          <div className="product">
            <div className="product-img img-b" />
            <div className="product-name">Fustan vere</div>
            <div className="product-price">29 €</div>
          </div>
          <div className="product">
            <div className="product-img img-c" />
            <div className="product-name">Çantë dore</div>
            <div className="product-price">18 €</div>
          </div>
          <div className="product">
            <div className="product-img img-d" />
            <div className="product-name">Shall</div>
            <div className="product-price">9 €</div>
          </div>
        </div>
        <div className="order-bar">Porosit · paguaj në dorëzim</div>
      </div>

      <div className="toast">
        <StallMark size={28} />
        <div>
          <div className="toast-title">Ke porosi të re · TZ-1042</div>
          <div className="toast-body">2 bluza, 24 €, Tetovë. Thirre klientin sot.</div>
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    icon: 'Aa',
    title: 'Në gjuhën tënde',
    text: 'Shqip, maqedonisht dhe anglisht. Klienti zgjedh vetë gjuhën.',
  },
  {
    icon: '€',
    title: 'Pagesë në dorëzim',
    text: 'Çmimi që sheh klienti është ai që paguan te dera. Dërgesa llogaritet sipas qytetit.',
  },
  {
    icon: '✓',
    title: 'Porosia në telefon',
    text: 'Çdo porosi të vjen menjëherë në Telegram. Asgjë nuk humbet më në DM.',
  },
]

export default function App() {
  return (
    <>
      <div className="awning" aria-hidden="true" />

      <div className="page">
        <header className="top">
          <Logo />
          <span className="badge">Së shpejti</span>
        </header>

        <main>
          <section className="hero">
            <div className="hero-text">
              <p className="eyebrow">Për dyqanet në Instagram dhe WhatsApp</p>
              <h1 className="tagline">
                Dyqani yt online, <span className="accent">sot.</span>
              </h1>

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
                <span className="soon">Së shpejti · 14 ditë falas, pa kartelë</span>
              </div>

              <ul className="other-langs" aria-label="Slogani në gjuhët e tjera">
                <li lang="mk">Твојата продавница онлајн, денес.</li>
                <li lang="en">Your shop online, today.</li>
              </ul>
            </div>

            <PhonePreview />
          </section>

          <section className="features" aria-label="Pse Tezga">
            {features.map((f) => (
              <article className="feature" key={f.title}>
                <span className="feature-icon" aria-hidden="true">
                  {f.icon}
                </span>
                <h2>{f.title}</h2>
                <p>{f.text}</p>
              </article>
            ))}
          </section>

          <section className="price-strip" aria-label="Çmimi">
            <span>
              <strong>15 €</strong> në muaj
            </span>
            <span className="dot" aria-hidden="true" />
            <span>Pa komision për porosi</span>
            <span className="dot" aria-hidden="true" />
            <span>14 ditë falas</span>
          </section>
        </main>

        <footer className="bottom">
          <Logo />
          <span>Prishtinë · Prizren · Shkup · Tetovë · Gostivar</span>
        </footer>
      </div>
    </>
  )
}
