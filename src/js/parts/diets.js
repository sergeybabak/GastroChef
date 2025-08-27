import data from '/src/js/json/diets.json' assert { type: 'json' };

function choiceDiets(n = 1, i = 0) {
    const page = window.location.pathname;
    const leftMenu = document.querySelectorAll('.left__menu a');

    const programs = document.querySelectorAll('.diets__programs-btn'),
        dietstab = document.querySelector('.diets__tabs'),
        dietstabs = document.querySelectorAll('.diets__tabs-item'),
        dietsweek = document.querySelectorAll('.diets__week span');

    let tmp_value = '';
    
    // переключаем программы
    if (n >= 10) {
        programs[0].classList.remove('diets__programs-active');
        programs[1].classList.add('diets__programs-active');
        dietstab.classList.add('diets__tabs-special');
    } else {
        programs[1].classList.remove('diets__programs-active');
        programs[0].classList.add('diets__programs-active');
        dietstab.classList.remove('diets__tabs-special');
    }

    // переключаем табы
    dietstabs.forEach(it => it.classList.remove('diets__tabs-item-active'));
    dietstabs[n - 1].classList.add('diets__tabs-item-active');

    for (const [key, value] of Object.entries(data[n])) {
        const k = `${key}`
        if (k != 'diets__menu') {
            document.querySelector('.' + k).innerHTML = `${value}`;
        }
    }

    // переключаем дни недели
    dietsweek.forEach(it => it.classList.remove('diets__week-active'));
    dietsweek[i].classList.add('diets__week-active');

    for (let m in data[n].diets__menu[i]) {
        tmp_value += data[n].diets__menu[i][m];
    }
    document.querySelector('.diets__menu').innerHTML = tmp_value;

    sessionStorage.setItem('dietspoint', n);  // тут храним номер текущей диеты, на который только что перешли
}

// function accordion() {
//     //// аккордеон в order
//     const order__question = document.querySelectorAll('.order__question'),
//         order__rightbox = document.querySelector('.order__rightbox');
//     let point = 99;

//     order__question.forEach((item, i) => {
//         item.addEventListener('click', (it) => {
//             order__question.forEach(it => { it.classList.remove('order__question-active') });

//             item.classList.toggle('order__question-active', i != point);
//             point = i;
//         })
//     });
//     // если клик был по order вне аккордеона (order__rightbox), то аккордеон сворачивается
//     document.querySelector('.order').addEventListener('click', (e) => {
//         if (!order__rightbox.contains(e.target))
//             order__question.forEach(it => { it.classList.remove('order__question-active') });
//     });
// }

export { choiceDiets };