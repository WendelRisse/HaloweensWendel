// O Vazio: o mar escurece conforme você desce.
const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
const raiz = document.documentElement;

if (!reduz) {
  const atualiza = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    raiz.style.setProperty('--prof', Math.min(1, scrollY / max).toFixed(3));
    raiz.style.setProperty('--hero', Math.min(1, scrollY / innerHeight).toFixed(3));
  };
  addEventListener('scroll', atualiza, { passive: true });
  atualiza();
}

document.querySelectorAll('.poema').forEach(el => {
  el.innerHTML = el.innerHTML.split(/<br\s*\/?>/i).map(s => s.trim()).filter(Boolean)
    .map(t => `<span class="afunda">${t}</span>`).join('');
});
document.querySelectorAll('#simbolismo p:last-of-type strong').forEach(el => el.classList.add('inevitavel'));

const obs = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  obs.unobserve(e.target);
  if (e.target.classList.contains('inevitavel')) return e.target.classList.add('visivel');
  e.target.querySelectorAll('.afunda').forEach((v, i) => setTimeout(() => v.classList.add('visivel'), i * 1500));
}), { threshold: 0.6 });
document.querySelectorAll('.poema, .inevitavel').forEach(el => obs.observe(el));
