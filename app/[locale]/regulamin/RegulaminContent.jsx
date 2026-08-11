'use client';

import { useLocale } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';

const h2 = { marginTop: '2.5rem', marginBottom: '1rem', color: '#0F172A', fontSize: '1.4rem' };
const ul = { paddingLeft: '1.25rem', lineHeight: 1.7 };
const a = { color: 'var(--color-primary)', textDecoration: 'underline' };

/**
 * Terms of service required by art. 8 of the Polish Act on Providing Services by
 * Electronic Means: types and scope of services, technical requirements, the ban
 * on supplying unlawful content, how contracts are formed and terminated, and the
 * complaints procedure.
 */
export default function RegulaminContent() {
  const lang = useLocale();

  return (
    <>
      <Header />
      <main style={{ paddingTop: '120px', minHeight: '80vh', background: '#F5F5F7' }}>
        <div className="container" style={{ maxWidth: '800px', padding: '4rem 1.5rem' }}>
          <h1 style={{ fontSize: '3rem', color: '#0F172A', marginBottom: '2rem', letterSpacing: '-0.03em' }}>
            {lang === 'pl' ? 'Regulamin świadczenia usług drogą elektroniczną' : 'Terms of service'}
          </h1>

          <div style={{ color: '#334155', fontSize: '1.1rem', lineHeight: 1.8 }}>
            {lang === 'pl' ? (
              <>
                <p>Regulamin określa zasady korzystania z serwisu internetowego ai-seo-company.pl oraz warunki świadczenia usług drogą elektroniczną, zgodnie z art. 8 ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną.</p>

                <h2 style={h2}>§ 1. Usługodawca</h2>
                <p>Usługodawcą jest <strong>AI SIGNALS COMPANY Prosta Spółka Akcyjna</strong> z siedzibą w Warszawie, ul. Grzybowska 12/14 lok. B-3, 00-132 Warszawa, wpisana do rejestru przedsiębiorców Krajowego Rejestru Sądowego prowadzonego przez Sąd Rejonowy dla m.st. Warszawy w Warszawie pod numerem KRS 0001239983, NIP 5253090237, REGON 544761611.</p>
                <p>Kontakt: <a href="mailto:kontakt@ai-seo-company.pl" style={a}>kontakt@ai-seo-company.pl</a>, tel. <a href="tel:+48518815055" style={a}>518 815 055</a>.</p>

                <h2 style={h2}>§ 2. Definicje</h2>
                <ul style={ul}>
                  <li><strong>Serwis</strong> — strona internetowa dostępna pod adresem ai-seo-company.pl wraz z podstronami.</li>
                  <li><strong>Usługobiorca</strong> — osoba fizyczna, osoba prawna lub jednostka organizacyjna korzystająca z Serwisu.</li>
                  <li><strong>Usługa elektroniczna</strong> — świadczenie wykonywane bez jednoczesnej obecności stron, drogą przesyłania danych na indywidualne żądanie Usługobiorcy.</li>
                </ul>

                <h2 style={h2}>§ 3. Rodzaje i zakres usług świadczonych drogą elektroniczną</h2>
                <p>Za pośrednictwem Serwisu Usługodawca świadczy nieodpłatnie następujące usługi elektroniczne:</p>
                <ul style={ul}>
                  <li><strong>Dostęp do treści Serwisu</strong> — przeglądanie stron informacyjnych, opisów usług i artykułów publikowanych na blogu.</li>
                  <li><strong>Formularz kontaktowy</strong> — umożliwiający przesłanie zapytania ofertowego. Usługa ma charakter jednorazowy i kończy się z chwilą wysłania wiadomości lub zaprzestania jej wypełniania.</li>
                </ul>
                <p>Usługi płatne — audyt SEO, pozycjonowanie stron, projektowanie stron internetowych — nie są świadczone drogą elektroniczną w rozumieniu niniejszego regulaminu. Ich zakres, cenę i termin określa odrębna umowa zawierana indywidualnie z klientem.</p>

                <h2 style={h2}>§ 4. Wymagania techniczne</h2>
                <p>Do korzystania z Serwisu niezbędne są:</p>
                <ul style={ul}>
                  <li>urządzenie z dostępem do internetu,</li>
                  <li>aktualna wersja przeglądarki internetowej z obsługą JavaScript,</li>
                  <li>aktywne konto poczty elektronicznej — w przypadku korzystania z formularza kontaktowego.</li>
                </ul>
                <p>Usługodawca informuje, że korzystanie z internetu wiąże się z ryzykiem, w szczególności możliwością działania szkodliwego oprogramowania. Zalecane jest stosowanie aktualnego oprogramowania zabezpieczającego.</p>

                <h2 style={h2}>§ 5. Zakaz dostarczania treści bezprawnych</h2>
                <p>Usługobiorcę obowiązuje zakaz dostarczania treści o charakterze bezprawnym, w szczególności treści naruszających prawa osób trzecich, wzywających do nienawiści, obraźliwych, a także treści zawierających złośliwe oprogramowanie. Usługodawca może odmówić realizacji zapytania naruszającego ten zakaz.</p>

                <h2 style={h2}>§ 6. Zawarcie i rozwiązanie umowy o świadczenie usług elektronicznych</h2>
                <p>Umowa o świadczenie usługi dostępu do treści Serwisu zostaje zawarta z chwilą wejścia na stronę i rozwiązana z chwilą jej opuszczenia — bez składania dodatkowych oświadczeń.</p>
                <p>Umowa o świadczenie usługi formularza kontaktowego zostaje zawarta z chwilą rozpoczęcia wypełniania formularza i rozwiązana z chwilą wysłania wiadomości albo zaprzestania jej wypełniania. Korzystanie z obu usług jest w każdej chwili dobrowolne i może zostać przerwane bez podania przyczyny.</p>

                <h2 style={h2}>§ 7. Tryb postępowania reklamacyjnego</h2>
                <p>Reklamacje dotyczące usług świadczonych drogą elektroniczną można składać:</p>
                <ul style={ul}>
                  <li>pocztą elektroniczną na adres <a href="mailto:kontakt@ai-seo-company.pl" style={a}>kontakt@ai-seo-company.pl</a>,</li>
                  <li>pisemnie na adres siedziby Usługodawcy.</li>
                </ul>
                <p>Reklamacja powinna zawierać oznaczenie Usługobiorcy, opis zastrzeżeń oraz dane kontaktowe do udzielenia odpowiedzi. Usługodawca rozpatruje reklamację i udziela odpowiedzi w terminie <strong>14 dni</strong> od jej otrzymania, na adres wskazany przez składającego.</p>

                <h2 style={h2}>§ 8. Ochrona danych osobowych</h2>
                <p>Zasady przetwarzania danych osobowych oraz stosowania plików cookies opisuje <Link href="/cookies" style={a}>polityka prywatności i cookies</Link>, stanowiąca integralną część niniejszego regulaminu.</p>

                <h2 style={h2}>§ 9. Prawa autorskie</h2>
                <p>Treści opublikowane w Serwisie, w tym teksty, grafiki i układ stron, są chronione prawem autorskim i stanowią własność Usługodawcy lub są wykorzystywane na podstawie odpowiednich licencji. Kopiowanie i rozpowszechnianie ich w celach komercyjnych bez zgody Usługodawcy jest niedozwolone.</p>

                <h2 style={h2}>§ 10. Pozasądowe rozpatrywanie sporów</h2>
                <p>Usługobiorca będący konsumentem może skorzystać z pozasądowych sposobów rozpatrywania reklamacji i dochodzenia roszczeń, przewidzianych w ustawie z dnia 23 września 2016 r. o pozasądowym rozwiązywaniu sporów konsumenckich. W szczególności może zwrócić się o bezpłatną pomoc do powiatowego (miejskiego) rzecznika konsumentów lub do wojewódzkiego inspektora Inspekcji Handlowej. Wykaz podmiotów uprawnionych do prowadzenia postępowań w sprawie pozasądowego rozwiązywania sporów konsumenckich prowadzi Prezes Urzędu Ochrony Konkurencji i Konsumentów i jest on dostępny na stronie <a href="https://www.uokik.gov.pl/pozasadowe_rozwiazywanie_sporow_konsumenckich.php" target="_blank" rel="noopener noreferrer" style={a}>uokik.gov.pl</a>. Skorzystanie z tych trybów jest dobrowolne dla obu stron.</p>

                <h2 style={h2}>§ 11. Postanowienia końcowe</h2>
                <p>W sprawach nieuregulowanych regulaminem zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu cywilnego oraz ustawy o świadczeniu usług drogą elektroniczną.</p>
                <p>Usługodawca zastrzega prawo do zmiany regulaminu z ważnych przyczyn, w szczególności zmiany przepisów prawa lub zakresu świadczonych usług. Zmiany wchodzą w życie z dniem publikacji w Serwisie i nie naruszają praw nabytych przed tą datą.</p>
              </>
            ) : (
              <>
                <p>These terms set out the rules for using the ai-seo-company.pl website and the conditions for providing services by electronic means, pursuant to art. 8 of the Polish Act of 18 July 2002 on Providing Services by Electronic Means.</p>

                <h2 style={h2}>§ 1. Service provider</h2>
                <p>The service provider is <strong>AI SIGNALS COMPANY Prosta Spółka Akcyjna</strong>, registered office at ul. Grzybowska 12/14 lok. B-3, 00-132 Warsaw, Poland, entered in the register of entrepreneurs of the National Court Register kept by the District Court for the Capital City of Warsaw under KRS number 0001239983, NIP 5253090237, REGON 544761611.</p>
                <p>Contact: <a href="mailto:kontakt@ai-seo-company.pl" style={a}>kontakt@ai-seo-company.pl</a>, phone <a href="tel:+48518815055" style={a}>+48 518 815 055</a>.</p>

                <h2 style={h2}>§ 2. Definitions</h2>
                <ul style={ul}>
                  <li><strong>Website</strong> — the website at ai-seo-company.pl together with its subpages.</li>
                  <li><strong>User</strong> — a natural person, legal person or organisational unit using the Website.</li>
                  <li><strong>Electronic service</strong> — a service performed without the simultaneous presence of the parties, by transmitting data at the User's individual request.</li>
                </ul>

                <h2 style={h2}>§ 3. Types and scope of electronic services</h2>
                <p>Through the Website the provider supplies the following services free of charge:</p>
                <ul style={ul}>
                  <li><strong>Access to Website content</strong> — browsing information pages, service descriptions and blog articles.</li>
                  <li><strong>Contact form</strong> — allowing an enquiry to be sent. This is a one-off service ending when the message is sent or the form is abandoned.</li>
                </ul>
                <p>Paid services — SEO audits, search engine optimisation and web design — are not provided by electronic means within the meaning of these terms. Their scope, price and schedule are set out in a separate agreement concluded individually with the client.</p>

                <h2 style={h2}>§ 4. Technical requirements</h2>
                <p>Using the Website requires:</p>
                <ul style={ul}>
                  <li>a device with internet access,</li>
                  <li>a current web browser with JavaScript enabled,</li>
                  <li>an active e-mail account — when using the contact form.</li>
                </ul>
                <p>The provider notes that using the internet carries risks, in particular exposure to malicious software. Keeping security software up to date is recommended.</p>

                <h2 style={h2}>§ 5. Ban on supplying unlawful content</h2>
                <p>Users must not supply unlawful content, in particular content infringing third-party rights, inciting hatred, offensive content, or content containing malicious software. The provider may refuse to handle an enquiry that breaches this ban.</p>

                <h2 style={h2}>§ 6. Conclusion and termination of the agreement</h2>
                <p>The agreement for access to Website content is concluded when you open the site and terminated when you leave it, with no further declarations required.</p>
                <p>The agreement for the contact form service is concluded when you begin filling in the form and terminated when the message is sent or the form is abandoned. Use of both services is voluntary and may be discontinued at any time without giving a reason.</p>

                <h2 style={h2}>§ 7. Complaints procedure</h2>
                <p>Complaints about electronic services may be submitted:</p>
                <ul style={ul}>
                  <li>by e-mail to <a href="mailto:kontakt@ai-seo-company.pl" style={a}>kontakt@ai-seo-company.pl</a>,</li>
                  <li>in writing to the provider's registered address.</li>
                </ul>
                <p>A complaint should identify the User, describe the objections and give contact details for a reply. The provider examines the complaint and responds within <strong>14 days</strong> of receiving it, to the address indicated.</p>

                <h2 style={h2}>§ 8. Personal data</h2>
                <p>The rules for processing personal data and using cookies are described in the <Link href="/cookies" style={a}>privacy and cookies policy</Link>, which forms an integral part of these terms.</p>

                <h2 style={h2}>§ 9. Copyright</h2>
                <p>Content published on the Website, including text, graphics and page layout, is protected by copyright and belongs to the provider or is used under appropriate licences. Copying and distributing it for commercial purposes without the provider's consent is not permitted.</p>

                <h2 style={h2}>§ 10. Out-of-court dispute resolution</h2>
                <p>A User who is a consumer may use the out-of-court complaint and redress procedures provided for in the Polish Act of 23 September 2016 on out-of-court resolution of consumer disputes. In particular they may seek free assistance from a district (municipal) consumer ombudsman or from the regional inspector of the Trade Inspection. The list of entities authorised to conduct out-of-court consumer dispute resolution proceedings is kept by the President of the Office of Competition and Consumer Protection and is available at <a href="https://www.uokik.gov.pl/pozasadowe_rozwiazywanie_sporow_konsumenckich.php" target="_blank" rel="noopener noreferrer" style={a}>uokik.gov.pl</a>. Use of these procedures is voluntary for both parties.</p>

                <h2 style={h2}>§ 11. Final provisions</h2>
                <p>Matters not covered by these terms are governed by Polish law, in particular the Civil Code and the Act on Providing Services by Electronic Means.</p>
                <p>The provider reserves the right to amend these terms for important reasons, in particular changes in law or in the scope of services. Amendments take effect on the date of publication on the Website and do not affect rights acquired before that date.</p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
