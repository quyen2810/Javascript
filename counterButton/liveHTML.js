const increaseButtonEl = document.querySelector('.counter__button--increase');
const counterValueEl = document.querySelector('.counter__value');
const decreaseButtonEl = document.querySelector('.counter__button--decrease');
const resetButtonEl = document.querySelector('.counter__reset-button');

function incrementCounter() {
    const currentValue = counterValueEl.textContent;
    const currentValueAsNumber = +currentValue;
    let newValue = currentValueAsNumber + 1;
    if (newValue >= 10) {
        console.log('The input is too large!');
        newValue = '!';
    }
    counterValueEl.textContent = newValue;
}

increaseButtonEl.addEventListener('click', incrementCounter);

decreaseButtonEl.addEventListener('click', function () {
    const currentValue = counterValueEl.textContent;
    const currentValueAsNumber = +currentValue;
    let newValue = currentValueAsNumber - 1;
    if (newValue < 0) {
        newValue = 'N/A';
        console.log('The input is smaller than 0, unaccepted!');

    }
    counterValueEl.textContent = newValue;
})

resetButtonEl.addEventListener('click', function () {
    counterValueEl.textContent = 0;
})

document.addEventListener('keydown', incrementCounter);