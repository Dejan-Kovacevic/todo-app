'use strict';

(() => {
  // -------------------- Phase 1: Grundstruktur & Logging --------------------

  const DEBUG = true;
  const log = (...args) => {
    if (DEBUG) console.log('[todo]', ...args);
  };

  const list = document.getElementById('list');
  const inputField = document.getElementById('inputField');
  const counter = document.getElementById('counter');
  const trashzone = document.getElementById('trashzone');
  const feedback = document.getElementById('feedback');
  const PLACEHOLDER = inputField.getAttribute('placeholder');

  let draggedItem = null;

  function updateCounter() {
    const openItems = list.querySelectorAll('li:not(.complete)').length;
    counter.textContent = openItems;
    log('Zähler aktualisiert:', openItems);
  }

  function formatDate(date) {
    return date.toLocaleDateString('de-CH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  function createIcon(className, symbol, title) {
    const icon = document.createElement('span');
    icon.className = className;
    icon.title = title;
    icon.textContent = symbol;
    return icon;
  }

  function createItem(text, date) {
    const li = document.createElement('li');
    li.draggable = true;

    // textContent statt innerHTML -> Benutzereingaben werden nie als HTML interpretiert
    const label = document.createElement('span');
    label.className = 'text';
    label.textContent = text;

    const dateLabel = document.createElement('span');
    dateLabel.className = 'date';
    dateLabel.textContent = formatDate(date);

    li.append(
      label,
      dateLabel,
      createIcon('heart-icon', '❤', 'Favorit'),
      createIcon('trash-icon', '🗑', 'Löschen'),
    );
    return li;
  }

  // -------------------- Phase 2: Interaktive Schaltflächen --------------------

  // Event Delegation: ein Listener auf der Liste gilt auch für neue Einträge
  list.addEventListener('click', (event) => {
    const li = event.target.closest('li');
    if (!li) return;

    if (event.target.classList.contains('trash-icon')) {
      log('Löschen:', li.querySelector('.text').textContent);
      li.remove();
    } else if (event.target.classList.contains('heart-icon')) {
      li.classList.toggle('hot');
      log('Favorit umgeschaltet:', li.classList.contains('hot'));
    } else if (event.target.classList.contains('text')) {
      li.classList.toggle('complete');
      log('Erledigt umgeschaltet:', li.classList.contains('complete'));
    }

    updateCounter();
  });

  // -------------------- Phase 3: Eingabeleiste --------------------

  // Themenfilter: die Liste ist nur für Alltagsaufgaben gedacht.
  // words  = muss als ganzes Wort vorkommen ("ki" trifft "KI-Tool", aber nicht "Kiste")
  // stems  = darf irgendwo im Text vorkommen (fängt zusammengesetzte Wörter ab)
  const BLOCKED_TOPICS = [
    {
      name: 'KI',
      words: ['ki', 'ai', 'llm', 'gpt', 'chatgpt', 'claude', 'gemini', 'copilot', 'openai', 'chatbot', 'prompt', 'prompts'],
      stems: ['künstliche intelligenz', 'kuenstliche intelligenz', 'machine learning', 'maschinelles lernen', 'neuronal', 'sprachmodell'],
    },
    {
      name: 'Autos',
      words: ['auto', 'autos', 'pkw', 'lkw', 'vw', 'bmw', 'audi', 'tesla', 'porsche', 'mercedes', 'toyota', 'opel', 'tanken', 'garage'],
      stems: [
        'automobil', 'fahrzeug', 'autobahn', 'autowasch', 'autowäsche', 'autowerkstatt', 'autoversicherung',
        'elektroauto', 'mietauto', 'führerschein', 'fuehrerschein', 'tankstelle', 'reifenwechsel',
        'winterreifen', 'sommerreifen', 'ölwechsel', 'oelwechsel', 'selbstfahrend', 'autonomes fahren',
      ],
    },
  ];

  function findBlockedTopic(text) {
    const lower = text.toLowerCase();
    const tokens = lower.split(/[^a-z0-9äöüß]+/);
    const topic = BLOCKED_TOPICS.find(({ words, stems }) =>
      words.some((word) => tokens.includes(word)) || stems.some((stem) => lower.includes(stem)),
    );
    return topic ? topic.name : null;
  }

  function showFeedback(message) {
    feedback.textContent = message;
    feedback.hidden = !message;
    inputField.classList.toggle('rejected', Boolean(message));
  }

  inputField.addEventListener('input', () => showFeedback(''));

  inputField.addEventListener('keyup', async (event) => {
    if (event.key !== 'Enter') return;

    const value = inputField.value.trim();
    if (!value) {
      log('Leere Eingabe ignoriert');
      return;
    }

    const blockedTopic = findBlockedTopic(value);
    if (blockedTopic) {
      log('Abgelehnt (Thema ' + blockedTopic + '):', value);
      showFeedback(`Abgelehnt: Aufgaben zum Thema ${blockedTopic} gehören nicht auf diese Liste. Bitte nur Alltagsaufgaben eintragen.`);
      return;
    }

    inputField.value = '';
    const date = await fetchDate();
    list.appendChild(createItem(value, date));
    log('Neuer Eintrag:', value);
    updateCounter();
  });

  inputField.addEventListener('focus', () => {
    inputField.removeAttribute('placeholder');
  });

  inputField.addEventListener('blur', () => {
    inputField.setAttribute('placeholder', PLACEHOLDER);
  });

  // -------------------- Phase 4: Asynchron (AJAX / fetch) --------------------

  // Holt das aktuelle Datum von einer Zeit-API; fällt auf die lokale Uhr zurück,
  // falls die API nicht erreichbar ist (offline, file://, Timeout).
  async function fetchDate() {
    try {
      const response = await fetch('https://worldtimeapi.org/api/timezone/Europe/Zurich', {
        signal: AbortSignal.timeout(3000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      log('Datum von API:', data.datetime);
      return new Date(data.datetime);
    } catch (error) {
      log('Zeit-API nicht erreichbar, nutze lokale Zeit:', error.message);
      return new Date();
    }
  }

  // -------------------- Drag & Drop in die Trashzone --------------------

  list.addEventListener('dragstart', (event) => {
    draggedItem = event.target.closest('li');
    if (!draggedItem) return;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', ''); // nötig für Firefox
    draggedItem.classList.add('dragAndDropOpacity');
    log('Drag gestartet');
  });

  list.addEventListener('dragend', () => {
    if (draggedItem) draggedItem.classList.remove('dragAndDropOpacity');
    draggedItem = null;
    trashzone.classList.remove('trashIconTransform');
  });

  trashzone.addEventListener('dragover', (event) => {
    event.preventDefault(); // erst dadurch wird "drop" erlaubt
    trashzone.classList.add('trashIconTransform');
  });

  trashzone.addEventListener('dragleave', () => {
    trashzone.classList.remove('trashIconTransform');
  });

  trashzone.addEventListener('drop', (event) => {
    event.preventDefault();
    if (!draggedItem) return;
    log('Per Drag & Drop gelöscht:', draggedItem.querySelector('.text').textContent);
    draggedItem.remove();
    trashzone.classList.remove('trashIconTransform');
    updateCounter();
  });

  // -------------------- TODO: Persistenz mit localStorage --------------------
  // Ziel: Einträge überleben einen Seiten-Reload.
  // 1. save(): alle <li> in Objekte { text, date, hot, complete } umwandeln
  //    und per JSON.stringify unter einem festen Schlüssel speichern.
  // 2. save() überall aufrufen, wo updateCounter() aufgerufen wird.
  // 3. Beim Start: JSON.parse(localStorage.getItem(...)) lesen und Einträge
  //    mit createItem() aufbauen. Nur wenn nichts gespeichert ist, die
  //    Beispiel-Einträge unten verwenden.
  // Achtung: localStorage speichert nur Strings -> Datum als ISO-String ablegen.
  // Doku: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API

  // -------------------- Start --------------------

  ['Einkaufen gehen', 'ESLint einrichten', 'README schreiben'].forEach((text) => {
    list.appendChild(createItem(text, new Date()));
  });
  updateCounter();
  log('App gestartet');
})();
