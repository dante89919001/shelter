const btnBrg = document.getElementById('btnBurger');
const brgMenu = document.getElementById('burgerMenu');
const span1 = document.getElementById('1');
const span2 = document.getElementById('2');
const span3 = document.getElementById('3');
const links = document.getElementsByClassName('burger_nav__link');
const main = document.querySelector('body');
// const intro = document.querySelector('.intro__title');
// const introText = document.querySelector('.intro__text');
// const introBtn = document.querySelector('.btn_rest');
const shadow = document.querySelector('.burger_shadow');
let count = 0;

btnBrg.addEventListener('click', function() {
    if(count === 1){
        brgMenu.classList.add('transition-burger-right');
        brgMenu.classList.remove('transition-burger-left');
        count = 0;
    } else {
        brgMenu.classList.add('transition-burger-left');
        brgMenu.classList.remove('transition-burger-right');
        count = 1;
    }
    let width = window.innerWidth;
    brgMenu.classList.toggle('active');
    // brgMenu.classList.toggle('inactive');
    span1.classList.toggle('first');
    span2.classList.toggle('middle');
    span3.classList.toggle('last');
    if ( width < 780) {
        shadow.classList.toggle('visibility');
        main.classList.toggle('scroll_hide');
        };
});
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function() {
        count = 0;
        let width = window.innerWidth;
        brgMenu.classList.remove('active');
        // brgMenu.classList.toggle('inactive');
        span1.classList.toggle('first');
        span2.classList.toggle('middle');
        span3.classList.toggle('last');
        brgMenu.classList.remove('transition-burger-left');
        brgMenu.classList.remove('transition-burger-right');
        if (width < 780) {
        shadow.classList.add('visibility');
        main.classList.remove('scroll_hide');
        };
    });
}
main.addEventListener('click', function(e) {
    if(e.target.id !== 'btnBurger' && e.target.id !== 'burgerMenu' && e.target == shadow){
        count = 0;
        let width = window.innerWidth;
        brgMenu.classList.remove('active');
        // brgMenu.classList.toggle('inactive');
        span1.classList.remove('first');
        span2.classList.remove('middle');
        span3.classList.remove('last');
        brgMenu.classList.remove('transition-burger-left');
        brgMenu.classList.remove('transition-burger-right');
        if (width < 780){
            shadow.classList.add('visibility');
            main.classList.remove('scroll_hide');
            };
    };
});



