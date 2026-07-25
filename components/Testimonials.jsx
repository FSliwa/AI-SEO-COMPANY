export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header center">
          <div className="section-tag">
            <span className="asterisk">✳</span> Testimonials
          </div>
          <h2>Experiences & Rekomendacje</h2>
        </div>

        {/* VIS Screenshot 5 Testimonial Experience Card */}
        <div className="testimonial-card">
          <div style={{ color: '#F59E0B', fontSize: '1.25rem', marginBottom: '1rem' }}>
            ★★★★★
          </div>
          <p className="testimonial-quote">
            „AI SEO COMPANY przeprowadziło pełny rebrand naszej platformy B2B oraz wdrożenie serwisu. Efekt przeszedł nasze najśmielsze oczekiwania — ruch organiczny wzrósł o 104% w zaledwie 3 miesiące, a klienci zachwycają się nowoczesną estetyką.”
          </p>
          <div className="testimonial-author">
            <div className="author-avatar">MK</div>
            <div className="author-info">
              <h4>Michał Kowalski</h4>
              <p>CEO, FinTech Apex Platform</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
