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
    //console.log(text);
    //show valid indicator
    if (text.includes('#') && text.length >= 5) {
        formEl.classList.add('form--valid');
        //hide it after 2s
        const removeValid = () => {
            formEl.classList.remove('form--valid');
        };
        setTimeout(removeValid,2000);
    } else {
        //show invalid indicator
        formEl.classList.add('form--invalid');
        //hide it after 2s
        const remove = () => {
            formEl.classList.remove('form--invalid');
        };
        setTimeout(remove,2000);
    }

};

formEl.addEventListener('submit', submitHandler);
