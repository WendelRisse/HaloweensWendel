// Efemeridade: a foto se apaga com o scroll e as lembranças somem uma a uma.
const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
const raiz = document.documentElement;

if (!reduz) {
  const atualiza = () => {
    const p = Math.min(1, Math.max(0, scrollY / (innerHeight * 0.9)));
    raiz.style.setProperty('--apagado', p.toFixed(3));
  };
  addEventListener('scroll', atualiza, { passive: true });
  atualiza();
}

// Poema: cada verso vira um <span class="apaga">; o último permanece.
document.querySelectorAll('.poema').forEach(el => {
  const partes = el.innerHTML.split(/<br\s*\/?>/i).map(s => s.trim()).filter(Boolean);
  el.innerHTML = partes.map((t, i) =>
    `<span class="apaga${i === partes.length - 1 ? ' fica' : ''}">${t}</span>`).join('');
});

const obs = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (!e.isIntersecting || reduz) return;
    obs.unobserve(e.target);
    [...e.target.querySelectorAll('.apaga:not(.fica)')].forEach((el, i) =>
      setTimeout(() => el.classList.add('some'), 1800 + i * 1400));
  });
}, { threshold: 0.7 });
document.querySelectorAll('.poema, .perdas').forEach(el => obs.observe(el));
