function putOrder() {
    const overlay = document.querySelector('.overlay');
    
    /// модальная форма заказа
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
}

function accordion() {
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
}

export { putOrder, accordion };