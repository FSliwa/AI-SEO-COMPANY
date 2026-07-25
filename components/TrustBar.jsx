export default function TrustBar() {
  const logos = [
    { name: 'FINTECH', icon: '⚡' },
    { name: 'NEXUS', icon: '❖' },
    { name: 'AURORA', icon: '◇' },
    { name: 'VORTEX', icon: '◈' },
    { name: 'SOLARIS', icon: '☼' },
    { name: 'LIEPA', icon: 'M' }
  ];

  // Duplicate logos array to allow continuous 360 seamless marquee loop
  const marqueeLogos = [...logos, ...logos, ...logos];

  return (
    <section className="trust-bar">
      <div className="container">
        <div className="trust-title">
          <span style={{ fontSize: '1.2rem' }}>✳</span> Our Clients & Partners
        </div>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          <div className="trust-marquee-track">
            {marqueeLogos.map((logo, idx) => (
              <div key={idx} className="trust-pill-tile" title={logo.name}>
                <span style={{ fontSize: '1.1rem', opacity: 0.8 }}>{logo.icon}</span>
                <span>{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
