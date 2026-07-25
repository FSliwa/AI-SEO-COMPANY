export default function Blog() {
  const posts = [
    {
      date: '2026-07-24',
      tag: 'Strategia SEO',
      title: 'Dlaczego responsywność i Core Web Vitals to klucz do wyższych pozycji w Google?',
      desc: 'Dowiedz się, jak szybkość ładowania strony i doświadczenie użytkownika przekładają się bezpośrednio na pozycję w wyszukiwarce.',
      side: 'left'
    },
    {
      date: '2026-07-23',
      tag: 'Branding',
      title: 'Spójny system wizualny jako główny czynnik budowania zaufania B2B',
      desc: 'Jak profesjonalne logo i spójny design system podnoszą postrzeganą wartość Twoich usług i konwersję ze strony.',
      side: 'right'
    },
    {
      date: '2026-07-22',
      tag: 'Conversion Rate',
      title: 'Jak zaplanować cennik na stronie internetowej, aby zwiększyć klikalność CTA?',
      desc: 'Analiza psychologii prezentacji cen i wyboru odpowiedniego kontrastu przycisków akcji w ofertach agencji.',
      side: 'left'
    }
  ];

  return (
    <section className="blog" id="blog">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="asterisk">✳</span> Blog & Artykuły
          </div>
          <h2>Wiedza i inspiracje — Trends & Insights</h2>
          <p>Przeczytaj najnowsze wpisy eksperckie i wyprzedź konkurencję w wynikach wyszukiwania.</p>
        </div>

        {/* VIS Vertical Timeline Blog Layout (Screenshot 2 & 3) */}
        <div className="blog-timeline-container">
          <div className="blog-timeline-line"></div>

          {posts.map((post, idx) => (
            <div key={idx} className={`blog-timeline-item ${post.side}`}>
              <div className="blog-timeline-node">
                <span className="blog-timeline-date">{post.date}</span>
              </div>
              <div className="blog-timeline-card">
                <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  {post.tag}
                </div>
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
                <a href="#kontakt" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                  Czytaj wpis →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
