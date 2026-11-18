// AGB (deutsche Fassung der polnischen Nutzungsbedingungen /regulamin, Stand 18.11.2026).
// Inhaltlich deckungsgleich mit RegulaminContent.jsx (PL); Tool-Limits aus lib/narzedziaLiczby.js.
// Die polnischen Bedingungen nennen keine maßgebliche Sprachfassung, daher steht hier keine.
// Nicht juristisch geprüft; Prüfpunkte: ai-seo-prace/de/de-prawne/RAPORT.md.
// Auszeichnung in Texten: **fett**, [Text](/schluessel) = interner Link (Routing-Schlüssel), [Text](https://…) extern.
import { AUDYT, WIDOCZNOSC, AUTORYTET } from '../narzedziaLiczby.js';
import { ANBIETER, STAND_ANZEIGE } from './rechtsstand.js';

export const AGB = {
  stand: STAND_ANZEIGE,
  lead: 'Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die Nutzung der Website ai-seo-company.pl und die Bedingungen, unter denen wir Dienste auf elektronischem Weg erbringen, gemäß Art. 8 des polnischen Gesetzes vom 18. Juli 2002 über die Erbringung von Diensten auf elektronischem Weg.',
  abschnitte: [
    {
      titel: '§ 1 Diensteanbieter',
      bloecke: [
        `Diensteanbieter ist die **${ANBIETER.firma}** mit Sitz in Warschau, ${ANBIETER.strasse}, ${ANBIETER.plz} Warschau, Polen. Die Gesellschaft ist im Unternehmerregister des Nationalen Gerichtsregisters (KRS) eingetragen, das vom Amtsgericht für die Hauptstadt Warschau geführt wird, unter der KRS-Nummer ${ANBIETER.krs}, NIP ${ANBIETER.nip}, REGON ${ANBIETER.regon}.`,
        `Kontakt: [${ANBIETER.email}](mailto:${ANBIETER.email}), Telefon [${ANBIETER.telefon}](tel:${ANBIETER.telefonHref}). Weitere Angaben finden Sie im [Impressum](/impressum).`,
      ],
    },
    {
      titel: '§ 2 Begriffe',
      bloecke: [
        {
          ul: [
            '**Website** – die unter ai-seo-company.pl erreichbare Internetseite mit allen Unterseiten.',
            '**Nutzer** – natürliche Person, juristische Person oder Organisationseinheit, die die Website nutzt.',
            '**Elektronischer Dienst** – eine Leistung, die ohne gleichzeitige Anwesenheit der Parteien durch Datenübertragung auf individuelle Anforderung des Nutzers erbracht wird.',
          ],
        },
      ],
    },
    {
      titel: '§ 3 Art und Umfang der elektronischen Dienste',
      bloecke: [
        'Über die Website erbringen wir unentgeltlich die folgenden elektronischen Dienste:',
        {
          ul: [
            '**Zugang zu den Inhalten der Website** – Aufrufen der Informationsseiten, Leistungsbeschreibungen und der im Blog veröffentlichten Artikel.',
            '**Kontaktformular** – zum Absenden einer Anfrage. Der Dienst ist einmalig und endet mit dem Absenden der Nachricht oder mit dem Abbruch des Ausfüllens.',
            `**Kostenlose Tools** – SEO Audit, KI-Sichtbarkeit Check, llms.txt Generator und Domain Authority Checker. Der Dienst ist einmalig und endet mit der Anzeige des Ergebnisses auf der Seite. Für jedes Tool gilt ein Tageslimit pro IP-Adresse (pro Tag: SEO Audit ${AUDYT.limitIp}, KI-Sichtbarkeit Check ${WIDOCZNOSC.limitIp}, Domain Authority ${AUTORYTET.limitIp}). Die Ergebnisse sind Orientierungswerte, keine Garantie und kein verbindliches Angebot.`,
            '**Versand des Tool-Ergebnisses per E-Mail** – nach Eingabe Ihrer E-Mail-Adresse und Erteilung der Einwilligung senden wir das Ergebnis an diese Adresse. Der Dienst ist einmalig und endet mit dem Versand der Nachricht; Ergebnisse und E-Mail-Adresse löschen wir nach 60 Tagen.',
            '**Monatliches SEO Audit** – wiederkehrendes erneutes Audit der von Ihnen angegebenen Seite, nach gesonderter Einwilligung und Bestätigung über den Link in unserer E-Mail (Double-Opt-in). Dauerhafter Dienst, der bis zur Abmeldung mit einem Klick in einer E-Mail erbracht wird.',
            '**Download einer Vorlage oder Checkliste** – nach Eingabe Ihrer E-Mail-Adresse im Formular auf der Seite der kostenlosen Vorlage senden wir die PDF-Datei an diese Adresse. Der Dienst ist einmalig und endet mit dem Versand der Nachricht.',
          ],
        },
        'Entgeltliche Leistungen – SEO Audit, Suchmaschinenoptimierung (SEO) und Webdesign – werden nicht auf elektronischem Weg im Sinne dieser AGB erbracht. Umfang, Preis und Termin ergeben sich aus einem gesonderten Vertrag, den wir individuell mit dem Kunden schließen.',
      ],
    },
    {
      titel: '§ 4 Technische Voraussetzungen',
      bloecke: [
        'Zur Nutzung der Website benötigen Sie:',
        {
          ul: [
            'ein Gerät mit Internetzugang,',
            'eine aktuelle Version eines Webbrowsers mit aktiviertem JavaScript,',
            'ein aktives E-Mail-Konto – bei Nutzung des Kontaktformulars, des E-Mail-Versands eines Tool-Ergebnisses und des monatlichen Audits.',
          ],
        },
        'Wir weisen darauf hin, dass die Internetnutzung mit Risiken verbunden ist, insbesondere durch Schadsoftware. Wir empfehlen, aktuelle Sicherheitssoftware einzusetzen.',
      ],
    },
    {
      titel: '§ 5 Verbot rechtswidriger Inhalte',
      bloecke: [
        'Nutzer dürfen keine rechtswidrigen Inhalte übermitteln, insbesondere keine Inhalte, die Rechte Dritter verletzen, zu Hass aufrufen oder beleidigend sind, und keine Inhalte, die Schadsoftware enthalten. Wir können die Bearbeitung einer Anfrage ablehnen, die gegen dieses Verbot verstößt.',
      ],
    },
    {
      titel: '§ 6 Vertragsschluss und Beendigung der Verträge über elektronische Dienste',
      bloecke: [
        'Der Vertrag über den Zugang zu den Inhalten der Website kommt mit dem Aufruf der Seite zustande und endet mit dem Verlassen der Seite, ohne dass weitere Erklärungen erforderlich sind.',
        'Der Vertrag über das Kontaktformular kommt zustande, sobald Sie mit dem Ausfüllen des Formulars beginnen, und endet mit dem Absenden der Nachricht oder dem Abbruch des Ausfüllens. Die Verträge über die kostenlosen Tools, den E-Mail-Versand eines Ergebnisses und den Download einer Vorlage kommen zustande, sobald Sie das Tool starten oder das Formular mit Ihrer E-Mail-Adresse absenden, und enden mit der Anzeige des Ergebnisses oder dem Versand der Nachricht. Der Vertrag über das monatliche Audit kommt mit der Bestätigung der Anmeldung über den Link in unserer E-Mail zustande und endet mit der Abmeldung (ein Klick in einer E-Mail) oder dem Widerruf der Einwilligung. Die Nutzung aller Dienste ist jederzeit freiwillig und kann ohne Angabe von Gründen beendet werden.',
      ],
    },
    {
      titel: '§ 7 Reklamationen',
      bloecke: [
        'Reklamationen zu den elektronischen Diensten können Sie einreichen:',
        {
          ul: [
            `per E-Mail an [${ANBIETER.email}](mailto:${ANBIETER.email}),`,
            'schriftlich an die Anschrift unseres Sitzes.',
          ],
        },
        'Die Reklamation sollte den Nutzer bezeichnen, die Beanstandungen beschreiben und Kontaktdaten für die Antwort enthalten. Wir prüfen die Reklamation und antworten innerhalb von **14 Tagen** nach Eingang an die angegebene Adresse.',
      ],
    },
    {
      titel: '§ 8 Datenschutz',
      bloecke: [
        'Wie wir personenbezogene Daten verarbeiten und Cookies einsetzen, beschreibt die [Datenschutzerklärung](/cookies). Sie ist Bestandteil dieser AGB.',
      ],
    },
    {
      titel: '§ 9 Urheberrecht',
      bloecke: [
        'Die auf der Website veröffentlichten Inhalte, darunter Texte, Grafiken und das Seitenlayout, sind urheberrechtlich geschützt und stehen in unserem Eigentum oder werden auf Grundlage entsprechender Lizenzen genutzt. Das Kopieren und Verbreiten zu kommerziellen Zwecken ohne unsere Zustimmung ist nicht gestattet.',
      ],
    },
    {
      titel: '§ 10 Außergerichtliche Streitbeilegung',
      bloecke: [
        'Nutzer, die Verbraucher sind, können die außergerichtlichen Verfahren zur Beschwerde und Rechtsdurchsetzung nutzen, die das polnische Gesetz vom 23. September 2016 über die außergerichtliche Beilegung von Verbraucherstreitigkeiten vorsieht. Sie können sich insbesondere kostenlos an den Kreis- beziehungsweise Stadtverbraucherbeauftragten oder an den Wojewódzki Inspektor Inspekcji Handlowej (Woiwodschaftsinspektor der Handelsinspektion) wenden. Die Liste der Stellen, die außergerichtliche Verfahren zur Beilegung von Verbraucherstreitigkeiten durchführen dürfen, führt der Präsident des polnischen Amtes für Wettbewerb und Verbraucherschutz (UOKiK); sie ist unter [polubowne.uokik.gov.pl](https://polubowne.uokik.gov.pl/) abrufbar (Seite auf Polnisch). Die Nutzung dieser Verfahren ist für beide Seiten freiwillig.',
      ],
    },
    {
      titel: '§ 11 Schlussbestimmungen',
      bloecke: [
        'Auf Fragen, die diese AGB nicht regeln, findet polnisches Recht Anwendung, insbesondere das polnische Zivilgesetzbuch und das Gesetz über die Erbringung von Diensten auf elektronischem Weg.',
        'Wir behalten uns vor, diese AGB aus wichtigem Grund zu ändern, insbesondere bei Änderungen der Rechtslage oder des Leistungsumfangs. Änderungen treten mit der Veröffentlichung auf der Website in Kraft und berühren keine vor diesem Zeitpunkt erworbenen Rechte.',
      ],
    },
  ],
};
