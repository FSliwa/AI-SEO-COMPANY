'use client';

import { useTranslations, useLocale } from 'next-intl';
import { blogPosts } from '@/lib/blogPosts';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';

export default function BlogLibrary() {
  const lang = useLocale();

  // Sort all posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  const getPostData = (p) => ({
    date: lang === 'pl' ? p.displayDatePl : p.displayDateEn,
    tag: lang === 'pl' ? p.tagPl : p.tagEn,
    title: lang === 'pl' ? p.titlePl : p.titleEn,
    slug: p.slug,
    image: p.image,
  });

  return (
    <section className="blog-grid" style={{ padding: '8rem 0 4rem 0', backgroundColor: 'var(--color-bg-surface)' }}>
      <div className="container" style={{ margin: '0 auto' }}>
        <Reveal>
          <div style={{ marginBottom: '4rem', textAlign: 'left' }}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', 
              fontWeight: 700, 
              color: '#1D1D1F', 
              letterSpacing: '-0.04em',
              marginBottom: '1rem'
            }}>
              {lang === 'pl' ? 'Biblioteka Artykułów SEO i IT' : 'SEO Content Library & Strategies'}
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0', fontWeight: 500 }}>
              {lang === 'pl' 
                ? 'Biblioteka Artykułów SEO i Web Design od ekspertów AI SEO COMPANY. Wszystkie publikacje naszego zespołu w jednym miejscu.' 
                : 'SEO and Web Design Content Library from AI SEO COMPANY experts. All publications and marketing strategies from our team in one place.'}
            </p>
          </div>
        </Reveal>

        <RevealStagger style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {sortedPosts.map((post, idx) => {
            const data = getPostData(post);
            return (
              <RevealItem key={idx}>
                <Link href={data.slug} style={{ textDecoration: 'none' }}>
                  <div className="grid-card" style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100%', 
                    backgroundColor: '#FFFFFF', 
                    borderRadius: '24px', 
                    overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}>
                    <div style={{ 
                      height: '240px', 
                      backgroundImage: `url(${data.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }} />
                    
                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        fontWeight: 600, 
                        color: '#86868B', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em',
                        marginBottom: '1rem'
                      }}>
                        {data.tag}
                      </span>
                      <h3 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: 700, 
                        color: '#1D1D1F', 
                        lineHeight: 1.3,
                        marginBottom: '1.5rem',
                        letterSpacing: '-0.01em',
                        flexGrow: 1
                      }}>
                        {data.title}
                      </h3>
                      <span style={{ 
                        fontSize: '0.85rem', 
                        color: '#86868B',
                        fontWeight: 500
                      }}>
                        {data.date}
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealStagger>
        
        <RevealItem style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <Link href="/blog" className="btn btn-primary" style={{ 
            padding: '1.2rem 2.5rem', 
            fontSize: '1.1rem', 
          }}>
            {lang === 'pl' ? 'Wróć na stronę główną bloga' : 'Back to main blog page'}
          </Link>
        </RevealItem>
      </div>
    
      <section className="container" style={{ padding: '2rem 0', marginBottom: '4rem' }}>
        <details style={{ background: '#F9F9FB', borderRadius: '16px', padding: '1.5rem', cursor: 'pointer' }}>
          <summary style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1D1D1F', listStyle: 'none', margin: 0 }}>
            {lang === 'pl' ? 'Przeczytaj więcej o naszej misji i materiałach edukacyjnych' : 'Read more about our mission and educational resources'}
          </summary>
          <div style={{ marginTop: '2rem', cursor: 'text' }}>
            <p style={{ color: '#333336', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '1000px', margin: '0 auto 1.5rem auto' }}>
            {lang === 'pl' ? 'Nasza biblioteka artykułów to kompleksowe i niezwykle obszerne źródło wiedzy z zakresu optymalizacji pod kątem wyszukiwarek, nowoczesnego projektowania stron internetowych, a także zaawansowanej analityki cyfrowej. Znajdziesz tu dziesiątki merytorycznych poradników, case studies bazujących na rzeczywistych danych naszych klientów z różnych branż, wyczerpujące raporty oraz inspirujące eseje na temat przyszłości technologii i marketingu internetowego. Nasi eksperci z AI SEO COMPANY regularnie publikują najświeższe informacje na temat zmian w algorytmach Google, najnowszych trendach w budowaniu interfejsów użytkownika, strategiach link buildingu, optymalizacji wydajności Core Web Vitals, a także efektywnym wykorzystywaniu sztucznej inteligencji do generowania wartościowego ruchu organicznego. Przeglądając nasze obszerne zbiory, zdobędziesz praktyczne umiejętności, które pozwolą Ci znacząco wyprzedzić konkurencję i zdominować pierwszą stronę wyników wyszukiwania, osiągając rewelacyjne wskaźniki zwrotu z inwestycji (ROI). Jesteśmy dumni, że możemy dzielić się naszym bogatym, wieloletnim doświadczeniem w przystępnej i skondensowanej formie. Od poradników dla absolutnych początkujących, którzy stawiają swoje pierwsze kroki w świecie digital marketingu, aż po specjalistyczne, techniczne artykuły dla doświadczonych deweloperów i dyrektorów marketingu, którzy poszukują niuansów i najdrobniejszych przewag konkurencyjnych. Nasza baza wiedzy jest nieustannie aktualizowana, by dostarczać tylko zweryfikowane, działające i zgodne z wytycznymi wyszukiwarek metody, które napędzają zyski w sektorach B2B i B2C. Zachęcamy do regularnego odwiedzania naszej biblioteki, czytania najnowszych publikacji i wcielania zdobytej wiedzy we własnych, skalowalnych projektach e-commerce oraz portalach korporacyjnych. Sukces Twojego biznesu w sieci zaczyna się od solidnych podstaw teoretycznych i strategicznych przemyśleń, które z chęcią Ci dostarczamy za darmo każdego miesiąca, aby wspólnie rozwijać branżę IT i SEO.' : 'Our article library is a comprehensive and extremely extensive source of knowledge in the fields of search engine optimization, modern web design, and advanced digital analytics. Here you will find dozens of substantive guides, case studies based on real data from our clients across various industries, exhaustive reports, and inspiring essays on the future of technology and digital marketing. Our experts at AI SEO COMPANY regularly publish the latest information regarding Google algorithm updates, the newest trends in user interface building, link building strategies, Core Web Vitals performance optimization, and the effective use of artificial intelligence to generate valuable organic traffic. By browsing our extensive collections, you will acquire practical skills that will allow you to significantly outpace the competition and dominate the first page of search engine results, achieving phenomenal return on investment (ROI) metrics. We are proud to share our rich, multi-year experience in an accessible and condensed format. From tutorials for absolute beginners taking their first steps in the digital marketing world, to specialized, technical articles for experienced developers and marketing directors looking for nuances and the smallest competitive advantages. Our knowledge base is continuously updated to provide only verified, working methods that comply with search engine guidelines and drive profits in B2B and B2C sectors. We encourage you to regularly visit our library, read the latest publications, and implement the acquired knowledge in your own scalable e-commerce projects and corporate portals. The success of your business online begins with a solid theoretical foundation and strategic insights, which we gladly provide for free every single month to jointly develop and advance the IT and SEO industry forward together.'}
          </p>
          <p style={{ color: '#333336', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '1000px', margin: '0 auto 1.5rem auto' }}>
            {lang === 'pl' ? 'Naszym nadrzędnym celem jest edukacja i podnoszenie standardów w całej branży technologicznej. Wierzymy, że dzielenie się wiedzą jest fundamentem innowacji i postępu, dlatego nie ukrywamy naszych najlepszych strategii za płatnymi zaporami czy ekskluzywnymi kursami. Wszystko, co musisz wiedzieć, udostępniamy w pełni za darmo.' : 'Our primary goal is to educate and raise standards across the entire technological industry. We believe that sharing knowledge is the foundation of innovation and progress, which is why we do not hide our best strategies behind paywalls or exclusive courses. Everything you need to know is provided completely for free.'}
          </p>
          <p style={{ color: '#333336', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '1000px', margin: '0 auto 1.5rem auto' }}>
            {lang === 'pl' ? 'Niezależnie od tego, czy prowadzisz małą lokalną firmę usługową, czy zarządzasz międzynarodowym sklepem internetowym generującym wielomilionowe obroty, znajdziesz tu porady skrojone na miarę Twoich potrzeb. Zapraszamy do eksplorowania naszych zasobów i wyciągania wniosków, które diametralnie zmienią Twoje podejście do pozycjonowania i marketingu.' : 'Whether you run a small local service business or manage an international e-commerce store generating multi-million revenues, you will find advice tailored to your needs here. We invite you to explore our resources and draw conclusions that will radically change your approach to SEO and marketing.'}
          </p>
          </div>
        </details>
      </section>
    </section>
  );
}
