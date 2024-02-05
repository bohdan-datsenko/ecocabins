function sortSlides(items, i) {
    for (let j = 0; j < items.length; j++) {
        if (j === i) {
            items[j].style.left = 0;
            items[j].classList.add('active');
            actualItem = j;
        } else if (j < i) {
            items[j].style.left = '-325px';
            items[j].classList.remove('active');
        } else if (j > i) {
            items[j].style.left = '325px';
            items[j].classList.remove('active');
        }
    }
}

function addSwipeHandling(element, items) {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    let gestureZone = element;

    let startTime;
    let endTime;

    gestureZone.addEventListener('touchstart', (event) => {
        startTime = Date.now();

        touchStartX = event.touches[0].screenX;
        touchStartY = event.touches[0].screenY;
    });
    gestureZone.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].screenX;
        touchEndY = e.touches[0].screenY;
    })
    gestureZone.addEventListener('touchend', () => {
        let isLeftBorder = actualItem !== items.length - 1;
        let isRightBorder = actualItem !== 0;

        endTime = Date.now()
        const timeDiff = endTime - startTime;

        if(timeDiff > 150 && timeDiff < 500) {
            if ((touchStartX - touchEndX > 70) && isLeftBorder) {
                sortSlides(items, actualItem + 1);
            } else if ((touchStartX - touchEndX < -70) && isRightBorder) {
                sortSlides(items, actualItem - 1);
            }
        }
    });
}

function createControl (items, controlContainer) {
    let controls = [];

    for (let i = 0; i < items.length; i++) {
        let button = document.createElement('button');
        button.classList.add('slider-control__btn');
        button.onclick = () => {
            sortSlides(items, i);
        }

        controls.push(button);
    }

    controlContainer.append(...controls);
}

/* add slider controls */
const slider = document.getElementById('slider');
const controlContainer = slider.getElementsByClassName('slider-control')[0];
const sliderItems = slider.getElementsByClassName('slider__item');
const sliderItemsContainer = slider.getElementsByClassName('slider-items')[0];
let actualItem = 0;

createControl(sliderItems, controlContainer);
addSwipeHandling(sliderItemsContainer, sliderItems);
/************************/

/* add burger menu handling */
const burgerTouch = document.getElementById('burgerTouch');
const mobileMenu = document.getElementById('burgerMenu');
const mobileMenuBackdrop = document.getElementById('burgerMenuBackdrop');

mobileMenuBackdrop.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('lock');
});

burgerTouch.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('lock');
});
/****************************/