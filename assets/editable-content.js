/* Loads text and image choices saved by Pages CMS. */
fetch('content/home.json', {cache: 'no-store'})
  .then(response => { if (!response.ok) throw new Error('Content unavailable'); return response.json(); })
  .then(data => {
    document.querySelectorAll('[data-field]').forEach(element => {
      const value = data[element.dataset.field];
      if (typeof value === 'string') element.textContent = value;
    });
    document.querySelectorAll('[data-image]').forEach(element => {
      const value = data[element.dataset.image];
      if (typeof value === 'string' && !/^\s*(javascript|data):/i.test(value)) element.src = value.replace(/^\//, '');
    });
    document.querySelectorAll('[data-link]').forEach(element => {
      const value = data[element.dataset.link];
      if (typeof value === 'string' && /^https:\/\//i.test(value)) element.href = value;
    });
  }).catch(error => console.warn('Using built-in homepage content:', error.message));
