import '/src/scss/style.scss';
import data from './json/diets.json' assert { type: 'json' };

document.addEventListener("DOMContentLoaded", () => {

  const page = window.location.pathname; // какая страница сейчас загружается

  const orderBtn = document.querySelector('.order__btn_order'), // кнопка вызова модальной формы заказа
    modelWin = document.querySelector('.modalorder'),
    orderClose = document.querySelector('.modalorder_close'),
    sendButton = document.querySelector('.modalorder_btn'),
    sendForm = modelWin.querySelector('form'),
    inputCombo = document.querySelectorAll('.modalorder_combo'),
    inputList = document.querySelectorAll('.modalorder_combo>ul'),
    mandatory = document.querySelectorAll('.modalorder_mand'), // валидируемые поля
    err = document.querySelector('.modalorder_error'),
    thanks = document.querySelector('.modalthanks');

  const programs = document.querySelectorAll('.diets__programs-btn'),
    dietstab = document.querySelector('.diets__tabs'),
    dietstabs = document.querySelectorAll('.diets__tabs-item'),
    dietsweek = document.querySelectorAll('.diets__week span');
  var dietspoint = 1;

  const leftMenu = document.querySelectorAll('.left__menu a');

  function setDiets(n, i = 0) {
    let tmp_value = '';
    // переключаем программы
    if ((dietspoint < 10 && n >= 10) || (dietspoint >= 10 && n < 10)) {
      programs[0].classList.toggle('diets__programs-active');
      programs[1].classList.toggle('diets__programs-active');
      dietstab.classList.toggle('diets__tabs-special');
    }
    // переключаем табы
    if (dietspoint != n) {
      // активность таба диеты
      dietstabs.forEach(it => it.classList.remove('diets__tabs-item-active'));
      dietstabs[n - 1].classList.add('diets__tabs-item-active');

      for (const [key, value] of Object.entries(data[n])) {
        const k = `${key}`
        if (k != 'diets__menu') {
          document.querySelector('.' + k).innerHTML = `${value}`;
        }
      }
    }
    // переключаем дни недели
    dietsweek.forEach(it => it.classList.remove('diets__week-active'));
    dietsweek[i].classList.add('diets__week-active');

    for (let m in data[n].diets__menu[i]) {
      tmp_value += data[n].diets__menu[i][m];
    }
    document.querySelector('.diets__menu').innerHTML = tmp_value;

    dietspoint = n;
  }

  // переход на нужное место в диетах при переходе между страницами
  const td = sessionStorage.getItem('targetDiet');
  if (td && page == '/index.html') {
    leftMenu[td].click();

    switch (td) {
      case '0':
        setDiets(1); break;
      case '1':
        setDiets(9); break;
      case '2':
        setDiets(8); break;
      case '3':
        setDiets(11); break;
      case '4':
        setDiets(12, 0); break;
    }
  }
  sessionStorage.removeItem('targetDiet');

  //// включаем возможность transition
  window.addEventListener('load', () => {
    if (document.body.classList.contains('preload')) document.body.classList.remove('preload');
  });

  //// переключение языков
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
        // el.textContent = translations[key];
        el.innerHTML = translations[key];
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

  //// гамбургер-меню
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

  //// messenger
  const messenger = document.querySelector('.messenger__central'),
    box = document.querySelector('.messenger__box'),
    svg = document.querySelector('.messenger__central svg');

  messenger.addEventListener('click', (i) => {
    svg.style.transition = messenger.classList.contains('messenger__central-active') ? 'all 4s' : 'all .5s';
    box.classList.toggle('messenger__box-active');
    messenger.classList.toggle('messenger__central-active');
  });

  //// стрелочка для прокрутки экрана в начало
  const scrollToTopBtn = document.querySelector('.totop');

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

  //// главное меню
  const mainMenu = document.querySelectorAll('.mainmenu__list_item');

  mainMenu.forEach(item => {
    item.classList.remove('mainmenu__list_item-active');
  });
  // подсвечивается в зависимости от открытой страницы
  if (page == '/about.html') mainMenu[3].classList.add('mainmenu__list_item-active')
  else if (page == '/index.html') mainMenu[0].classList.add('mainmenu__list_item-active');

  //// левое меню
  leftMenu.forEach((it, i) => {
    it.addEventListener('click', () => {
      if (page != '/index.html') {
        sessionStorage.setItem('targetDiet', i);
        window.location.href = 'index.html';
      }
      switch (i) {
        case 0:
          setDiets(1); break;
        case 1:
          setDiets(9); break;
        case 2:
          setDiets(8); break;
        case 3:
          setDiets(11); break;
        case 4:
          setDiets(12, 0); break;
      }
    });
  });

  // только главная страница!
  if (page == '/index.html') {
    //// слайдер на главной странице (promo)
    const leftarrow = document.querySelector('.promo__navigator-left'),
      rightarrow = document.querySelector('.promo__navigator-right'),
      rings = document.querySelectorAll('.promo__navigator-ring'),
      text = document.querySelectorAll('.promo__descr'),
      img = document.querySelectorAll('.promo__img'),
      count = text.length;
    let num = 1;

    function nextElement(direction) {
      if (direction == 'left') {
        num = (num + count - 2) % count + 1;
      } else {
        num = num % count + 1;
      }
    }
    // задержка на ms милисекунд
    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    // функция собственно управлением слайдером - убирание и показ слайдов слева и справа
    async function run(direction) {
      let numActive = num - 1; // порядок активного сейчас элемента карусели

      if (typeof direction != 'number') { nextElement(direction); } else { num = direction; }

      text[numActive].style.opacity = 0; // обесцвечиваем текущий элемент (текст слева)
      img[numActive].classList.remove('promo__img-active');

      setTimeout(() => {
        img[num - 1].classList.add('promo__img-active');
      }, 200);
      await delay(1000);

      rings[numActive].classList.remove('promo__navigator-ring-active');
      rings[num - 1].classList.add('promo__navigator-ring-active');

      text[numActive].classList.remove('promo__descr-active');
      text[num - 1].classList.add('promo__descr-active');
      await delay(1000);

      text[numActive].removeAttribute('style');
    }

    rightarrow.addEventListener('click', () => {
      run('right');
    });

    leftarrow.addEventListener('click', () => {
      run('left');
    });

    rings.forEach((item, i) => {
      item.addEventListener('click', () => {
        run(i + 1);
      })
    });

    //// main - tabs
    programs.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        i ? setDiets(10, 0) : setDiets(1, 0);
      });
    });

    dietstabs.forEach((item, i) => {
      item.addEventListener('click', () => {
        setDiets(i + 1, 0);
      });
    });


    dietsweek.forEach((cn, i) => {
      cn.addEventListener('click', () => {
        setDiets(dietspoint, i);
      })
    });
  }

  // order  на двух страницах сайта
  if (page == '/index.html' || page == '/about.html') {
    /// модальная форма заказа
    // const orderBtn = document.querySelector('.order__btn_order'), // кнопка вызова модальной формы заказа
    //   modelWin = document.querySelector('.modalorder'),
    //   orderClose = document.querySelector('.modalorder_close'),
    //   sendButton = document.querySelector('.modalorder_btn'),
    //   sendForm = modelWin.querySelector('form'),
    //   inputCombo = document.querySelectorAll('.modalorder_combo'),
    //   inputList = document.querySelectorAll('.modalorder_combo>ul'),
    //   mandatory = document.querySelectorAll('.modalorder_mand'), // валидируемые поля
    //   err = document.querySelector('.modalorder_error'),
    //   thanks = document.querySelector('.modalthanks');

    function closeOrder() {
      overlay.classList.toggle('not-visible');
      overlay.classList.toggle('is-visible');

      modelWin.classList.toggle('not-display');
      modelWin.classList.toggle('is-display');

      document.body.classList.remove('modal-open');
    }
    // открытие формы заказа
    orderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sendForm.reset();
      mandatory.forEach(it => { it.classList.remove('modalorder_mand-active'); });
      err.classList.add('not-visible');
      overlay.classList.toggle('not-visible');
      overlay.classList.toggle('is-visible');

      document.body.classList.add('modal-open'); // запрет прокрутки основного окна

      modelWin.classList.toggle('not-display');
      modelWin.classList.toggle('is-display');
    });
    // клик на коестике (закрытие формы)
    orderClose.addEventListener('click', () => {
      closeOrder();
    });

    // comboBox-ы
    let flagSend = true; // флаг отправки формы

    inputCombo.forEach((item, i) => {
      item.addEventListener('click', (e) => {
        item.classList.toggle('modalorder_combo-active');
      });
    });
    // выбор в комбобоксе
    inputList.forEach((item, i) => {
      item.addEventListener('click', (e) => {
        inputCombo[i].querySelector('button span').innerText = e.target.innerText;
        inputCombo[i].querySelector('input').value = e.target.innerText;
        mandatory[i + 2].classList.remove('modalorder_mand-active'); // убираем признак ошибки
      });
    });
    // валидация
    sendForm.addEventListener('submit', e => {
      if (flagSend) {
        const formData = new FormData(sendForm);
        console.log([...formData]); // выводим в консоль отправляемые данные
      };
      e.preventDefault(); // отменяем подстановку данных формы в адресную строку браузера
    });

    const inputCond = document.querySelector('.modalorder_form .order__conditions'); // кнопка радио по договору

    sendButton.addEventListener('click', () => {
      flagSend = true;
      console.log(inputCond);
      mandatory.forEach(m => {
        const m_input = m.querySelector('input');
        m_input.addEventListener('input', () => { // если что-то вводится в input, убираем ошибку
          m.classList.remove('modalorder_mand-active');
        });
        if ((!m_input.validity.valid) || (!m_input.value)) {
          m.classList.add('modalorder_mand-active');
          flagSend = false;
        }
        if (!inputCond.querySelector('input').validity.valid) inputCond.classList.add('order__conditions_error');
      });

      if (modelWin.querySelector('form').checkValidity() && flagSend) {
        modelWin.classList.toggle('not-display');
        modelWin.classList.toggle('is-display');
        thanks.classList.remove('not-display');
        thanks.classList.add('is-display');
      } else {
        err.classList.remove('not-visible');
      }
    });
    // окно "Спасибо за заказ!"
    thanks.querySelector('a').addEventListener('click', () => {
      overlay.classList.toggle('not-visible');
      overlay.classList.toggle('is-visible');
      thanks.classList.remove('is-display');
      thanks.classList.add('not-display');
      document.body.classList.remove('modal-open');
    });

    // валидация input в order
    const order_btn = document.querySelector('.order__btn_phone'),
      input_name = document.querySelector('.order__input_name'),
      input_phone = document.querySelector('.order__input_phone'),
      input_condition = document.querySelector('.order__conditions'),
      input_name_input = input_name.querySelector('input'),
      input_phone_input = input_phone.querySelector('input'),
      input_condition_input = input_condition.querySelector('input');

    order_btn.addEventListener('click', (e) => {
      // input_name.classList.toggle('input-error');
      e.preventDefault();
      if (!input_name_input.validity.valid) {
        input_name.classList.add('input-error');
      }
      if (!input_phone_input.validity.valid) {
        input_phone.classList.add('input-error');
      }
      if (!input_condition_input.validity.valid) {
        input_condition.classList.add('input-error');
      }
      input_name_input.addEventListener('input', () => {
        input_name.classList.remove('input-error');
      })
      input_phone_input.addEventListener('input', () => {
        input_phone.classList.remove('input-error');
      })
      input_condition_input.addEventListener('input', () => {
        input_condition.classList.remove('input-error');
      })
      // input_name.classList.toggle('input-error', input_name.validity.valid);
    });

    //// аккордеон в order
    const order__question = document.querySelectorAll('.order__question'),
      order__rightbox = document.querySelector('.order__rightbox');
    let point = 99;

    order__question.forEach((item, i) => {
      item.addEventListener('click', (it) => {
        order__question.forEach(it => { it.classList.remove('order__question-active') });

        item.classList.toggle('order__question-active', i != point);
        point = i;
      })
    });
    // если клик был по order вне аккордеона (order__rightbox), то аккордеон сворачивается
    document.querySelector('.order').addEventListener('click', (e) => {
      if (!order__rightbox.contains(e.target))
        order__question.forEach(it => { it.classList.remove('order__question-active') });
    });

    //// показываем договор
    const modal_agr = document.querySelector('.modal__agr'),
      agr_link = document.querySelectorAll('.terms');

    agr_link.forEach(link => {
      link.addEventListener('click', () => {
        overlay.classList.toggle('not-visible');
        overlay.classList.toggle('is-visible');

        document.body.classList.add('modal-open'); // запрет прокрутки основного окна

        setTimeout(() => {
          modal_agr.classList.toggle('not-display');
          modal_agr.classList.toggle('is-display');
        }, 1000);
      })
    })

    document.querySelector('.modal__agr-close').addEventListener('click', () => {
      overlay.classList.toggle('not-visible');
      overlay.classList.toggle('is-visible');

      modal_agr.classList.toggle('not-display');
      modal_agr.classList.toggle('is-display');

      document.body.classList.remove('modal-open');
    });
  }

});



