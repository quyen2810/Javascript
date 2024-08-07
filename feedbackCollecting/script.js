// -- GLOBAL --
const MAX_CHARS = 150;

const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks');
const submitBtnEl = document.querySelector('.submit-btn');
const spinnerEl = document.querySelector('.spinner');

const renderFeedbackItem = feedbackItem => {
    // new feedback item HTML
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
            <p class="feedback__date">${feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`}</p>
        </li>
    `;

    // insert new feedback item in list
    feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);
};


// -- COUNTER COMPONENT --
const inputHandler = () => {
    // determine maximum number of characters
    const maxNrChars = MAX_CHARS;

    // determine number of characters currently typed
    const nrCharsTyped = textareaEl.value.length;

    // calculate number of characters left (maximum minus currently typed)
    const charsLeft = maxNrChars - nrCharsTyped;

    // show number of characters left
    counterEl.textContent = charsLeft;
};

textareaEl.addEventListener('input', inputHandler);


// -- FORM COMPONENT --
const showVisualIndicator = textCheck => {
    const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid';

    // show valid indicator
    formEl.classList.add(className);

    // remove visual indicator
    setTimeout(() => {
        formEl.classList.remove(className);
    }, 2000);
};

const submitHandler = event => {
    // prevent default browser action (submitting form data to 'action'-address and refreshing page)
    event.preventDefault();

    // get text from textarea
    const text = textareaEl.value;
    
    // validate text (e.g. check if #hashtag is present and text is long enough)
    if (text.includes('#') && text.length >= 5) {
        showVisualIndicator('valid');
    } else {
        showVisualIndicator('invalid');

        // focus textarea
        textareaEl.focus();

        // stop this function execution
        return;
    }

    // we have text, now extract other info from text
    const hashtag = text.split(' ').find(word => word.includes('#'));
    const company = hashtag.substring(1);
    const badgeLetter = company.substring(0, 1).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0;

    // create feedback item object
    const feedbackItem = {
        upvoteCount: upvoteCount,
        company: company,
        badgeLetter: badgeLetter,
        daysAgo: daysAgo,
        text: text
    };

    // render feedback item
    renderFeedbackItem(feedbackItem);

    // clear textarea
    textareaEl.value = '';

    // blur submit button
    submitBtnEl.blur();

    // reset counter
    counterEl.textContent = MAX_CHARS;
};

formEl.addEventListener('submit', submitHandler);


// -- FEEDBACK LIST COMPONENT --
fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
    .then(response => response.json())
    .then(data => {
       // iterate over each element in feedbacks array and render it in list
        data.feedbacks.forEach(feedbackItem => renderFeedbackItem(feedbackItem));
    })
    .catch(error => {
        feedbackListEl.textContent = `Failed to fetch feedback items. Error message: ${error.message}`;
    });

//add click event to the feedback item
feedbackListEl.addEventListener('click', clickHandler = event => {
    if (event.target.classList.contains('upvote')) {
        //get upvote count
        const upvoteEl = event.target;
        const upvoteCountEl = upvoteEl.querySelector('.upvote__count');
        const count = Number(upvoteCountEl.textContent);
        upvoteCountEl.textContent = count + 1;
    } else {
        //expand the feedback item
        const feedbackEl = event.target.closest('.feedback');
        feedbackEl.classList.toggle('feedback--expand');
    }
    console.log(event);
});

//add hashtag filter component
const hashtagListEl = document.querySelector('.hashtags');
hashtagListEl.addEventListener('click', clickHandler2 = event2 => {
    const clickedEl = event2.target;
    //stop function if clicking outside of those company hashtag buttons
    if (!clickedEl.classList.contains('hashtag')) return;
    //extract the company to init filtering for feedback items
    const companyNameFromHashtag = clickedEl.textContent.substring(1).toLowerCase().trim();
    feedbackListEl.childNodes.forEach(childNode => {
        //stop function if it's a text node
        if (childNode.nodeType === 3) return;
        const companyNameFromFeedback = childNode.querySelector('.feedback__company').textContent.toLowerCase().trim();
        if (companyNameFromHashtag !== companyNameFromFeedback) {
            childNode.remove();
    }
    });
});