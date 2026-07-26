export default function TrustBar() {
  const logos = [
    { name: 'STANIAX', src: '/logos/staniax.png', url: 'https://www.staniax.pl/' },
    { name: 'ASE-BOT', src: '/logos/ase-bot.png', url: 'https://ase-bot.live/' },
    { name: 'MADAME THAI', src: '/logos/madame-thai.png', url: 'https://mada-me-thai-brown.vercel.app/' },
    { name: 'KOZERA', src: '/logos/kozera.png', url: 'https://ireneusz-kozera-website.vercel.app/' }
  ];

  return (
    <section className="trust-bar">
      <div className="container">
        <div className="trust-title">
          <span style={{ fontSize: '1.2rem' }}>✳</span> Our Clients & Partners
        </div>
        
        {/* Static Grid of 4 Client Logos */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '1.5rem',
          width: '100%',
          padding: '1rem 0'
        }}>
          {logos.map((logo, idx) => (
            <a 
              key={idx} 
              href={logo.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="trust-pill-tile" 
              title={logo.name}
              style={{
                background: '#FFFFFF', // White background so dark logos are visible
                color: '#0F172A',
                padding: '1.5rem 1rem',
                minWidth: 'auto',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                border: '1px solid #E2E8F0'
              }}
            >
              <img 
                src={logo.src} 
                alt={`${logo.name} Logo`} 
                style={{ 
                  maxHeight: '40px', 
                  maxWidth: '80%', 
                  objectFit: 'contain' 
                }} 
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
