const button = document.getElementById('btn-burger');
if (button) {
  const menuMobile = document.getElementById('menu-mobile');
  const svgContent = document.getElementById('svg-content');
  const iconClose = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
  const iconOpen =
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';

  button.onclick = function () {
    menuMobile.classList.toggle('hidden');
    menuMobile.classList.toggle('transform');
    menuMobile.classList.contains('hidden') ? (svgContent.innerHTML = iconOpen) : (svgContent.innerHTML = iconClose);
  };
}
