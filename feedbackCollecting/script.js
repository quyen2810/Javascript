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
        setTimeout(removeValid, 2000);
    } else {
        //show invalid indicator
        formEl.classList.add('form--invalid');
        //hide it after 2s
        const remove = () => {
            formEl.classList.remove('form--invalid');
        };
        setTimeout(remove, 2000);
        //focus on text area again to fix the invalid
        textareaEl.focus();
        //stop executing when it's invalid, return nothing = stop
        return;
    }
    //add the input valid text to the list, extract info from submit text
    const hashtag = text.split(' ').find(word => word.includes('#'));
    //console.log(text.split(' ').find(word => word.includes('#')));
    // remove the has from hashtag
    const company = hashtag.substring(1);
    // take the 1st character
    const badgeLetter = company.substring(0, 1).touppercase();
    const upvoteCount = 0;
    const daysAgo = 0;

    //create new html for new feedback
    const feedbackItemHTML = `
        <li class="feedback">
         <button class="upvote">
             <i class="fa-solid fa-caret-up upvote__icon"></i>
            <span class="upvote__count">${upvoteCount}</span>
        </button>
        <section class="feedback__badge">
             <p class="feedback__letter">${badgeLetter}</p>
         </section>
         <div class="feedback__content">
            <p class="feedback__company">${company}</p>
             <p class="feedback__text">${text}</p>
        </div>
        <p class="feedback__date">${daysAgo}</p>
        </li>
    `;
    
};

formEl.addEventListener('submit', submitHandler);
