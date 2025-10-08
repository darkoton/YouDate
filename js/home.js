//< " CONNECTING JS COMPONENTS " >=============================================================================================================>//
// Проверка поддержки формата изображений
function testImageFormat(format, data, callback) {
  let img = new Image();
  img.onload = img.onerror = () => {
    callback(img.height === 2);
  };
  img.src = data;
}

// Проверка AVIF
function isAvif() {
  testImageFormat(
    "avif",
    "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAG1pZjFhdmlmAAAAAGF2MDFtZGF0EgAKBQAACQAAAD1iGQ==",
    (support) => {
      let className = support ? "avif" : "no-avif";
      document.documentElement.classList.add(className);
    }
  );
}

// Проверка WebP
function isWebp() {
  testImageFormat(
    "webp",
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA",
    (support) => {
      let className = support ? "webp" : "no-webp";
      document.documentElement.classList.add(className);
    }
  );
}

; //SUPPORT WEBP

function isDevice () {
  let isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
  };

  if (isMobile.any()) {
    document.body.classList.add("_touch");
  } else {
    document.body.classList.add("_pc");
  }
} 

isDevice(); //DEFINE DEVICE

/* document.addEventListener("DOMContentLoaded", () => {

  const mediaFiles = Array.from(document.querySelectorAll("img, video"))
  let i = 0
  const preloader = document.querySelector(".preloader")
  const percent = document.querySelector(".preloader .percent > span")

  if (!preloader || !percent) {
    console.error("Не удалось найти элементы");
    return;
  }

  if (mediaFiles.length == 0) {
    percent.textContent = '100'
    preloader.classList.add("preloader--hide")
  }

  const updateProgress = () => {
    i++;
    percent.textContent = ((i * 100) / mediaFiles.length).toFixed();
    if (i === mediaFiles.length) {
      percent.textContent = '100';
      preloader.classList.add("preloader--hide");
    }
  };


  mediaFiles.forEach(file => {
    if (!file.complete) {
      file.onload = updateProgress
    } else {
      updateProgress()
    }

  });
}); // PRELOADER */

/* function dynamicAdaptive() {
  function DynamicAdapt(type) {
    this.type = type;
  }

  DynamicAdapt.prototype.init = function () {
    const _this = this;
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    this.nodes = document.querySelectorAll("[data-da]");

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const data = node.dataset.da.trim();
      const dataArray = data.split(",");
      const оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(dataArray[0].trim());
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
      оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);

    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
      return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
    });

    for (let i = 0; i < this.mediaQueries.length; i++) {
      const media = this.mediaQueries[i];
      const mediaSplit = String.prototype.split.call(media, ',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];

      const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
        return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addListener(function () {
        _this.mediaHandler(matchMedia, оbjectsFilter);
      });
      this.mediaHandler(matchMedia, оbjectsFilter);
    }
  };

  DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
      for (let i = 0; i < оbjects.length; i++) {
        const оbject = оbjects[i];
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.moveTo(оbject.place, оbject.element, оbject.destination);
      }
    } else {
      for (let i = 0; i < оbjects.length; i++) {
        const оbject = оbjects[i];
        if (оbject.element.classList.contains(this.daClassname)) {
          this.moveBack(оbject.parent, оbject.element, оbject.index);
        }
      }
    }
  };

  DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
      destination.insertAdjacentElement('beforeend', element);
      return;
    }
    if (place === 'first') {
      destination.insertAdjacentElement('afterbegin', element);
      return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
  }

  DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
      parent.insertAdjacentElement('beforeend', element);
    }
  }

  DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
  };

  DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return -1;
          }

          if (a.place === "last" || b.place === "first") {
            return 1;
          }

          return a.place - b.place;
        }

        return a.breakpoint - b.breakpoint;
      });
    } else {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return 1;
          }

          if (a.place === "last" || b.place === "first") {
            return -1;
          }

          return b.place - a.place;
        }

        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  };

  const da = new DynamicAdapt("max");
  da.init();

}
dynamicAdaptive()  // DYNAMIC ADAPTIVE */

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
  // SCROLL HEADER 

/*new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 15,
  grabCursor: true,
  loop: true,
  speed: 800,

  autoplay: {
    delay: 3500,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    767.8: {},
  }
});

; // SLIDER SWIPER */

/* @@include "./modules/animate_scroll.js" // ANIMATE WITH SCROLL */

document.querySelectorAll('[data-tabs]').forEach(parent => {
  const buttons = parent.querySelectorAll('[data-tab-btn]');
  const results = parent.querySelectorAll('[data-tab]');

  buttons.forEach(button => {
    const tabName = button.dataset.tabBtn;

    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      results.forEach(block => {
        if (block.dataset.tab === tabName) {
          block.classList.add('active');
        } else {
          block.classList.remove('active');
        }
      });
    });
  });
});
; // TABS

