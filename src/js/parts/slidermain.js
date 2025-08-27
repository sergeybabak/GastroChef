function slider() {
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
}

export { slider };