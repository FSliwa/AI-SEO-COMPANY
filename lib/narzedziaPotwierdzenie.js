// Tekst potwierdzenia po bramce e-mail darmowych narzędzi (19.11.2026, poprawki audytu 3, test produkcji).
// Panel zwraca w odpowiedzi „odblokuj” opcjonalne pole mailOk. mailOk === false: wynik jest pokazany, ale
// wiadomości nie udało się wysłać, więc nie wolno pisać „raport wysłaliśmy”. undefined i true = wysłano
// (jak dotąd: obecny panel produkcyjny nie zwraca tego pola).
const KONTAKT = 'kontakt@ai-seo-company.pl';

const TEKSTY = {
  pl: {
    wyslano: { pelny: 'Gotowe: pełny wynik jest niżej, raport wysłaliśmy e-mailem.', raport: 'Gotowe: raport wysłaliśmy e-mailem.' },
    nieWyslano: {
      pelny: `Pełny wynik jest niżej, ale nie udało się wysłać raportu e-mailem. Uruchom narzędzie ponownie za chwilę albo napisz na ${KONTAKT}.`,
      raport: `Nie udało się wysłać raportu e-mailem. Wynik masz powyżej. Wyślij formularz ponownie albo napisz na ${KONTAKT}.`,
    },
  },
  en: {
    wyslano: { pelny: 'Done: the full result is below, and we have emailed you the report.', raport: 'Done: we have emailed you the report.' },
    nieWyslano: {
      pelny: `The full result is below, but we could not send the report by email. Run the tool again in a moment or write to ${KONTAKT}.`,
      raport: `We could not send the report by email. The result is above. Submit the form again or write to ${KONTAKT}.`,
    },
  },
  de: {
    wyslano: { pelny: 'Fertig: Das vollständige Ergebnis steht unten, den Bericht haben wir Ihnen per E-Mail geschickt.', raport: 'Fertig: Wir haben Ihnen den Bericht per E-Mail geschickt.' },
    nieWyslano: {
      pelny: `Das vollständige Ergebnis steht unten, aber der Bericht konnte nicht per E-Mail versendet werden. Starten Sie das Tool gleich noch einmal oder schreiben Sie an ${KONTAKT}.`,
      raport: `Der Bericht konnte nicht per E-Mail versendet werden. Das Ergebnis steht oben. Senden Sie das Formular erneut ab oder schreiben Sie an ${KONTAKT}.`,
    },
  },
};

/** { tytul, wyslano } dla języka ('pl' | 'en' | 'de'), trybu tylkoRaport i pola mailOk z panelu. */
export function tekstPotwierdzenia({ lang = 'pl', tylkoRaport = false, mailOk }) {
  const t = TEKSTY[lang] ?? TEKSTY.pl;
  const wyslano = mailOk !== false;
  return { wyslano, tytul: (wyslano ? t.wyslano : t.nieWyslano)[tylkoRaport ? 'raport' : 'pelny'] };
}