/*const spollersArray = document.querySelectorAll('[data-spollers]');

if (spollersArray.length > 0) {
  // Получение обычных спойлеров
  const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
    return !item.dataset.spollers.split(",")[0];
  });
  // Инициализация обычных спойлеров
  if (spollersRegular.length > 0) {
    initSpollers(spollersRegular);
  }

  // Получение спойлеров с медиа запросами
  const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
    return item.dataset.spollers.split(",")[0];
  });

  // Инициализация спойлеров с медиа запросами
  if (spollersMedia.length > 0) {
    const breakpointsArray = [];
    spollersMedia.forEach(item => {
      const params = item.dataset.spollers;
      const breakpoint = {};
      const paramsArray = params.split(",");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });

    // Получаем уникальные брейкпоинты
    let mediaQueries = breakpointsArray.map(function (item) {
      return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
    });
    mediaQueries = mediaQueries.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });

    // Работаем с каждым брейкпоинтом
    mediaQueries.forEach(breakpoint => {
      const paramsArray = breakpoint.split(",");
      const mediaBreakpoint = paramsArray[1];
      const mediaType = paramsArray[2];
      const matchMedia = window.matchMedia(paramsArray[0]);

      // Объекты с нужными условиями
      const spollersArray = breakpointsArray.filter(function (item) {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });
      // Событие
      matchMedia.addListener(function () {
        initSpollers(spollersArray, matchMedia);
      });
      initSpollers(spollersArray, matchMedia);
    });
  }
  // Инициализация
  function initSpollers(spollersArray, matchMedia = false) {
    spollersArray.forEach(spollersBlock => {
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add('_init');
        initSpollerBody(spollersBlock);
        spollersBlock.addEventListener("click", setSpollerAction);
      } else {
        spollersBlock.classList.remove('_init');
        initSpollerBody(spollersBlock, false);
        spollersBlock.removeEventListener("click", setSpollerAction);
      }
    });
  }
  // Работа с контентом
  function initSpollerBody(spollersBlock, hideSpollerBody = true) {
    const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
    if (spollerTitles.length > 0) {
      spollerTitles.forEach(spollerTitle => {
        if (hideSpollerBody) {
          spollerTitle.removeAttribute('tabindex');
          if (!spollerTitle.classList.contains('_active')) {
            spollerTitle.nextElementSibling.hidden = true;
          }
        } else {
          spollerTitle.setAttribute('tabindex', '-1');
          spollerTitle.nextElementSibling.hidden = false;
        }
      });
    }
  }
  function setSpollerAction(e) {
    const el = e.target;
    if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
      const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
      const spollersBlock = spollerTitle.closest('[data-spollers]');
      const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
      if (!spollersBlock.querySelectorAll('._slide').length) {
        if (oneSpoller && !spollerTitle.classList.contains('_active')) {
          hideSpollersBody(spollersBlock);
        }
        spollerTitle.classList.toggle('_active');
        _slideToggle(spollerTitle.nextElementSibling, 500);
      }
      e.preventDefault();
    }
  }
  function hideSpollersBody(spollersBlock) {
    const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
    if (spollerActiveTitle) {
      spollerActiveTitle.classList.remove('_active');
      _slideUp(spollerActiveTitle.nextElementSibling, 500);
    }
  }
}

let _slideUp = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
}
let _slideDown = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    if (target.hidden) {
      target.hidden = false;
    }
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  }
}
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
}; // TABS */

/* function parallax() {
  document.addEventListener("mousemove", function (e) {
    this.querySelectorAll(".parallax-mouse").forEach(item => {
      const animationDuration = 4000;

      const parallaxSpeed = item.getAttribute("data-parallax-speed");
      item.style.transform = `
        translateX(${e.clientX * parallaxSpeed / animationDuration}px) 
        translateY(${e.clientY * parallaxSpeed / animationDuration}px)
        `;

      const transformRotate = item.getAttribute("data-parallax-rotate")

      if (transformRotate) {
        item.style.transform = `
        rotate(${transformRotate}deg)
        translateX(${e.clientX * parallaxSpeed / animationDuration}px) 
        translateY(${e.clientY * parallaxSpeed / animationDuration}px)
        `;
      }
    });
  });
}
parallax()  // PARALLAX EFFECT */

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

const dots = document.querySelectorAll('.cl-hero__point-button');

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const parent = dot.offsetParent;

    const win = parent.querySelector('.cl-hero__point-window');

    const winCoords = win.getBoundingClientRect();
    console.log(winCoords);

    if (winCoords.right > window.innerWidth) {
      win.style.right = `-25px`;
      win.style.left = 'auto';
      win.style.transform = 'none';
    } else if (winCoords.left < 0) {
      win.style.left = `-25px`;
      win.style.right = 'auto';
      win.style.transform = 'none';
    }

    win.classList.add('active');
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
; // HERO
