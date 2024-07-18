//implement counters for the input text area
const textareaEl = document.querySelector('.form__textarea');

const counter = () => {
    const charactersLeft = 150 - textareaEl.value.length;
    document.querySelector('.counter').textContent = charactersLeft;
};

textareaEl.addEventListener('input', counter); 


