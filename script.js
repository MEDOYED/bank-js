'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(button =>
  button.addEventListener('click', openModalWindow)
);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});

// прокручування сторінки

btnScrollTo.addEventListener('click', function (e) {
  // FIRST METHOD
  // const section1Coords = section1.getBoundingClientRect();
  // console.log(section1Coords);

  // window.scrollTo({
  //   left: section1Coords.left + window.scrollX,
  //   top: section1Coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// smooth page naviganion  #bad way

// document.querySelectorAll('.nav__link').forEach(function (htmlElement) {
//   htmlElement.addEventListener('click', function (e) {
//     e.preventDefault();
//     const href = this.getAttribute('href');
//     document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
//     console.log(href);
//   });
// });

// smooth page naviganion
// Додаєм event listener для ЗАГАЛЬНОГО батьківського елемента
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //опридиляем target element
  console.log(e.target); //<a class="nav__link" href="#section--1">Услуги</a>  --> при натисканні на першу силку
  if (e.target.closest('.nav__link')) {
    const href = e.target.getAttribute('href');
    console.log(href);
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabs -- вкладки
tabContainer.addEventListener('click', function (e) {
  const clickedButton = e.target.closest('.operations__tab');
  // Guard clause - Пункт охраны
  if (!clickedButton) return;

  // Активная вкладка
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedButton.classList.add('operations__tab--active');

  // Активный контент
  tabContents.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
    .classList.add('operations__content--active');
});

// АНІМАЦІЯ ПРИТУСКНІННЯ НА ПАНЕЛІ НАВІГАЦІЇ
const navLinksHoverAnimation = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const linkOver = e.target;
    const siblingLinks = linkOver
      .closest('.nav__links')
      .querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('img');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');

    siblingLinks.forEach(el => {
      if (el != linkOver) {
        el.style.opacity = opacity;
      }
      logo.style.opacity = opacity;
      logoText.style.opacity = opacity;
    });
  }
};

nav.addEventListener('mouseover', function (e) {
  navLinksHoverAnimation(e, 0.4);
});

nav.addEventListener('mouseout', function (e) {
  navLinksHoverAnimation(e, 1);
});

//attaching a header at the top of the page

// const section1Coords = section1.getBoundingClientRect();
// console.log(section1Coords);

// window.addEventListener('scroll', function () {
//   if (window.scrollY > section1Coords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

//attaching a header at the top of the page -- Intersection Observer API (наблюдатель пересечения API)

const header = document.querySelector('.header');

const navHeight = nav.getBoundingClientRect().height;

const getStickyNav = function (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(getStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Плавне поява секцій на сайті при прокручуванні

const allSections = document.querySelectorAll('.section');

const appearenceSection = function (entries, observer) {
  const entry = entries[0];
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(appearenceSection, {
  root: null,
  threshold: 0.25,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// lazy loading для зображень
const lazyImages = document.querySelectorAll('img[data-src]');

const loadImages = function (entries, observer) {
  const entry = entries[0];
  console.log(entry);

  if (!entry.isIntersecting) return;

  // Заміняєм погане зображення на зображення з високою якістю

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const lazyImagesObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0.7,
  // rootMargin: '400px',
});

lazyImages.forEach(image => lazyImagesObserver.observe(image));

// Створення слайдера

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const slidesNumber = slides.length;

const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};

createDots();

const activateCurrentDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const activateCurrentSlide = function (currentSlide) {
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`)
  );
};

activateCurrentSlide(0);

activateCurrentDot(0);

const nextSlide = function () {
  if (currentSlide === slidesNumber - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  // пересування до наступного слайду
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`)
  );

  activateCurrentDot(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slidesNumber - 1;
  } else {
    currentSlide--;
  }

  // пересування до попередньго слайду (томущо currentSlide-- '2 строчки зверху')
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`)
  );

  activateCurrentDot(currentSlide);
};

btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') previousSlide();
});

// клік по точках слайдера
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    slides.forEach(
      (s, index) =>
        (s.style.transform = `translateX(${(index - slide) * 100}%)`)
    );
    activateCurrentDot(slide);
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const message = document.createElement('div');
// message.classList.add('cookie-message');

// message.innerHTML =
//   'Ми используем cookie на етом сайте для улутшения функциональности. <button class="btn btn--close-cookie">Ok!</button>';

// const header = document.querySelector('.header');
// header.append(message);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// // style

// message.style.backgroundColor = '#076785';
// message.style.width = '120%';
// console.log(getComputedStyle(message));
// console.log('dd');
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 50 + 'px';

// // classes
// const logo = document.querySelector('.nav__logo');

// logo.classList.add('a', 'b');
// logo.classList.remove('a', 'b');
// logo.classList.toggle('a');
// logo.classList.contains('a');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// event propagination
// rgb (123, 56, 78)

// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * max - min + 1) + min;
// }

// const getRandomColor = () =>
//   `rgb(${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(
//     0,
//     255
//   )}, ${getRandomIntInclusive(0, 255)})`;

// console.log(getRandomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = getRandomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   console.log('click the link');
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   console.log('click the link');
// });

// При закриванні сторінки вспливає попап чи тоно я хочу закрити сторінку

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});
