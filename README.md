# Todo-App

Eine interaktive, browserbasierte Todo-Applikation – entwickelt in reinem HTML, CSS und JavaScript (ES6), ohne den Einsatz eines Frameworks. Das Projekt entstand als strukturiertes Lernprojekt mit schrittweisem Aufbau: von der Grundstruktur über dynamische DOM-Interaktionen bis hin zur Codequalitätssicherung mit ESLint.

-----

## Technologien

- HTML5
- CSS3 (Google Font: Oswald)
- JavaScript ES6 (DOM-Manipulation, Event Handling, asynchrone Interaktionen)
- AJAX (asynchrone Inhaltsaktualisierungen ohne Seitenreload)
- ESLint (statische Codeanalyse und Qualitätssicherung)
- Entwicklungsumgebung: Visual Studio Code

-----

## Funktionen

- Neue Todo-Einträge via Eingabefeld und Enter-Taste hinzufügen
- Einträge per Schaltfläche löschen
- Einträge per Schaltfläche als Favorit markieren
- Dynamischer Datumseintrag pro Todo (AJAX-basierter Abruf)
- Bildwechsel innerhalb von Elementen ohne Seitenreload (AJAX)
- Interaktive Benutzeroberfläche mit responsivem Layout

-----

## Projektstruktur

```
todo-app/
├── index.html      # Struktur, Markup und Einbindung der Ressourcen
├── style.css       # Layout, Farben und Typografie (Google Font Oswald)
└── script.js       # Gesamte Applikationslogik (ES6, DOM, AJAX, Event Handling)
```

-----

## Entwicklungsprozess

Das Projekt wurde bewusst in aufeinander aufbauenden Phasen entwickelt, um jeden Schritt vollständig zu verstehen, bevor der nächste begonnen wurde.

**Phase 1 – Grundstruktur und Logging**
Zu Beginn wurde die Basisstruktur der Applikation aufgebaut. Für jede implementierte Funktion wurden Konsolenausgaben (Logs) eingebaut, um den Programmfluss nachvollziehen und Fehler gezielt eingrenzen zu können. Dieser Schritt legte die Grundlage für sauberes Debugging.

**Phase 2 – Interaktive Schaltflächen**
Im zweiten Schritt wurden die Aktionsschaltflächen implementiert: Löschen und Favorit markieren. Jede Schaltfläche wurde mit einem eigenen Event Listener verknüpft, der das entsprechende DOM-Element direkt manipuliert. Dabei wurde besonderer Wert auf die korrekte Identifikation der Ziel-Elemente im HTML-Baum gelegt.

**Phase 3 – Eingabeleiste und Dateneingabe**
Die Eingabeleiste wurde so programmiert, dass neue Einträge per Enter-Taste ausgelöst werden. Die Eingabe wird vor der Verarbeitung validiert (leere Felder werden abgefangen), und das Feld wird nach dem Einfügen automatisch zurückgesetzt.

**Phase 4 – Asynchrone Interaktionen mit AJAX**
Ausgewählte Funktionen – wie der automatische Datumseintrag beim Erstellen eines Todos sowie der dynamische Bildwechsel innerhalb von Elementen – wurden mit AJAX-Methoden realisiert. Dies ermöglicht Inhaltsaktualisierungen, ohne die gesamte Seite neu zu laden, und macht die Benutzeroberfläche merklich reaktionsschneller.

**Phase 5 – Codequalität mit ESLint**
Abschliessend wurde ESLint in Visual Studio Code eingerichtet, um den JavaScript-Code auf Stilkonsistenz, potenzielle Fehler und Best Practices zu prüfen. Gefundene Warnungen und Fehler wurden systematisch behoben. Dieser Schritt hat das Verständnis für saubere Codestruktur und professionelle Entwicklungspraktiken deutlich vertieft.

-----

## Wichtigste Lernziele

Durch dieses Projekt wurden folgende Konzepte praktisch erarbeitet und gefestigt:

- Strukturierter, phasenweiser Aufbau einer Webapplikation
- DOM-Zugriffe und dynamische Manipulation des HTML-Baums
- Event Handling und Benutzerinteraktion in Vanilla JavaScript
- Asynchrone Inhaltsaktualisierungen mit AJAX
- Einsatz von ESLint zur Sicherstellung der Codequalität
- Debugging mit Konsolenausgaben und dem Browser-Devtool

-----

## Lokale Ausführung

Kein Build-Step notwendig. Die Applikation läuft direkt im Browser:

```bash
# Variante 1: index.html direkt im Browser öffnen
open index.html

# Variante 2: Lokaler Entwicklungsserver (optional)
npx serve .
```

-----

## Autor

**Dejan Kovacevic**  
ICT Support & Systems | SIZ | Homelab & Scripting Enthusiast  
[LinkedIn](https://linkedin.com/in/dejan-kovacevic-2226191b0)
