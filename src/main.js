console.log('js+');

const menuShow = document.querySelector('#menu_show');
menuShow.addEventListener('click', function () {
  let nemu = document.querySelector('#menu')
  nemu.classList.toggle('active')
  console.log('click')
  // body...
})