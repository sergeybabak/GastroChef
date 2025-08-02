function blog() {
    const navigators = document.querySelectorAll('.blog__navigator'),                           // два навигатора со стрелочками
        leftArrows = document.querySelectorAll('.blog__navigator .blog__navigator-left'),     // две стрелочки влево
        rightArrows = document.querySelectorAll('.blog__navigator .blog__navigator-right'),   // две стрелочки вправо
        itemsContent = document.querySelectorAll('.blog__box'),                               // блоки с контентом блога (страницы)
        pages = document.querySelectorAll('.blog__link');                                     // кнопки открытия конкретной страницы блога

    const countPages = 2;       // количество страниц в блоге
    let currentPage = 0;        // текущая страница

    // функция вызывается только если изменение страницы доступно, т.е. нажата правильная стрелка или неактивный кружок с цифрой
    // в ней все привязано к текущей странице (currentPage). Если функция вызвана, значит страница должна измениться
    function setPage() {
        navigators.forEach(nav => {
            nav.querySelectorAll('.blog__navigator-position').forEach((item, i) => {
                i == currentPage ? item.classList.add('blog__navigator-active') : item.classList.remove('blog__navigator-active');
            });
        });

        // если первая или последняя страница
        if (currentPage == 0) {
            leftArrows.forEach(it => {
                it.classList.add('blog__navigator-no-hover');
            });
        } else if (currentPage == (countPages - 1)) {
            rightArrows.forEach(it => {
                it.classList.add('blog__navigator-no-hover');
            });
        }
        // управление hover стрелочек
        if (currentPage > 0) {
            leftArrows.forEach(it => {
                it.classList.remove('blog__navigator-no-hover');
            });
        }
        if (currentPage < (countPages - 1)) {
            rightArrows.forEach(it => {
                it.classList.remove('blog__navigator-no-hover');
            });
        }
        // изменение контента блога
        itemsContent.forEach(item => {
            item.classList.remove('blog__box-active');
        });
        itemsContent[currentPage].classList.add('blog__box-active');
    }


    // нажатие на стрелочки влево/вправо
    navigators.forEach(nav => {
        nav.querySelector('.blog__navigator-right').addEventListener('click', () => {
            currentPage < countPages - 1 ? (currentPage++, setPage()) : currentPage;
        });
    });
    navigators.forEach(nav => {
        nav.querySelector('.blog__navigator-left').addEventListener('click', () => {
            currentPage == 0 ? currentPage : (currentPage--, setPage());
        });
    });

    // нажатие на кружочек с нoмером страницы
    navigators.forEach((nav, j) => {
        nav.querySelectorAll('.blog__navigator-position').forEach((item, i) => {
            item.addEventListener('click', () => {
                currentPage != i ? (currentPage = i, setPage()) : currentPage;
            });
        });
    });

    // выбор страницы блога
    pages.forEach((item, i) => {
        item.addEventListener('click', () => {
            sessionStorage.setItem('pageNum', i);      // на какой элемент блога нажато для просмотра деталей
        });
    });
    sessionStorage.setItem('pageCount', pages.length); // количество элементов в блоге
}

// произвольным образом заполняем блок "Вас может заинтересовать:"
// все элементы для заполнения хранятся в файле interest.json
async function setInterest() {
    const response = await fetch('/src/js/json/interest.json');
    const contentItem = await response.json(); // массив элементов для вставки в нужное место "Вас может заинтересовать"
    let pagesArray = []; // массив с возможными номерами для вставки (не текущий, который выбран пользователем)
    const notItem = sessionStorage.getItem('pageNum'), // номер текущей страницы блога, которую открыли
        couItem = sessionStorage.getItem('pageCount'); // количество элементов блога

    let blogItem = document.querySelectorAll('.blog__item');

    for (let i = 0; i < couItem; i++) {
        if (i != notItem) pagesArray.push(i); // формируем массив
    }

    for (let i = 0; i < 3; i++) {
        // выбираем проивзольное число из массива
        const randomNum = pagesArray[Math.floor(Math.random() * pagesArray.length)];
        
        // вставка контента под номером randomNum из contentItem на страницу
        const img = blogItem[i].querySelector('.blog__img');
        img.src = contentItem[randomNum].img;
        img.alt = contentItem[randomNum].alt;

        blogItem[i].querySelector('.blog__title').textContent = contentItem[randomNum].title;
        blogItem[i].querySelector('.blog__date').textContent = contentItem[randomNum].date;
        blogItem[i].querySelector('.blog__link').href = contentItem[randomNum].link;

        // удаляем из массива выбранный элемент чтобы он не попался в следующий раз
        pagesArray.splice(pagesArray.indexOf(randomNum), 1); 
    }

    sessionStorage.removeItem('pageNum', 'pageCount');
}

export { blog, setInterest };