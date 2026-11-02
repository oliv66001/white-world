(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('navigation');
  if (toggle && nav) {
    toggle.hidden = false;
    const setOpen = (open, returnFocus = false) => {
      nav.dataset.open = String(open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      if (returnFocus) toggle.focus();
    };
    setOpen(false);
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (event) => { if (event.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false, true);
    });
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
    });
    const wide = window.matchMedia('(min-width: 761px)');
    const onResize = () => { if (wide.matches) setOpen(false); };
    if (typeof wide.addEventListener === 'function') wide.addEventListener('change', onResize);
  }
  document.querySelectorAll('[data-copy-email]').forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', async () => {
      const status = document.querySelector('[data-copy-status]');
      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('clipboard unavailable');
        await navigator.clipboard.writeText(button.dataset.copyEmail);
        if (status) status.textContent = 'Adresse copiée.';
      } catch {
        if (status) status.textContent = 'Sélectionne l’adresse ci-dessus pour la copier, ou ouvre ta messagerie.';
      }
    });
  });
})();
