// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });
}

// Screenshot preview tabs.
// Every panel is in the markup and only hidden, so the screenshots are still
// there — and still indexable — if this script never runs.
document.querySelectorAll('[data-shot-tabs]').forEach(group => {
  const tabs = Array.from(group.querySelectorAll('[role="tab"]'));
  if (!tabs.length) return;

  const select = (tab, moveFocus) => {
    tabs.forEach(t => {
      const chosen = t === tab;
      t.setAttribute('aria-selected', chosen);
      t.tabIndex = chosen ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !chosen;
    });
    if (moveFocus) tab.focus();
  };

  tabs.forEach(tab => tab.addEventListener('click', () => select(tab, false)));

  // Left/right arrows move between tabs, which is what a tablist is expected
  // to do once it announces itself as one.
  group.querySelector('[role="tablist"]').addEventListener('keydown', event => {
    const step = { ArrowRight: 1, ArrowLeft: -1, Home: 'first', End: 'last' }[event.key];
    if (step === undefined) return;
    event.preventDefault();
    const current = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
    let next;
    if (step === 'first') next = 0;
    else if (step === 'last') next = tabs.length - 1;
    else next = (current + step + tabs.length) % tabs.length;
    select(tabs[next], true);
  });
});
