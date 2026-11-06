// L1 /pozycjonowanie-wizytowki-google (PLAN-v2 6.6, partia 2 / W5, makieta 07; 5.11.2026).
// Brief: skille/content-brief-ai-uslugi/brief-L1-pozycjonowanie-wizytowki-google.md
// z korektami po weryfikacji CB-01 (H2 o ChatGPT), CB-02 (akapit #cena, podpis źródła,
// nazwa Offer), CB-06 (klaster fraz), CB-16 i AV-08 (drugi przedział cen z Perplexity).
//
// Strona tylko po polsku i za bramką publikacji (lib/publikacja.js, partia 2):
// /en/pozycjonowanie-wizytowki-google = 404 zawsze, wersja PL = 404 do opublikowana: true.
// Title i meta z rejestru publikacji (= PLAN-v2 6.6, 59 i 128 zn.), żeby llms.txt, nawigacja
// i <title> nie mogły się rozjechać. Okruszki 2-poziomowe (Strona główna › bieżąca).
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import ServiceSchema from '@/components/ServiceSchema';
import WizytowkaClient from '@/components/WizytowkaClient';
import { metadataStronyPl, wymagajStronyPl } from '@/lib/stronaPl';
import { wpisPublikacji } from '@/lib/publikacja';

const SCIEZKA = '/pozycjonowanie-wizytowki-google';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const wpis = wpisPublikacji(SCIEZKA);
  return metadataStronyPl({
    locale,
    sciezka: SCIEZKA,
    title: wpis.tytul,
    description: wpis.opis,
    ogType: 'website',
  });
}

// FAQ z briefu L1 (6 pytań, gotowe teksty). Stałe id = kotwice pytań (AppleFaq otwiera
// pytanie z #id); id nie trafiają do JSON-LD. Pytanie 6 porównuje wizytówkę ze STRONĄ,
// nie z SEO lokalnym: /seo-lokalne-warszawa dostaje własne pytanie o wizytówkę (CB-16, PLAN 5.5).
// Fakty o opiniach: zasady treści Map Google (fałszywe zaangażowanie, zakaz korzyści za opinię)
// i Pomoc Profilu Firmy o ograniczeniach profilu - linki w sekcji Źródła, odczyt 5.11.2026.
const faqData = [
  {
    id: 'czy-wizytowka-google-jest-platna',
    question: 'Czy wizytówka Google jest płatna?',
    answer: 'Nie. Profil Firmy w Google zakładasz i prowadzisz bezpłatnie, a Google nie sprzedaje wyższych miejsc w bezpłatnych wynikach Map. Płatne są tylko reklamy oznaczone jako sponsorowane. Płacąc za pozycjonowanie wizytówki, płacisz za pracę: kategorie i usługi, zdjęcia, posty, odpowiedzi na opinie i pomiar pozycji.',
  },
  {
    id: 'jak-poprawic-widocznosc-wizytowki-google',
    question: 'Jak poprawić widoczność wizytówki Google?',
    answer: 'Najszybciej działa trafność: właściwa kategoria główna, kategorie dodatkowe, pełna lista usług z opisami i prawdziwe godziny otwarcia. Potem rozpoznawalność: stały napływ opinii z odpowiedzią w ciągu 48 godzin, posty co najmniej dwa razy w miesiącu, nowe zdjęcia i te same dane firmy w katalogach. Odległości od klienta nie zmienisz.',
  },
  {
    id: 'ile-trwa-pozycjonowanie-wizytowki-google',
    question: 'Ile trwa pozycjonowanie wizytówki Google?',
    answer: 'Zmiany kategorii i usług Google zwykle uwzględnia w ciągu kilku tygodni, dlatego pierwszy pomiar siatką robimy przed zmianami, a kolejne co 14 dni. Opinie i wzmianki budują pozycję miesiącami. Dla uzgodnionych fraz lokalnych celem jest TOP 3 w ciągu 2–3 miesięcy.',
  },
  {
    id: 'wizytowka-firmy-bez-lokalu',
    question: 'Czy można pozycjonować wizytówkę firmy bez lokalu?',
    answer: 'Tak. Firma, która dojeżdża do klientów, ukrywa adres i ustawia obszar obsługi. Pozycja w Mapach nadal zależy od odległości od adresu podanego przy weryfikacji, więc mierzymy ją siatką wokół tego punktu, a zasięg poza nim wzmacniamy stroną opisującą obszar działania.',
  },
  {
    id: 'czy-mozna-kupic-opinie-google',
    question: 'Czy można kupić opinie w Google?',
    answer: 'Nie warto i nie wolno. Zasady Google zakazują fałszywych opinii i nagradzania klientów za ich wystawienie, a naruszenia kończą się usuwaniem opinii i ograniczeniami profilu. Działa proces: prośba o opinię po każdej usłudze z bezpośrednim linkiem i odpowiedź na każdą opinię. Opisujemy go w <a href="/blog/jak-pozyskiwac-opinie-google-poradnik" style="text-decoration:underline">poradniku o opiniach Google</a>.',
  },
  {
    id: 'wizytowka-a-pozycjonowanie-strony',
    question: 'Czym różni się pozycjonowanie wizytówki od pozycjonowania strony?',
    answer: 'Pozycjonowanie wizytówki dotyczy Profilu Firmy w Mapach i w pakiecie lokalnym. Pozycjonowanie strony dotyczy wyników organicznych pod mapą: podstron usług, treści, danych strukturalnych i linków. Firma, która ma oba, zwykle wygrywa z firmą, która ma tylko wizytówkę, bo strona wzmacnia rozpoznawalność profilu.',
  },
];

export default async function PozycjonowanieWizytowkiPage({ params }) {
  const { locale } = await params;
  wymagajStronyPl(locale, SCIEZKA);
  return (
    <>
      {/* Service + Offer „SEO Standard z prowadzeniem wizytówki” 1 900 PLN/mies. (CB-02);
          ta sama kwota jest widoczna w sekcji #cena. FAQPage generuje AppleFaq, BreadcrumbList Breadcrumbs. */}
      <ServiceSchema variant="wizytowka" />
      <Header />
      <Breadcrumbs pl="Pozycjonowanie wizytówki Google" en="Pozycjonowanie wizytówki Google" />
      <WizytowkaClient faqData={faqData} />
      <Footer />
    </>
  );
}
