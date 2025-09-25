$(function () {
  $('[data-toggle="popover"]').popover();
});

const containers = document.querySelectorAll('.cl-hero__point-imgs');
let canSwitch = true;

containers.forEach(container => {
  const cards = container.querySelectorAll('.cl-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!canSwitch) {
        console.log('cant');
        return;
      }
      canSwitch = false;

      const order = Number(card.dataset.order);

      if (isNaN(order) || order === 0) {
        canSwitch = true;
        return;
      }

      card.dataset.order = 0;
      cards.forEach(c => {
        if (c !== card && c.dataset.order !== '2') {
          c.dataset.order = Number(c.dataset.order) + 1;
        }
        c.style.transform = `translate(${50 * (Number(c.dataset.order) - 1)}%, -50%)`;
        c.style.zIndex = cards.length - c.dataset.order;
      });

      setTimeout(() => {
        canSwitch = true;
      }, 1000);
    });
  });
});

const dots = document.querySelectorAll('.cl-hero__point-dot');

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const parent = dot.offsetParent;
    const window = parent.querySelector('.cl-hero__point-window');

    window.classList.add('active');
  });
});

window.addEventListener('click', e => {
  document.querySelectorAll('.cl-hero__point-window').forEach(win => {
    if (!e.target.closest('.cl-hero__point') || win.closest('.cl-hero__point') !== e.target.closest('.cl-hero__point')) {
      win.classList.remove('active');
    }
  });
});

let slideChangeCounter = 0;

// Селектор для всех твоих каруселей
const carousels = ['#carouselExampleControls', '#carouselExampleControls2', '#carouselExampleControls3', '#carouselExampleControls4', '#carouselExampleControls5', '#carouselExampleControls6'];

// Навешиваем один и тот же обработчик на каждый
carousels.forEach(selector => {
  $(selector).on('slid.bs.carousel', function (e) {
    slideChangeCounter++;

    if (slideChangeCounter >= 5) {
      $('#registerModal').modal('show');
      slideChangeCounter = 0;
    }
  });
});
