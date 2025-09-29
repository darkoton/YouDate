//< " CONNECTING JS COMPONENTS " >=============================================================================================================>//
@@include("./modules/imageFormat.js"); //SUPPORT WEBP

@@include("./modules/device.js"); //DEFINE DEVICE

@@include("./modules/popup.js"); //DEFINE DEVICE

//< " СКРИПТЫ " >=============================================================================================================>//

isAvif();
isWebp();
isDevice();

const swiper = new Swiper('#carouselAttention', {
  slidesPerView:6,
  spaceBetween: 24,
  navigation: {
    nextEl: '.cl-attention__next',
    prevEl: '.cl-attention__prev',
  },

  breakpoints:{
    0:{
      slidesPerView: 2,
      spaceBetween: 10,
    }, 
    576:{
      slidesPerView: 3,
      spaceBetween: 14,
    }, 
    768:{
      slidesPerView: 4,
      spaceBetween: 16,
    }, 
    992:{
      slidesPerView:5,
      spaceBetween: 20,
    },
    1200:{
      slidesPerView:6,
      spaceBetween: 24,
    }
  }
});