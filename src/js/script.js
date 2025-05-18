import '/src/scss/style.scss';

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