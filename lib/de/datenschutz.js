// Datenschutzerklärung nach Art. 13 DSGVO (Stand 18.11.2026). Grundlage: polnische Datenschutzerklärung
// (app/[locale]/cookies/CookiesContent.jsx, am 18.11.2026 faktisch korrigiert) und das tatsächliche
// Verhalten des Codes (CookiesBanner.jsx, app/[locale]/layout.js Consent Mode, lib/attribution.js,
// components/Contact.jsx). Nicht juristisch geprüft; Prüfpunkte: ai-seo-prace/de/de-prawne/RAPORT.md.
// Auszeichnung: **fett**, `code`, [Text](/schluessel) = interner Link, [Text](https://…) extern.
import { ANBIETER, STAND_ANZEIGE } from './rechtsstand.js';

export const DATENSCHUTZ = {
  stand: STAND_ANZEIGE,
  lead: 'Diese Datenschutzerklärung informiert Sie nach Art. 13 und 14 der Datenschutz-Grundverordnung (DSGVO) darüber, welche personenbezogenen Daten wir auf der Website ai-seo-company.pl verarbeiten, zu welchen Zwecken, auf welcher Rechtsgrundlage und welche Rechte Sie haben. Sie umfasst auch den Einsatz von Cookies und ähnlichen Technologien.',
  abschnitte: [
    {
      titel: '1. Verantwortlicher und Kontakt',
      bloecke: [
        `Verantwortlicher im Sinne der DSGVO ist die **${ANBIETER.firma}** mit Sitz in Warschau, ${ANBIETER.strasse}, ${ANBIETER.plz} Warschau, Polen (Marke: ${ANBIETER.marke}). Die Gesellschaft ist im Unternehmerregister des Nationalen Gerichtsregisters (KRS) eingetragen, das vom Amtsgericht für die Hauptstadt Warschau geführt wird, unter der KRS-Nummer ${ANBIETER.krs}, NIP ${ANBIETER.nip}, REGON ${ANBIETER.regon}. Weitere Angaben finden Sie im [Impressum](/impressum).`,
        `Kontakt in Datenschutzfragen: [${ANBIETER.email}](mailto:${ANBIETER.email}) oder telefonisch unter [${ANBIETER.telefon}](tel:${ANBIETER.telefonHref}). Wir haben keinen Datenschutzbeauftragten benannt. In allen Fragen zu Ihren personenbezogenen Daten können Sie sich direkt an uns als Verantwortlichen wenden.`,
      ],
    },
    {
      titel: '2. Zwecke und Rechtsgrundlagen der Verarbeitung',
      bloecke: [
        {
          ul: [
            '**Beantwortung einer Anfrage über das Kontaktformular** – Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Maßnahmen auf Ihre Anfrage vor Abschluss eines Vertrags) und Art. 6 Abs. 1 lit. f DSGVO (unser berechtigtes Interesse an der Geschäftskorrespondenz).',
            '**Abschluss und Erfüllung eines Vertrags über Leistungen** – Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.',
            '**Erfüllung steuerlicher und buchhalterischer Pflichten** – Rechtsgrundlage: Art. 6 Abs. 1 lit. c DSGVO.',
            '**Reichweitenmessung mit Google Analytics** – Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO, also Ihre Einwilligung im Cookie-Banner (zugleich Einwilligung nach § 25 Abs. 1 TDDDG für das Speichern und Auslesen von Informationen auf Ihrem Endgerät). Einzelheiten in Abschnitt 3.',
            '**Messung der Wirkung von Google-Ads-Anzeigen** (Cookie `aisc_attr` für 90 Tage, Klick-Kennung im Kontaktformular, erweiterte Conversions) – Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO, also die Marketing-Einwilligung im Cookie-Banner. Einzelheiten in Abschnitt 3.',
            '**Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen** – Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.',
          ],
        },
      ],
    },
    {
      titel: '3. Cookies, Einwilligung und Google Consent Mode',
      bloecke: [
        { h3: 'Welche Technologien wir einsetzen' },
        'Wir setzen Cookies und ähnliche Technologien zu Analysezwecken (Google Analytics), zu Marketingzwecken (Conversion-Messung für Google Ads) und für den ordnungsgemäßen Betrieb der Website ein. Notwendige Funktionen sind immer aktiv; Analyse und Marketing sind optional.',
        { h3: 'Cookie-Banner und Ihre Auswahl' },
        'Beim ersten Besuch erscheint ein Banner mit den Optionen „Alle akzeptieren“, „Optionale ablehnen“ und „Einstellungen verwalten“. In den Einstellungen können Sie Analyse und Marketing einzeln wählen. Ihre Auswahl gilt ab dem Zeitpunkt der Entscheidung und wird im lokalen Speicher Ihres Browsers (localStorage) gespeichert; wir senden sie nicht an uns.',
        { h3: 'Google Consent Mode' },
        'Das Google-Skript (gtag.js) wird auf jeder Unterseite im Google Consent Mode geladen. In den Ländern des Europäischen Wirtschaftsraums (darunter Deutschland und Österreich), im Vereinigten Königreich und in der Schweiz stehen die Einwilligungen für Analyse und Werbung standardmäßig auf „abgelehnt“: Bis zu Ihrer Entscheidung (und nach einer Ablehnung) speichern wir keine Analyse- und Werbe-Cookies von Google. Google kann jedoch Ereignisse ohne Cookies erhalten, also die Adresse der aufgerufenen Seite, Ihre IP-Adresse und Browserdaten. In allen übrigen Ländern starten die Einwilligungen als „erteilt“; dort können Google-Cookies schon beim ersten Besuch gesetzt werden, noch vor Ihrer Auswahl im Banner.',
        { h3: 'Herkunft aus Google Ads (Attribution)' },
        'Wenn Sie über eine Google-Ads-Anzeige auf die Website gelangen, speichern wir die Klick-Kennung (Parameter `gclid`, `gbraid` oder `wbraid`) und die Parameter `utm_*` für die Dauer Ihrer Sitzung im Sitzungsspeicher des Browsers (sessionStorage), zusammen mit der zuerst aufgerufenen Seite, dem Zeitpunkt des ersten Aufrufs und der Domain der verweisenden Seite (ohne Pfad). Nach Ihrer Marketing-Einwilligung speichern wir die Anzeigendaten zusätzlich 90 Tage lang im Cookie `aisc_attr`. Die Kennung fügen wir Ihrer Anfrage aus dem Kontaktformular nur bei, um die Wirkung der Werbung zu messen (auch um Google Ads mitzuteilen, dass eine Anfrage zu einer Zusammenarbeit geführt hat). Außer an unsere Anfragen-Tabelle und an Google (Google Ads, Google Analytics) geben wir sie nicht weiter.',
        { h3: 'Ereignis nach dem Absenden des Kontaktformulars' },
        'Nach dem Absenden des Kontaktformulars übermittelt Ihr Browser an Google (Analytics und Ads) das Ereignis „Anfrage“ zusammen mit Ihrer im Browser gehashten E-Mail-Adresse (erweiterte Conversions). Das Ereignis „Anfrage“ senden wir nur, wenn Sie der Marketing-Einwilligung im Cookie-Banner zugestimmt haben (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG).',
        { h3: 'Einwilligung ändern oder widerrufen' },
        'Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft ändern oder widerrufen: über den Button „Cookie-Einstellungen“ im Footer jeder Seite oder in den Einstellungen Ihres Browsers. Der Widerruf berührt die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung nicht. Wenn Sie Cookies im Browser sperren, funktionieren einzelne Funktionen der Website möglicherweise nicht mehr.',
      ],
    },
    {
      titel: '4. Kontaktformular',
      bloecke: [
        'Wir verarbeiten die Angaben aus dem Formular, um Ihre Anfrage zu beantworten und ein Angebot vorzubereiten. Wir senden sie per E-Mail an unser Team (E-Mail-Dienstleister: Resend) und speichern sie in einer Google-Tabelle, auch Anfragen, die wir als Spam abgelehnt haben, zusammen mit dem Nachrichtentext. Hinzu kommen Herkunftsdaten Ihrer Sitzung (aufgerufene Einstiegsseite, Zeitpunkt, Herkunfts-Domain, gegebenenfalls Anzeigenparameter), damit wir den Weg Ihrer Anfrage nachvollziehen können.',
      ],
    },
    {
      titel: '5. Kostenlose Tools, Ergebnis per E-Mail und Vorlagen',
      bloecke: [
        {
          ul: [
            '**Ergebnis eines Tools per E-Mail** – wenn Sie Ihre E-Mail-Adresse angeben und der Zusendung des Ergebnisses zustimmen, verarbeiten wir die E-Mail-Adresse, die Eingaben im Tool (zum Beispiel Website-Adresse, Firmenname, Branche, Stadt) und das Ergebnis. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Zusendung des Ergebnisses auf Ihre Anforderung) und Art. 6 Abs. 1 lit. f DSGVO (Beantwortung von Fragen zum Ergebnis). Ergebnisse und E-Mail-Adresse löschen wir nach 60 Tagen.',
            '**Schutz vor Missbrauch** – von der IP-Adresse speichern wir ausschließlich einen Einweg-Hashwert, um die Tageslimits der Tools durchzusetzen. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.',
            '**Monatliches SEO Audit und Audit-Verlauf** – nur nach gesonderter, freiwilliger Einwilligung beim Audit-Ergebnis und Bestätigung über den Link in unserer E-Mail (Double-Opt-in; ohne Klick senden wir nichts, eine unbestätigte Anfrage löschen wir nach 7 Tagen). Wir verarbeiten E-Mail-Adresse, Domain und Seitenadresse, Text und Version der Einwilligung, Datum der Anfrage und der Bestätigung, den Hashwert der IP-Adresse und die Zahlen des letzten Audits, um monatlich ein erneutes Audit zu senden und die Veränderung gegenüber dem vorherigen zu zeigen. In unserer Datenbank gespeicherte Audit-Ergebnisse (auch die monatlichen) löschen wir nach 60 Tagen; Vergleichszahlen und Monitoring-Daten speichern wir bis zum Widerruf der Einwilligung. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO. Die Einwilligung widerrufen Sie mit einem Klick in jeder E-Mail (Link „Abmelden“, auch über die Abmelde-Schaltfläche Ihres E-Mail-Programms). Das Audit-Ergebnis erhalten Sie auch ohne diese Einwilligung. Für den Vergleich mit dem vorherigen Audit derselben Domain nutzen wir außerdem unsere früheren Ergebnisse dieser Domain, die höchstens 60 Tage alt sind.',
            '**Vorlage oder Checkliste (PDF)** – wenn Sie Ihre E-Mail-Adresse im Formular auf der Seite der kostenlosen Vorlage oder Checkliste angeben und zustimmen, senden wir Ihnen die Datei (Art. 6 Abs. 1 lit. b DSGVO) und informieren unser Team über die Anfrage (Art. 6 Abs. 1 lit. f DSGVO). Einen Newsletter bieten wir auf der deutschsprachigen Fassung nicht an.',
            '**Empfänger** – Ihre E-Mail-Adresse geben wir ausschließlich an den E-Mail-Dienstleister (Resend) weiter. Die Eingaben im Tool geben wir je nach Tool an Analyse-Anbieter weiter: Google (PageSpeed Insights), DataForSEO (Antworten von KI-Modellen und Google-Ergebnisse), Anthropic (Modell Claude) und Microlink (Screenshots der Website).',
          ],
        },
      ],
    },
    {
      titel: '6. Speicherdauer',
      bloecke: [
        {
          ul: [
            'Daten aus dem Kontaktformular, die nicht zu einem Vertrag geführt haben: bis zu 12 Monate nach Ende der Korrespondenz.',
            'Daten zur Vertragsdurchführung: für die Dauer des Vertrags und danach bis zum Ablauf der Verjährungsfristen.',
            'Buchhaltungsunterlagen: 5 Jahre, gerechnet ab dem Ende des Kalenderjahres, in dem die Steuerzahlungsfrist abgelaufen ist.',
            'Daten aus Analyse-Cookies: bis zu 14 Monate nach dem letzten Besuch oder bis zum Widerruf der Einwilligung.',
            'Cookie `aisc_attr` (Anzeigen-Attribution): 90 Tage ab dem Speichern oder bis zum Widerruf der Marketing-Einwilligung.',
            'Tool-Ergebnisse und die dazugehörige E-Mail-Adresse: 60 Tage. Weitere Fristen stehen in Abschnitt 5.',
          ],
        },
      ],
    },
    {
      titel: '7. Empfänger der Daten',
      bloecke: [
        'Ihre Daten können Auftragsverarbeitern übermittelt werden, die sie in unserem Auftrag verarbeiten: dem Anbieter von Hosting und Serverinfrastruktur, dem E-Mail-Dienstleister (Resend, über den wir Anfragen aus dem Kontaktformular an unser Team senden), dem Anbieter von Tabellen und Skripten (Google), in dem wir die Anfragen aus dem Formular speichern (auch als Spam abgelehnte, mit dem Nachrichtentext), dem Buchhaltungsbüro sowie dem Anbieter von Analyse- und Werbewerkzeugen (Google Ireland Limited: Google Analytics und Google Ads). Mit jedem von ihnen besteht ein Vertrag über die Auftragsverarbeitung. Die Empfänger der Tool-Daten nennt Abschnitt 5.',
      ],
    },
    {
      titel: '8. Übermittlung in Drittländer',
      bloecke: [
        'Bei der Nutzung von Google Analytics können Daten in die Vereinigten Staaten übermittelt werden. Grundlage der Übermittlung ist der Angemessenheitsbeschluss der Europäischen Kommission (EU-US Data Privacy Framework) oder es sind Standardvertragsklauseln. Verarbeitet ein Anbieter der Tools Daten außerhalb des EWR, erfolgt die Übermittlung auf Grundlage eines Angemessenheitsbeschlusses der Europäischen Kommission oder von Standardvertragsklauseln.',
      ],
    },
    {
      titel: '9. Ihre Rechte',
      bloecke: [
        'Ihnen stehen folgende Rechte zu:',
        {
          ul: [
            '**Auskunft** über Ihre Daten und Erhalt einer Kopie (Art. 15 DSGVO),',
            '**Berichtigung** unrichtiger oder Vervollständigung unvollständiger Daten (Art. 16 DSGVO),',
            '**Löschung** Ihrer Daten, das „Recht auf Vergessenwerden“ (Art. 17 DSGVO),',
            '**Einschränkung der Verarbeitung** (Art. 18 DSGVO),',
            '**Datenübertragbarkeit** an einen anderen Verantwortlichen (Art. 20 DSGVO),',
            '**Widerspruch** gegen die Verarbeitung, die auf einem berechtigten Interesse beruht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben (Art. 21 DSGVO),',
            '**Widerruf einer Einwilligung** jederzeit mit Wirkung für die Zukunft; die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt. Die Cookie-Einwilligung widerrufen Sie jederzeit über „Cookie-Einstellungen“ im Footer oder über „Einstellungen“ im Banner.',
          ],
        },
        `Zur Ausübung Ihrer Rechte schreiben Sie an [${ANBIETER.email}](mailto:${ANBIETER.email}).`,
      ],
    },
    {
      titel: '10. Beschwerde bei einer Aufsichtsbehörde',
      bloecke: [
        'Wenn Sie der Ansicht sind, dass wir Ihre Daten rechtswidrig verarbeiten, haben Sie das Recht, sich bei einer Aufsichtsbehörde zu beschweren (Art. 77 DSGVO), insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes. Für uns zuständig ist die polnische Aufsichtsbehörde: **Präsident des Amtes für den Schutz personenbezogener Daten (Prezes Urzędu Ochrony Danych Osobowych)**, ul. Stawki 2, 00-193 Warschau, Polen.',
      ],
    },
    {
      titel: '11. Freiwilligkeit der Angaben und automatisierte Entscheidungen',
      bloecke: [
        'Die Angabe Ihrer Daten ist freiwillig, aber erforderlich, damit wir eine Anfrage beantworten oder einen Vertrag schließen können; ohne diese Daten ist uns das nicht möglich. Ihre Daten dienen nicht der automatisierten Entscheidungsfindung mit rechtlicher Wirkung für Sie, einschließlich Profiling im Sinne von Art. 22 DSGVO.',
      ],
    },
    {
      titel: '12. Änderungen dieser Datenschutzerklärung',
      bloecke: [
        'Wir behalten uns vor, diese Datenschutzerklärung zu ändern, etwa wegen der Weiterentwicklung der Website, neuer Technologien oder geänderter Rechtslage. Die jeweils aktuelle Fassung finden Sie auf dieser Seite; Änderungen gelten ab ihrer Veröffentlichung, soweit das Gesetz nichts anderes vorsieht. Das Datum des Stands steht oben auf der Seite.',
      ],
    },
  ],
};
