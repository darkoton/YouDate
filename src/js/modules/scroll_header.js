function scrollHeader() {
  const header = document.querySelector('.cl-header');
  const headerHeight = header.offsetHeight;

  function onScroll() {
    if (window.scrollY > headerHeight / 2) {
      header.classList.add('cl-scroll');
    } else {
      header.classList.remove('cl-scroll');
    }
  }

  onScroll();

  window.addEventListener('scroll', onScroll);
}
scrollHeader();
