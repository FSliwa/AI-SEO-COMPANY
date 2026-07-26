export default function TrustBar() {
  const partners = [
    { 
      name: 'STANIAX', 
      font: "'Space Grotesk', system-ui, sans-serif", 
      weight: 700, 
      tracking: '-0.02em',
      size: '1.25rem'
    },
    { 
      name: 'ASE-BOT', 
      font: "'Inter', sans-serif", 
      weight: 800, 
      tracking: '0.1em',
      size: '1.15rem'
    },
    { 
      name: 'MADAME THAI', 
      font: "'Inter', sans-serif", 
      weight: 400, 
      tracking: '0.15em',
      size: '1.1rem'
    },
    { 
      name: 'IRENEUSZ KOZERA', 
      font: "'Space Grotesk', system-ui, sans-serif", 
      weight: 500, 
      tracking: '0.05em',
      size: '1.05rem' // slightly smaller to fit well
    }
  ];

  // Duplicate array multiple times for a long seamless loop
  const marqueeLogos = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="trust-bar" style={{ overflow: 'hidden', padding: '3rem 0' }}>
      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .trust-marquee-wrapper {
          width: 100%;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .trust-marquee-track {
          display: flex;
          align-items: center;
          gap: 4rem;
          width: max-content;
          animation: scrollMarquee 25s linear infinite;
          padding: 1rem 0;
        }
        .trust-marquee-track:hover {
          animation-play-state: paused;
        }
        .trust-marquee-track .trust-pill-tile {
          min-width: max-content;
        }
      `}</style>
      <div className="container">
        <div className="trust-title">
          <span style={{ fontSize: '1.2rem' }}>✳</span> Our Clients & Partners
        </div>
        <div className="trust-marquee-wrapper">
          <div className="trust-marquee-track">
            {marqueeLogos.map((partner, idx) => (
              <div key={idx} className="trust-pill-tile">
                <span style={{ 
                  fontFamily: partner.font, 
                  fontWeight: partner.weight, 
                  letterSpacing: partner.tracking,
                  fontSize: partner.size,
                  whiteSpace: 'nowrap'
                }}>
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
