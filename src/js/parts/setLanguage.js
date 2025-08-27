function setLang() {
    let translations = {};
    let currentLang = "ru";

    const items = document.querySelectorAll('.mainmenu__lang-item');

    async function loadLanguage(lang) {
        const res = await fetch(`/src/locales/${lang}.json`); // считівем нужный файл локализации
        translations = await res.json();
        currentLang = lang;

        applyTranslations();
        localStorage.setItem("lang", lang);   // сохраняем в сессионной переменной для считывания при переходе между страницами
        // прорисовка активного кружочка вібора язіка
        items.forEach(it => {
            if (it.innerText.toLowerCase() == lang) {
                items.forEach(i => { i.classList.remove('mainmenu__lang-item_active') });
                it.classList.add('mainmenu__lang-item_active');
            }
        });
    }

    function applyTranslations() {
        for (const key in translations) {
            document.querySelectorAll(`.${key}`).forEach(el => {
                el.innerHTML = translations[key];
            });
        }
    }

    const savedLang = localStorage.getItem("lang") || "ru";
    loadLanguage(savedLang);

    // реакция на выбор языка пользователем
    items.forEach((item, i) => {
        item.addEventListener('click', i => {
            const langSet = item.innerText.toLowerCase();
            
            loadLanguage(langSet);
        });
    });
};

export { setLang };