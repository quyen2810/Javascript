//global definition
const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const maxNumberChars = 150;
const formEl = document.querySelector('.form');

//implement counter component for the input text area
const counter = () => {
    const charactersLeft = maxNumberChars - textareaEl.value.length;
    counterEl.textContent = charactersLeft;
};
counter();
textareaEl.addEventListener('input', counter); 

//implement submit component
const submitHandler = event => {
    //remove default event from browser
    event.preventDefault();
    //console.log(event);

    //get content from text area
    const text = textareaEl.value;
    console.log(text);
};

formEl.addEventListener('submit', submitHandler);
