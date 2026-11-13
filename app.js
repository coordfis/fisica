export function startPortal(data) {
  'use strict';

  const { programas, tipos } = data;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));

  const valid = resource => {
    try {
      return Boolean(resource.titulo)
        && ['https:', 'http:'].includes(new URL(resource.url).protocol)
        && tipos.some(type => type.id === resource.tipo);
    } catch {
      return false;
    }
  };
  const allResources = program => (program.grados
    ? program.grados.flatMap(grade => grade.recursos)
    : program.recursos).filter(valid);

  const main = document.querySelector('main');
  const sidebar = document.querySelector('#sidebar');
  const overlay = document.querySelector('#overlay');
  const menu = document.querySelector('#menu-button');

  function closeMenu() {
    sidebar.classList.remove('open');
    overlay.hidden = true;
    menu.textContent = 'Menú';
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Abrir menú');
  }
  menu.onclick = () => {
    const open = !sidebar.classList.contains('open');
    sidebar.classList.toggle('open', open);
    overlay.hidden = !open;
    menu.textContent = open ? 'Cerrar' : 'Menú';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  overlay.onclick = closeMenu;
  function handleEscape(event) {
    if (event.key === 'Escape') closeMenu();
  }
  document.addEventListener('keydown', handleEscape);

  function programCard(program) {
    const count = allResources(program).length;
    return '<a class="program-card" href="#' + program.id + '" aria-label="Abrir ' + esc(program.nombre) + '">'
      + '<span class="badge">' + (count ? count + ' enlace' + (count !== 1 ? 's' : '') : 'Por incorporar') + '</span>'
      + '<div class="card-label">' + esc(program.etiqueta) + '</div>'
      + '<h3>' + esc(program.nombre) + '</h3><p>' + esc(program.descripcion) + '</p>'
      + '<div class="card-bottom">' + (program.grados ? '1.º · 2.º · 3.º · 4.º · 5.º de secundaria' : 'Libros, tareas y más') + '</div></a>';
  }

  function home() {
    main.innerHTML = '<section class="hero" aria-labelledby="home-title"><div class="hero-copy">'
      + '<div class="eyebrow">COORDINACIÓN ACADÉMICA · FÍSICA</div>'
      + '<h1 id="home-title">Preparar juntos.<br>Enseñar mejor.</h1>'
      + '<p>El punto de encuentro de nuestra plana de Física.<br>Todos los materiales de 2027, en un solo lugar.</p>'
      + '<div class="hero-tags"><span>6 programas</span><span>5 grados de secundaria</span><span>Un mismo equipo</span></div>'
      + '</div></section><section aria-labelledby="programas-title"><div class="section-heading">'
      + '<h2 id="programas-title">Nuestros programas</h2><p>Elige un programa para consultar sus materiales.</p></div>'
      + '<div class="program-grid">' + programas.map(programCard).join('') + '</div></section>';
  }

  function detail(program, gradeId) {
    const grade = program.grados?.find(item => item.id === gradeId) || program.grados?.[0];
    const resources = (grade ? grade.recursos : program.recursos).filter(valid);
    const tabs = program.grados ? '<nav class="grade-tabs" aria-label="Grados de secundaria">'
      + program.grados.map(item => '<a href="#' + program.id + '/' + item.id + '" '
        + (item.id === grade.id ? 'aria-current="page"' : '') + '>'
        + esc(item.nombre.split(' de')[0]) + ' grado</a>').join('') + '</nav>' : '';
    const tiles = tipos.flatMap(type => resources.filter(resource => resource.tipo === type.id)
      .map(resource => '<a class="resource-tile" href="' + esc(resource.url)
        + '" target="_blank" rel="noopener noreferrer"><h3>' + esc(resource.titulo) + '</h3></a>')).join('');

    main.innerHTML = '<a class="back" href="#inicio">Todos los programas</a>'
      + '<section aria-labelledby="detail-title"><div class="detail-head"><h1 id="detail-title">'
      + esc(program.nombre) + '</h1><p>' + esc(program.descripcion) + '</p></div>' + tabs
      + '<div class="resources-heading"><h2>' + (grade ? esc(grade.nombre) : 'Materiales del programa')
      + '</h2><span class="small-count">' + resources.length + ' enlace' + (resources.length !== 1 ? 's' : '')
      + ' disponible' + (resources.length !== 1 ? 's' : '') + '</span></div>'
      + (resources.length ? '<div class="resource-grid">' + tiles + '</div>'
        : '<p class="empty">Aún no hay materiales disponibles.</p>') + '</section>';
  }

  function route() {
    const [routeId, gradeId] = location.hash.slice(1).split('/');
    const id = routeId === 'vacaciones-utiles' ? 'vacaciones-diverticreativas' : routeId;
    const program = programas.find(item => item.id === id);
    document.querySelector('#navigation').innerHTML = '<a href="#inicio" class="' + (!program ? 'active' : '')
      + '" ' + (!program ? 'aria-current="page"' : '') + '>Vista general</a><div class="nav-divider"></div>'
      + programas.map(item => '<a href="#' + item.id + '" class="' + (program === item ? 'active' : '')
        + '" ' + (program === item ? 'aria-current="page"' : '') + '>' + esc(item.nombre) + '</a>').join('');
    document.querySelector('#breadcrumb').textContent = program ? program.nombre : 'Materiales 2027';
    document.title = (program ? program.nombre : 'Física 2027') + ' · Saco Oliveros';
    if (program) detail(program, gradeId);
    else home();
    closeMenu();
    window.scrollTo(0, 0);
  }

  const skip = document.querySelector('.skip');
  function handleSkip(event) {
    event.preventDefault();
    main.focus();
    main.scrollIntoView();
  }
  function handleRoute() {
    route();
    main.focus({ preventScroll: true });
  }
  skip.addEventListener('click', handleSkip);
  window.addEventListener('hashchange', handleRoute);
  route();
  return () => {
    window.removeEventListener('hashchange', handleRoute);
    document.removeEventListener('keydown', handleEscape);
    skip.removeEventListener('click', handleSkip);
    menu.onclick = null;
    overlay.onclick = null;
    closeMenu();
    main.replaceChildren();
    document.querySelector('#navigation').replaceChildren();
  };
}
