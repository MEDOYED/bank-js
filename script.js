'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);

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

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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
