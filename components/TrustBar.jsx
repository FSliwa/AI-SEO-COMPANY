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

  return (
    <section className="trust-bar">
      <div className="container">
        <div className="trust-title">
          <span style={{ fontSize: '1.2rem' }}>✳</span> Our Clients & Partners
        </div>
        <div style={{ width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            width: '100%'
          }}>
            {partners.map((partner, idx) => (
              <div key={idx} className="trust-pill-tile" style={{ width: '100%', minWidth: '0' }}>
                <span style={{ 
                  fontFamily: partner.font, 
                  fontWeight: partner.weight, 
                  letterSpacing: partner.tracking,
                  fontSize: partner.size,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
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
