import '/src/scss/style.scss';

// переключение языков
let translations = {};
let currentLang = "ru";

const items = document.querySelectorAll('.mainmenu__lang-item');

async function loadLanguage(lang) {
  const res = await fetch(`./src/locales/${lang}.json`);
  translations = await res.json();
  currentLang = lang;

  applyTranslations();
  localStorage.setItem("lang", lang);
}

function applyTranslations() {
  for (const key in translations) {
    document.querySelectorAll(`.${key}`).forEach(el => {
      el.textContent = translations[key];
    });
  }
}

const savedLang = localStorage.getItem("lang") || "ru";
loadLanguage(savedLang);

document.addEventListener("click", e => {
  if (e.target.matches(".mainmenu__lang-item_UA")) {
    for (let i of items) {
      i.classList.remove('mainmenu__lang-item_active');
    }
    e.target.classList.add('mainmenu__lang-item_active');
    loadLanguage("ua");
  }
});
document.addEventListener("click", e => {
  if (e.target.matches(".mainmenu__lang-item_RU")) {
    for (let i of items) {
      i.classList.remove('mainmenu__lang-item_active');
    }
    e.target.classList.add('mainmenu__lang-item_active');
    loadLanguage("ru");
  }
});
document.addEventListener("click", e => {
  if (e.target.matches(".mainmenu__lang-item_EN")) {
    for (let i of items) {
      i.classList.remove('mainmenu__lang-item_active');
    }
    e.target.classList.add('mainmenu__lang-item_active');
    loadLanguage("en");
  }
});

// гамбургер-меню
const overlay = document.querySelector('.overlay'),
  mainmenu__body = document.querySelector('.mainmenu__body'),
  hamburger = document.querySelector('.mainmenu__hamburger-block');

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

// главное меню
const mainMenu = document.querySelectorAll('.mainmenu__list_item');

mainMenu.forEach(item => {
  item.addEventListener('click', (item) => {
    mainMenu.forEach(it => {
      it.classList.remove('mainmenu__list_item-active');
    });
    item.target.classList.add('mainmenu__list_item-active');
  });
});

// слайдер на главной странице (promo)
