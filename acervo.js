// Acervo: injeta o painel com todas as fantasias e liga os botões [data-acervo].
const FANTASIAS = [
  { href: 'efermidade.html', nome: 'Efemeridade', ano: 2026, tema: 'o que desaparece' },
  { href: 'vazio.html',      nome: 'O Vazio',     ano: 2025, tema: 'o que vem depois' },
  { href: 'index.html',   nome: 'O Fracasso',  ano: 2024, tema: 'o que desmorona' },
];
const atual = location.pathname.split('/').pop();
const claro = document.body.dataset.tema === 'claro';

document.body.insertAdjacentHTML('beforeend', `
<div class="offcanvas offcanvas-end acervo" tabindex="-1" id="acervo" aria-label="Acervo de fantasias">
  <div class="offcanvas-header">
    <span class="ac-titulo">Acervo de fantasias</span>
    <button type="button" class="btn-close${claro ? '' : ' btn-close-white'}" data-bs-dismiss="offcanvas" aria-label="Fechar"></button>
  </div>
  <div class="offcanvas-body"><ul>${FANTASIAS.map(f => `
    <li><a href="${f.href}"${f.href === atual ? ' aria-current="page"' : ''}>
      <span class="ac-nome">${f.nome}</span>
      <span class="ac-meta">Halloween ${f.ano} · ${f.tema}</span></a></li>`).join('')}
  </ul></div>
</div>`);

document.querySelectorAll('[data-acervo]').forEach(b =>
  b.addEventListener('click', () => bootstrap.Offcanvas.getOrCreateInstance('#acervo').show()));
