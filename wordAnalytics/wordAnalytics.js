const textareaEl = document.querySelector('.textarea');
const wordsNumberEl = document.querySelector('.stat__number--words');
const charactersNumberEl = document.querySelector('.stat__number--characters');
const twitterNumberEl = document.querySelector('.stat__number--twitter');
const threadNumberEl = document.querySelector('.stat__number--threads');

function characterNumberCounting() {
    if (textareaEl.value.includes('script')) {
        alert('Please remove the script element, you cannot use that here.');
        textareaEl.value = textareaEl.value.replace('<script>', '[Wrong input]');
    }

    const numberOfCharacters = textareaEl.value.length;
    charactersNumberEl.textContent = numberOfCharacters;

    const twitterCharactersLeft = 30 - numberOfCharacters;
    twitterNumberEl.textContent = twitterCharactersLeft;
    if (twitterCharactersLeft < 0) {
        twitterNumberEl.classList.add('stat__number--limit');
    } else {
        twitterNumberEl.classList.remove('stat__number--limit');
    };

    const threadsCharactersLeft = 1000 - numberOfCharacters;
    threadNumberEl.textContent = threadsCharactersLeft;
    if (threadsCharactersLeft < 0) {
        threadNumberEl.classList.add('stat__number--limit');
    } else {
        threadNumberEl.classList.remove('stat__number--limit');
    }

    let numberOfWords = textareaEl.value.split(' ').length;
    if (textareaEl.value.length === 0) {
        numberOfWords = 0;
    }
    wordsNumberEl.textContent = numberOfWords;
}

textareaEl.addEventListener('input', characterNumberCounting);
