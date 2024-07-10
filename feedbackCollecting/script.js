const textareaEl = document.querySelector('.form__textarea');

function counter() {
    const charactersLeft = 150 - textareaEl.value.length;
    document.querySelector('.counter').textContent = charactersLeft;
}
textareaEl.addEventListener('input', counter); 


