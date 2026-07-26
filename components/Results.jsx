import { Reveal } from './ScrollReveal';

export default function Results() {
  return (
    <section className="results" id="wyniki">
      <div className="container">
        <Reveal className="results-content">
          <div className="results-text">
            <h2>Chcesz osiągnąć podobne wyniki?</h2>
            <p>Zamów bezpłatną analizę SEO i potencjału Twojej obecnej marki już teraz.</p>
          </div>
          <a href="#kontakt" className="btn btn-primary" style={{ background: '#FFFFFF', color: '#0F172A', fontWeight: '700', boxShadow: 'none' }}>
            Zamów bezpłatny audyt
          </a>
        </Reveal>
      </div>
    </section>
  );
}
