const textareaEl = document.querySelector('.textarea');
const wordsNumberEl = document.querySelector('.stat__number--words');
const charactersNumberEl = document.querySelector('.stat__number--characters');
const twitterNumberEl = document.querySelector('.stat__number--twitter');
const threadNumberEl = document.querySelector('.stat__number--threads');

function characterNumberCounting() {
    if (textareaEl.value.match(/\s\s+/g)) {
        textareaEl.value = textareaEl.value.replace(/\s\s+/g,'');
        //console.log(/\s\s+/g);
    }
    
    if (textareaEl.value.includes('script')) {
        alert('Please remove the script element, you cannot use that here.');
        textareaEl.value = textareaEl.value.replace('<script>', '[Wrong input]');
    }

    const numberOfCharacters = textareaEl.value.length;
    charactersNumberEl.textContent = numberOfCharacters;

    const twitterCharactersLeft = 30 - numberOfCharacters;
    twitterNumberEl.textContent = twitterCharactersLeft;

    let twitterWarningEl = document.querySelector('.twitter--warning');
    function showAndHideTwitterWarning () {
        if (twitterCharactersLeft < 0) {
            twitterWarningEl.style.display = "block";
            twitterWarningEl.style.color = "red";
        } else {
            twitterWarningEl.style.display = "none";
            twitterWarningEl.style.color = "red";
        }
    };
    showAndHideTwitterWarning ();

    if (twitterCharactersLeft < 0) {
        twitterNumberEl.classList.add('stat__number--limit');
    } else {
        twitterNumberEl.classList.remove('stat__number--limit');
    };

    const threadsCharactersLeft = 100 - numberOfCharacters;
    threadNumberEl.textContent = threadsCharactersLeft;

    let threadsWarningEl = document.querySelector('.threads--warning');
    function showAndHideThreadsWarning () {
        if (threadsCharactersLeft < 0) {
            threadsWarningEl.style.display = "block";
            threadsWarningEl.style.color = "red";
        } else {
            threadsWarningEl.style.display = "none";
            threadsWarningEl.style.color = "red";
        }
    };
    showAndHideThreadsWarning ();

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

//TODO: Make the warning in the twitter and threads cards that the number has been exceeded.