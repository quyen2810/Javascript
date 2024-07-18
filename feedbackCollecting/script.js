//implement counter component for the input text area
const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const maxNumberChars = 150;

const counter = () => {
    const charactersLeft = maxNumberChars - textareaEl.value.length;
    counterEl.textContent = charactersLeft;
};
counter ();
textareaEl.addEventListener('input', counter); 


