//global definition
const MAX_CHARS = 150;
const BASE_API_URL = 'https://bytegrad.com/course-assets/js/1/api/feedbacks';

const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const maxNumberChars = MAX_CHARS;
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks');
const submitBtnEl = document.querySelector('.submit-btn');

//implement counter component for the input text area
const counter = () => {
    const charactersLeft = maxNumberChars - textareaEl.value.length;
    counterEl.textContent = charactersLeft;
};
counter();
textareaEl.addEventListener('input', counter);

//implement submit component
const showValidIndicator = (textCheck) => {
    const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid';
    formEl.classList.add(className);
    //hide it after 2s
    const removeValid = () => {
        formEl.classList.remove(className);
    };
    setTimeout(removeValid, 2000);
}
const submitHandler = event => {
    //remove default event from browser
    event.preventDefault();

    //get content from text area
    const text = textareaEl.value;

    //show valid indicator
    if (text.includes('#') && text.length >= 5) {
        showValidIndicator('valid');
    } else {
        showValidIndicator('invalid');

        //focus on text area again to fix the invalid
        textareaEl.focus();

        //stop executing when it's invalid, return nothing = stop
        return;
    }
    //add the input valid text to the list, extract info from submit text
    const hashtag = text.split(' ').find(word => word.includes('#'));

    // remove the has from hashtag
    const company = hashtag.substring(1);

    // take the 1st character
    const badgeLetter = company.substring(0, 1).toUpperCase();
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
        <p class="feedback__date">${daysAgo === 0 ? 'NEW' : `${daysAgo}d`}</p>
        </li>
    `;
    //show new feedback item in the list
    feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);

    //send feedback item to server
    fetch(`${BASE_API_URL}`, {
        method: 'POST',
        body: JSON.stringify(feedbackItemHTML),
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            console.log('Failed to send feedback');
            return;
        } else {
            console.log('Feedback sent');
        }
        return response.json();
    }).catch(error => {
        console.log(error);
    });

    //clear text, lose focus = blur on submit button, let the counter back to 150
    textareaEl.value = '';
    submitBtnEl.blur();
    counterEl.textContent = MAX_CHARS;
};

formEl.addEventListener('submit', submitHandler);

//add the feedback list under the submission form
//convert the data from JSON to Javascript
fetch(`${BASE_API_URL}`).then(response => {
    return response.json();
}).then(data => {
    //looping over the array 
    data.feedbacks.forEach(feedbackItem => {
         //create new html for new feedback
        const daysAgo = 0; //TODO: investigate why I have to define this only variable again
        const feedbackItemHTML = `
            <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${feedbackItem.upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${feedbackItem.company}</p>
                <p class="feedback__text">${feedbackItem.text}</p>
            </div>
            <p class="feedback__date">${feedbackItem.daysAgo === 0 ? 'NEW' : `${daysAgo}d`}</p>
            </li>
        `;
        //show new feedback item in the list
        feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);
    });
})
.catch(error => {
    feedbackListEl.textContent = `Failed to fetch feedbacks. Error message: ${error.message}`;
});

