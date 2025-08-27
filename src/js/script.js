import '/src/scss/style.scss';
import { setLang } from './parts/setLanguage';
import { choiceDiets } from './parts/diets';
import { putOrder, accordion } from './parts/order';

// import data from './json/diets.json' assert { type: 'json' };

document.addEventListener("DOMContentLoaded", () => {
  // ОБЩИЙ БЛОК ДЛЯ ВСЕХ СТРАНИЦ ==============================================================================
  // const page = window.location.pathname; // какая страница сейчас загружается
  const page = document.body.dataset.page;

  const overlay = document.querySelector('.overlay'),                   // блок общего затенения страницы при вызове меню
    // гамбургер-меню
    mainmenu__body = document.querySelector('.mainmenu__body'),
    hamburger = document.querySelector('.mainmenu__hamburger-block'),
    // главное меню подсветка
    mainMenu = document.querySelectorAll('.mainmenu__list_item'),
    // стрелочка для прокрутки экрана в начало
    scrollToTopBtn = document.querySelector('.totop'),
    // левое меню
    leftMenu = document.querySelectorAll('.left__menu a'),
    dietsArray = [1, 9, 8, 11, 12];    // куда переходить по нажатию ссылки

  //// включаем возможность transition
  window.addEventListener('load', () => {
    if (document.body.classList.contains('preload')) document.body.classList.remove('preload');
  });
  // ============================================================================================

  //// главное меню
  mainMenu.forEach(item => {
    item.classList.remove('mainmenu__list_item-active');
  });

  // подсвечивается в зависимости от открытой страницы
  if (page == 'about') mainMenu[3].classList.add('mainmenu__list_item-active')
  else if (page == 'index') mainMenu[0].classList.add('mainmenu__list_item-active')
  else if (page == 'blog' || page == 'blogpage') mainMenu[4].classList.add('mainmenu__list_item-active');
  // ============================================================================================

  //// гамбургер-меню
  document.querySelector('.mainmenu__hamburger').addEventListener('click', () => {
    overlay.classList.toggle('not-visible');
    overlay.classList.toggle('is-visible');
    mainmenu__body.style.top ? mainmenu__body.removeAttribute('style') : mainmenu__body.style.top = '0px';
    if (hamburger.classList.contains('mainmenu__hamburger-active')) {
      hamburger.classList.remove('mainmenu__hamburger-active');
      hamburger.classList.add('mainmenu__hamburger-close');

      setTimeout(() => {
        hamburger.classList.remove('mainmenu__hamburger-close');
      }, 2000);
    } else {
      hamburger.classList.add('mainmenu__hamburger-active');
    }
  });
  // ============================================================================================

  //// стрелочка для прокрутки экрана в начало
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const screenHeight = window.innerHeight;

    if (scrollPosition > screenHeight * 1.5) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });
  // скролл вверх
  scrollToTopBtn.querySelector('.totop_arrow').addEventListener('click', () => {
    window.scrollTo(0, 0);
  });
  // ============================================================================================

  //// messenger
  const messenger = document.querySelector('.messenger__central'),
    box = document.querySelector('.messenger__box'),
    svg = document.querySelector('.messenger__central svg');

  messenger.addEventListener('click', (i) => {
    svg.style.transition = messenger.classList.contains('messenger__central-active') ? 'all 4s' : 'all .5s';
    box.classList.toggle('messenger__box-active');
    messenger.classList.toggle('messenger__central-active');
  });
  // ============================================================================================

  setLang();              // установка языка
  // ============================================================================================

  //// левое меню
  // choiceDiets(2,5);
  // console.log(sessionStorage.getItem('targetDiet'));
  leftMenu.forEach((it, i) => {
    it.addEventListener('click', () => {
      if (page != 'index') {
        sessionStorage.setItem('targetDiet', i);
        window.location.href = 'index.html';
      } else {
        choiceDiets(dietsArray[i]);
        // const numButton = Number(sessionStorage.getItem('targetDiet'));
        // console.log(numButton);
        // if (numButton) {
        //   leftMenu[numButton].click();
        //   choiceDiets(dietsArray[numButton]);
        //   sessionStorage.removeItem('targetDiet');
        // }
      }
    });

  });
  // ============================================================================================


  // СЛАЙДЕР И ПРОГРАММЫ ПИТАНИЯТОЛЬКО ДЛЯ ПЕРВОЙ СТРАНИЦЫ ==================================================

  if (page == 'index') {
    /// слайдер
    import('/src/js/parts/slidermain.js').then(({ slider }) => {   // динамический импорт по необходимости
      slider();
    });
    // ============================================================================================

    //// main - tabs
    const programs = document.querySelectorAll('.diets__programs-btn'),
      dietstab = document.querySelector('.diets__tabs'),
      dietstabs = document.querySelectorAll('.diets__tabs-item'),
      dietsweek = document.querySelectorAll('.diets__week span');

    const numButton = Number(sessionStorage.getItem('targetDiet'));  // если переход со страницы не index, тут хранится номер нажатой кнопки

    if (numButton) {
      leftMenu[numButton].click();         // эмулируем нажатие нужной кнопки перейдя на основную страницу
      choiceDiets(dietsArray[numButton]);  // переходим на нужную диету
      sessionStorage.removeItem('targetDiet'); // очищаем временное хранилище номера кнопки
    }

    // выбор программы
    programs.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        i ? choiceDiets(10) : choiceDiets(1);
      });
    });

    // выбор конкретной диеты
    dietstabs.forEach((item, i) => {
      item.addEventListener('click', () => {
        choiceDiets(i + 1);
      });
    });

    // выбор дня недели
    dietsweek.forEach((cn, i) => {
      cn.addEventListener('click', () => {
        choiceDiets(sessionStorage.getItem('dietspoint'), i);
      })
    });
  }

  // ФОРМА ЗАКАЗА НА СТРАНИЦАХ index и about ==================================================

  if (page == 'index' || page == 'about') {
    putOrder();
    accordion();
  }

  // СЛАЙДЕР НА СТРАНИЦЕ blog =================================================================

  if (page == 'blog') {
    import('/src/js/parts/blog.js').then(({ blog }) => {
      blog();
    });
  }

  // "ВАМ МОЖЕТ БЫТЬ ИНТЕРЕСНО" на blogpage ====================================================

  if (page == 'blogpage') {
    import('/src/js/parts/blog.js').then(({ setInterest }) => {
      setInterest();
    });
  }
});



