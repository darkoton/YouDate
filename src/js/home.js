//< " CONNECTING JS COMPONENTS " >=============================================================================================================>//
@@include("./modules/imageFormat.js"); //SUPPORT WEBP

@@include("./modules/device.js"); //DEFINE DEVICE

/* @@include("./modules/preloader.js"); // PRELOADER */

/* @@include("./modules/dynamic_adap.js")  // DYNAMIC ADAPTIVE */

@@include("./modules/scroll_header.js")  // SCROLL HEADER 

/*@@include("./modules/swiper.js"); // SLIDER SWIPER */

/* @@include "./modules/animate_scroll.js" // ANIMATE WITH SCROLL */

@@include("./modules/tabs.js"); // TABS

/*@@include("./modules/spoiler.js"); // TABS */

/* @@include("./modules/parallax.js")  // PARALLAX EFFECT */

//< " СКРИПТЫ " >=============================================================================================================>//

isAvif();
isWebp();
isDevice();

function handleTickInit(tick) {
  tick.value = 0; // изначально показываем 0

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // когда элемент попал в экран — запускаем анимацию
        tick.value = 12345678;

        // чтобы срабатывало только один раз
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5 // 0.5 = половина элемента в зоне видимости
  });

  observer.observe(document.getElementById('counter'));
}

@@include("./components/hero.js"); // HERO
