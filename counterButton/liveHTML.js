const increaseButtonEl = document.querySelector('.counter__button--increase');
const counterValueEl = document.querySelector('.counter__value');
const decreaseButtonEl = document.querySelector('.counter__button--decrease');
const resetButtonEl = document.querySelector('.counter__reset-button');
const counterEl = document.querySelector('.counter');
const counterTitleEl = document.querySelector('.counter__title');

function incrementCounter() {
    const currentValue = counterValueEl.textContent;
    const currentValueAsNumber = +currentValue;
    let newValue = currentValueAsNumber + 1;
    if (newValue > 10) {
        newValue = 10;
        console.log('The input is too much!');
        counterEl.classList.add('counter__limit');
        counterTitleEl.innerHTML = '<b>Limit!</b> You guys have been together for too long';
        decreaseButtonEl.disabled = true;
        increaseButtonEl.disabled = true;
        increaseButtonEl.blur(); //unfocus the button
    }
    counterValueEl.textContent = newValue;
}

function decrementCounter() {
    const currentValue = counterValueEl.textContent;
    const currentValueAsNumber = +currentValue;
    let newValue = currentValueAsNumber - 1;
    if (newValue < 0) {
        newValue = 0;
        console.log('The input is smaller than 0, stay at 0!');
    }
    counterValueEl.textContent = newValue;
    decreaseButtonEl.blur(); //unfocus the button
}

increaseButtonEl.addEventListener('click', incrementCounter);
decreaseButtonEl.addEventListener('click', decrementCounter);
resetButtonEl.addEventListener('click', () => {
    counterValueEl.textContent = 0;
    counterEl.classList.remove('counter__limit');
    counterTitleEl.textContent = 'Years together';
    decreaseButtonEl.disabled = false;
    increaseButtonEl.disabled = false;
    resetButtonEl.blur(); //unfocus the button
})


document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        decrementCounter()
    } else if (event.key === 'ArrowRight') {
        incrementCounter()
    } else if (event.key === 'Dau Cach') {
        // TODO: call reset
    }

    // TODO: implement up/down 
});