const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const topLinks = document.querySelector('.top-links');

menuToggle?.addEventListener('click', () => {
  const opened = sidebar.classList.toggle('open');
  topLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
  menuToggle.textContent = opened ? '×' : '☰';
});

document.querySelectorAll('.sidebar a, .top-links a').forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('open');
    topLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.textContent = '☰';
  });
});

// Barra de avance de lectura.
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
});

// Resalta el módulo visible en el menú lateral.
const sections = [...document.querySelectorAll('main section[id]')];
const sideLinks = [...document.querySelectorAll('.side-link')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    sideLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-25% 0px -65% 0px' });
sections.forEach(section => observer.observe(section));

// Botones para copiar ejemplos de código.
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(button.dataset.copy.replaceAll('&quot;', '"'));
      button.textContent = '¡Copiado!';
      setTimeout(() => button.textContent = original, 1600);
    } catch {
      button.textContent = 'No disponible';
      setTimeout(() => button.textContent = original, 1600);
    }
  });
});
