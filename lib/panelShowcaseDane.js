// Dane sekcji Panelu Klienta - Propozycja 1: Hybryda Linear x Stripe x Vercel x Apple x Supabase (25.11.2026).
// Czysty modul ESM bez 'use client'. Zachowuje 100% oryginalnych naglowkow, akapitow i fraz kluczowych PL/EN/DE.

export const PANEL_WARSTWY = {
  pl: {
    idSekcji: 'panel-klienta',
    tag: 'PANEL KLIENTA',
    h2: 'Panel klienta, w którym agencja SEO pokazuje swoją pracę codziennie',
    lead: 'Raport raz w miesiącu to za mało, żeby ocenić, za co płacisz. W panelu widzisz wzrost zapytań z Google, pozycje fraz, dziennik naszych prac i opis każdej zmiany kodu Twojej strony. Projekt prowadzimy jawnie od pierwszego dnia, a panel jest w cenie każdego pakietu SEO.',
    ctaDemo: 'Otwórz demo bez logowania',
    ctaStrona: 'Co jest w panelu klienta',
    zaufanie: 'Stolarnia Demo · Bez podawania e-maila · W cenie każdego pakietu',
    ariaStos: 'Podgląd trzech widoków panelu klienta',
    sidebarMarka: 'Stolarnia Demo',
    sidebarMenu: ['Przegląd', 'Pozycje', 'Zmiany AI', 'Zgody (2)'],
    dymekGora: {
      odznaka: '+30%',
      tytul: '43 zapytania z Google',
      opis: 'GSC + GA4 · +19% kliknięć m/m',
    },
    dymekDol: {
      odznaka: '✓ 1 klik',
      tytul: 'Zmiana kodu opisana przez AI',
      opis: 'Commit #a47d89 · zatwierdzono bez maili',
    },
    widoki: {
      przeglad: {
        naglowek: 'Wrzesień: 43 zapytania z Google (+10 m/m)',
        kpi: [
          { etykieta: 'Zapytania', wartosc: '43', zmiana: '+30% m/m' },
          { etykieta: 'Kliknięcia GSC', wartosc: '3 581', zmiana: '+19% m/m' },
          { etykieta: 'Śr. pozycja', wartosc: '9,0', zmiana: '14 w TOP 3' },
        ],
      },
      zmiany: {
        naglowek: 'Co zmieniło się w kodzie stolarnia-demo.test',
        wpisy: [
          {
            tytul: 'Commit #a47d89 · Galeria schodów AVIF',
            efekt: '+24 zdjęcia z alt lokalnym · LCP 2,4s -> 1,6s',
          },
          {
            tytul: 'Commit #98b04c · 37 przekierowań 301',
            efekt: 'Usunięto łańcuchy 301 · TTFB 0,9s -> 0,5s',
          },
        ],
      },
      akceptacje: {
        naglowek: '2 materiały czekają na decyzję 1 kliknięciem',
        elementy: [
          {
            tytul: 'Poradnik: Jak dobrać lakier do schodów',
            meta: '11 400 zn. · gotowy do publikacji',
            akcja: 'Akceptuję ✓',
          },
          {
            tytul: 'Galeria realizacji: 24 zdjęcia schodów',
            meta: 'Opisy alt + kompresja AVIF · podgląd',
            akcja: 'Akceptuję ✓',
          },
        ],
      },
    },
    items: [
      {
        nr: '01',
        krotka: 'Przegląd',
        okno: 'Przegląd zapytań · 24h',
        plakietka: 'LIVE · GSC + GA4',
        title: 'Zapytania i ruch z Google',
        text: 'Liczba zapytań z formularza, telefonu i e-maila na pierwszym ekranie, cel na miesiąc i wzrost kliknięć z Google Search Console.',
        stopka: 'Odświeżanie co 24h · 86% celu mies.',
      },
      {
        nr: '02',
        krotka: 'Kod AI',
        okno: 'Historia zmian kodu · opis AI',
        plakietka: 'GitHub + AI',
        title: 'Każda zmiana na stronie opisana',
        text: 'AI czyta historię zmian w kodzie strony, a zespół sprawdza opis przed publikacją. Widzisz, co zmieniliśmy i po co.',
        stopka: 'Commit -> prosty język dla właściciela',
      },
      {
        nr: '03',
        krotka: 'Akceptacje',
        okno: 'Akceptacje treści · 1 kliknięcie',
        plakietka: '1 kliknięcie',
        title: 'Decyzje jednym kliknięciem',
        text: 'Artykuły, zdjęcia i zmiany czekające na Twoją zgodę są w jednym miejscu, bez wątków mailowych.',
        stopka: 'Średni czas akceptacji < 30 sekund',
      },
    ],
  },
  en: {
    idSekcji: 'client-portal',
    tag: 'CLIENT PORTAL',
    h2: 'A client portal where your SEO company shows its work every day',
    lead: 'Most clients of an SEO company only get a monthly report, and that is not enough to judge what you are paying for. In the portal you see enquiry growth from Google, keyword positions, a log of our work and a summary of every change to your site code. The portal is included in every package.',
    ctaDemo: 'Open the demo, no login',
    ctaStrona: 'What is in the client portal',
    zaufanie: 'Demo workspace · No email required · Included in every plan',
    ariaStos: 'Preview of three client portal views',
    sidebarMarka: 'Demo Joinery',
    sidebarMenu: ['Overview', 'Rankings', 'AI Log', 'Approvals (2)'],
    dymekGora: {
      odznaka: '+30%',
      tytul: '43 enquiries from Google',
      opis: 'GSC + GA4 · +19% clicks m/m',
    },
    dymekDol: {
      odznaka: '✓ 1 click',
      tytul: 'Code change explained by AI',
      opis: 'Commit #a47d89 · approved without emails',
    },
    widoki: {
      przeglad: {
        naglowek: 'September: 43 Google enquiries (+10 m/m)',
        kpi: [
          { etykieta: 'Enquiries', wartosc: '43', zmiana: '+30% m/m' },
          { etykieta: 'GSC clicks', wartosc: '3,581', zmiana: '+19% m/m' },
          { etykieta: 'Avg. rank', wartosc: '9.0', zmiana: '14 in TOP 3' },
        ],
      },
      zmiany: {
        naglowek: 'What changed in stolarnia-demo.test code',
        wpisy: [
          {
            tytul: 'Commit #a47d89 · Staircase AVIF gallery',
            efekt: '+24 local-alt photos · LCP 2.4s -> 1.6s',
          },
          {
            tytul: 'Commit #98b04c · 37 clean 301 redirects',
            efekt: 'Redirect chains removed · TTFB 0.9s -> 0.5s',
          },
        ],
      },
      akceptacje: {
        naglowek: '2 items ready for 1-click approval',
        elementy: [
          {
            tytul: 'Guide: Choosing the right stair finish',
            meta: '11,400 chars · ready to publish',
            akcja: 'Approve ✓',
          },
          {
            tytul: 'Project gallery: 24 staircase photos',
            meta: 'Alt copy + AVIF compression · preview',
            akcja: 'Approve ✓',
          },
        ],
      },
    },
    items: [
      {
        nr: '01',
        krotka: 'Overview',
        okno: 'Enquiries overview · 24h',
        plakietka: 'LIVE · GSC + GA4',
        title: 'Enquiries and Google traffic',
        text: 'Form, phone and email enquiries on the first screen, a monthly goal and click growth from Google Search Console.',
        stopka: '24h auto-refresh · 86% of monthly goal',
      },
      {
        nr: '02',
        krotka: 'AI Code',
        okno: 'Code change log · AI summary',
        plakietka: 'GitHub + AI',
        title: 'Every change to the site explained',
        text: 'AI reads the history of changes in your site code and the team reviews the summary before publishing it.',
        stopka: 'Commit -> plain-English summary',
      },
      {
        nr: '03',
        krotka: 'Approvals',
        okno: 'Content approvals · 1 click',
        plakietka: '1 click',
        title: 'Decisions in one click',
        text: 'Articles, photos and changes waiting for your approval sit in one place instead of email threads.',
        stopka: 'Average approval time < 30 seconds',
      },
    ],
  },
  de: {
    idSekcji: 'kundenportal',
    tag: 'KUNDENPORTAL',
    h2: 'Ein Kundenportal, in dem Ihre SEO-Agentur ihre Arbeit täglich offenlegt',
    lead: 'Ein Monatsbericht reicht nicht aus, um zu beurteilen, wofür Sie bezahlen. Im Portal sehen Sie das Wachstum Ihrer Google-Anfragen, Keyword-Positionen, unser Arbeitsprotokoll und jede Code-Änderung an Ihrer Website. Das Portal ist in jedem SEO-Paket enthalten.',
    ctaDemo: 'Demo ohne Login öffnen',
    ctaStrona: 'Was im Kundenportal steckt',
    zaufanie: 'Demo-Arbeitsbereich · Ohne E-Mail-Angabe · In jedem Paket enthalten',
    ariaStos: 'Vorschau der drei Ansichten im Kundenportal',
    sidebarMarka: 'Schreinerei Demo',
    sidebarMenu: ['Übersicht', 'Rankings', 'KI-Code', 'Freigaben (2)'],
    dymekGora: {
      odznaka: '+30%',
      tytul: '43 Anfragen über Google',
      opis: 'GSC + GA4 · +19% Klicks m/m',
    },
    dymekDol: {
      odznaka: '✓ 1 Klick',
      tytul: 'Code-Änderung per KI erklärt',
      opis: 'Commit #a47d89 · ohne E-Mails freigegeben',
    },
    widoki: {
      przeglad: {
        naglowek: 'September: 43 Google-Anfragen (+10 m/m)',
        kpi: [
          { etykieta: 'Anfragen', wartosc: '43', zmiana: '+30% m/m' },
          { etykieta: 'GSC-Klicks', wartosc: '3.581', zmiana: '+19% m/m' },
          { etykieta: 'Ø Position', wartosc: '9,0', zmiana: '14 in TOP 3' },
        ],
      },
      zmiany: {
        naglowek: 'Was sich im Website-Code geändert hat',
        wpisy: [
          {
            tytul: 'Commit #a47d89 · Treppen-Galerie AVIF',
            efekt: '+24 Fotos mit Lokal-Alt · LCP 2,4s -> 1,6s',
          },
          {
            tytul: 'Commit #98b04c · 37 Weiterleitungen 301',
            efekt: '301-Ketten bereinigt · TTFB 0,9s -> 0,5s',
          },
        ],
      },
      akceptacje: {
        naglowek: '2 Inhalte bereit zur 1-Klick-Freigabe',
        elementy: [
          {
            tytul: 'Ratgeber: Den richtigen Treppenlack wählen',
            meta: '11.400 Zeichen · publikationsfertig',
            akcja: 'Freigeben ✓',
          },
          {
            tytul: 'Referenzgalerie: 24 Treppenfotos',
            meta: 'Alt-Texte + AVIF-Kompression · Vorschau',
            akcja: 'Freigeben ✓',
          },
        ],
      },
    },
    items: [
      {
        nr: '01',
        krotka: 'Übersicht',
        okno: 'Anfragen-Übersicht · 24h',
        plakietka: 'LIVE · GSC + GA4',
        title: 'Anfragen und Google-Traffic',
        text: 'Formular-, Telefon- und E-Mail-Anfragen auf dem ersten Bildschirm, Ihr Monatsziel und das Klick-Wachstum aus der Google Search Console.',
        stopka: '24h-Auto-Sync · 86% des Monatsziels',
      },
      {
        nr: '02',
        krotka: 'KI-Code',
        okno: 'Code-Änderungen · KI-Klartext',
        plakietka: 'GitHub + KI',
        title: 'Jede Seitenänderung erklärt',
        text: 'Die KI liest die Historie im Website-Code und unser Team prüft die Zusammenfassung vor der Veröffentlichung im Portal.',
        stopka: 'Commit -> verständlicher Klartext',
      },
      {
        nr: '03',
        krotka: 'Freigaben',
        okno: 'Inhalts-Freigaben · 1 Klick',
        plakietka: '1 Klick',
        title: 'Freigaben mit einem Klick',
        text: 'Artikel, Bilder und Änderungen warten gesammelt an einem Ort auf Ihre Zustimmung, ganz ohne lange E-Mail-Ketten.',
        stopka: 'Freigabe im Schnitt in < 30 Sekunden',
      },
    ],
  },
};
