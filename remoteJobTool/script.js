const bookmarksBtnEl = document.querySelector('.bookmarks-btn');
const errorEl = document.querySelector('.error');
const errorTextEl = document.querySelector('.error__text');
const jobDetailsEl = document.querySelector('.job-details');
const jobDetailsContentEl = document.querySelector(".job-details__content");
const jobListBookmarksEl = document.querySelector('.job-list--bookmarks');
const jobListSearchEl = document.querySelector(".job-list--search");
const numberEl = document.querySelector(".count__number");
const paginationEl = document.querySelector(".pagination");
const paginationBtnNextEl = document.querySelector(".pagination__button--next");
const paginationBtnBackEl = document.querySelector(".pagination__button--back");
const paginationNumberNextEl = document.querySelector(".pagination__number--next");
const paginationNumberBackEl = document.querySelector(".pagination__number--back");
const searchFormEl = document.querySelector(".search");
const searchInputEl = document.querySelector(".search__input");
const sortingEl = document.querySelector(".sorting");
const sortingBtnRelevantEl = document.querySelector(".sorting__button--relevant");
const sortingBtnRecentEl = document.querySelector(".sorting__button--recent");
const spinnerSearchEl = document.querySelector(".spinner--search");
const spinnerJobDetailsEl = document.querySelector(".spinner--job-details");

//Search component
const submitHandler = event => {
    //prevent default behaviour
    event.preventDefault();
    //get search text
    const searchText = searchInputEl.value;
    //validate regular expression
    const forbiddenPattern = /python/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        errorTextEl.textContent = "Please do not use Python in your search";
        errorEl.classList.add("error--visible");
        return;
    }
    };

    
searchFormEl.addEventListener('submit', submitHandler);