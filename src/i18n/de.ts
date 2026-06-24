import type { ToolContent } from './types';

// Deutsch.

export const de: ToolContent = {
  htmlLang: 'de',

  meta: {
    title: 'PDF zusammenfügen — PDFs im Browser kombinieren, ohne Upload | runlocally',
    description:
      'Füge mehrere PDF-Dateien in der von dir gewählten Reihenfolge zu einer zusammen, direkt im Browser. Die Dateien werden auf deinem Gerät verarbeitet und nie hochgeladen. Open Source, funktioniert offline.',
    ogTitle: 'PDF zusammenfügen — PDFs im Browser kombinieren, ohne Upload',
    ogDescription:
      'Kombiniere mehrere PDF-Dateien im Browser zu einer. Lege die Reihenfolge fest und lade sie herunter. Nichts wird hochgeladen. Open Source, funktioniert offline.',
  },

  hero: {
    h1: 'PDF zusammenfügen',
    tagline:
      'Kombiniere mehrere PDF-Dateien zu einer — in der von dir gewählten Reihenfolge, im Browser. Nichts wird hochgeladen.',
  },

  intro: {
    h2: 'PDF-Dateien im Browser kombinieren',
    paras: [
      'Dieses Tool fügt zwei oder mehr PDF-Dateien zu einem einzigen Dokument zusammen. Füge deine Dateien hinzu, lege ihre Reihenfolge fest, und die Seiten werden eine nach der anderen zu einem PDF angehängt, das du herunterladen kannst. Deine Originaldateien bleiben unverändert.',
      'Das Zusammenfügen läuft im Browser mit pdf-lib, die Seiten werden also genau so kopiert, wie sie sind. Nichts wird neu gerendert, neu komprimiert oder irgendwohin gesendet, und das Ergebnis lässt sich in jedem üblichen PDF-Reader öffnen.',
    ],
  },

  privacy: {
    h2: 'Warum deine Dateien auf deinem Gerät bleiben',
    lead: 'Datenschutz ist hier strukturell, kein Versprechen. Es gibt keinen Upload-Schritt, weil es keinen Server gibt, auf den hochgeladen werden könnte:',
    points: [
      'Das Zusammenfügen läuft vollständig in deinem Browser.',
      'Die Seite wird als statische Dateien ausgeliefert und stellt keine Anfrage mit deinen PDF-Daten.',
      'Der Quellcode ist offen und kann von allen eingesehen werden (MIT).',
      'Sie funktioniert offline, was nur möglich ist, weil nichts das Gerät verlässt.',
    ],
    note: 'Wenn du es selbst prüfen willst, öffne beim Zusammenfügen das Netzwerk-Panel deines Browsers — keine Anfrage trägt deine Dateien.',
    sourceLinkText: 'Lies den Quellcode.',
  },

  howto: {
    h2: 'So benutzt du es',
    steps: [
      {
        h3: 'PDFs hinzufügen',
        p: 'Klicke, um zwei oder mehr PDF-Dateien auszuwählen, oder ziehe sie an eine beliebige Stelle der Seite. Du kannst jederzeit weitere hinzufügen.',
      },
      {
        h3: 'Reihenfolge festlegen',
        p: 'Verschiebe Dateien nach oben oder unten, um sie anzuordnen, oder entferne, was du nicht brauchst. Die Seiten werden in der angezeigten Reihenfolge kombiniert.',
      },
      {
        h3: 'Zusammenfügen und herunterladen',
        p: 'Kombiniere die Dateien zu einem PDF und lade es herunter. Deine Originaldateien bleiben unberührt.',
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Werden meine Dateien irgendwohin hochgeladen?',
      a: 'Nein. Das Zusammenfügen läuft vollständig in deinem Browser. Es gibt keine Serverkomponente, deine Dateien haben also keinen Weg von deinem Gerät weg. Der Quellcode ist offen und du kannst das im Netzwerk-Panel deines Browsers bestätigen.',
    },
    {
      q: 'Wie wähle ich die Reihenfolge der Seiten?',
      a: 'Jede Datei, die du hinzufügst, erscheint in einer Liste. Verschiebe Dateien nach oben oder unten, um sie anzuordnen, und entferne, was du nicht willst. Die Seiten werden von oben nach unten genau in dieser Reihenfolge kombiniert.',
    },
    {
      q: 'Verändert das Zusammenfügen die Originaldateien?',
      a: 'Nein. Deine Eingabedateien werden auf dem Gerät gelesen und bleiben unverändert. Das Tool erzeugt ein neues kombiniertes PDF, das du herunterladen kannst; nichts wird überschrieben.',
    },
    {
      q: 'Verringert es die Qualität oder komprimiert es die Seiten?',
      a: 'Nein. Die Seiten werden genau so kopiert, wie sie sind — es gibt keine erneute Komprimierung, kein OCR und kein erneutes Rendern. Das zusammengefügte PDF behält denselben Inhalt und dieselbe Qualität wie die Originale.',
    },
    {
      q: 'Kann es passwortgeschützte PDFs zusammenfügen?',
      a: 'Nein. Verschlüsselte (passwortgeschützte) PDFs lassen sich nicht öffnen und daher nicht zusammenfügen. Du siehst eine klare Meldung, wenn eine Datei geschützt ist; entferne zuerst das Passwort und versuche es dann erneut.',
    },
    {
      q: 'Funktioniert es offline?',
      a: 'Ja. Es ist eine PWA. Nach dem ersten Besuch wird es zwischengespeichert, das Zusammenfügen funktioniert also ohne Netzwerkverbindung. Du kannst es auch auf deinem Startbildschirm installieren.',
    },
    {
      q: 'Gibt es ein Limit für Dateigröße oder Anzahl der Dateien?',
      a: 'Es gibt kein festes Limit. Da alles in deinem Browser läuft, hängt die praktische Obergrenze vom Speicher deines Geräts ab. Sehr große oder zahlreiche PDFs können langsamer sein.',
    },
  ],

  footer: {
    openSourceLabel: 'Open Source (MIT)',
    partOf: 'Teil von',
    brandTail: '— kleine Tools, die lokal auf deinem Gerät laufen.',
    colophon:
      'Entwickelt und gepflegt von Geppetto. Ein Teil des Codes entsteht mit KI-Unterstützung; alle Prüfungen und Entscheidungen liegen beim Maintainer.',
    securityText: 'Sicherheit',
  },
};
