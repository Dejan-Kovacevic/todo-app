(() => {
  const inputField = document.getElementById('inputField');
  const list = document.getElementById('list');

  // 1) Click-Handling für Herz + Trash (funktioniert auch für neue Items)
  list.addEventListener('click', (event) => {
    const target = event.target;

    // DELETE
    if (target.classList.contains('trash-icon')) {
      const li = target.closest('li');
      if (li) li.remove();
      return;
    }

    // TOGGLE HOT
    if (target.classList.contains('heart-icon')) {
      const li = target.closest('li');
      if (li) li.classList.toggle('hot');
      return;
    }
  });

  // 2) Neues Item bei Enter anlegen
  inputField.addEventListener('keyup', (event) => {
    if (event.key !== 'Enter') return;

    const value = inputField.value.trim();
    if (!value) return;

    const li = document.createElement('li');
    li.setAttribute('draggable', 'true');

    // Text (als TextNode, sicher)
    li.appendChild(document.createTextNode(value + ' '));

    // Trash Icon
    const trash = document.createElement('span');
    trash.className = 'trash-icon';
    trash.title = 'Delete';
    trash.innerHTML = '&#128465;';
    li.appendChild(trash);

    // Heart Icon
    const heart = document.createElement('span');
    heart.className = 'heart-icon';
    heart.title = 'Hot';
    heart.innerHTML = '&#10084;';
    li.appendChild(heart);

    list.appendChild(li);
    inputField.value = '';
  });

  // 3) Placeholder Verhalten
  inputField.addEventListener('focus', (event) => {
    event.target.removeAttribute('placeholder');
  });

  inputField.addEventListener('focusout', (event) => {
    event.target.setAttribute('placeholder', 'Enter new item and press enter to save...');
  });
})();