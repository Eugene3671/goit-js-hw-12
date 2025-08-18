import { getImagesByQuery } from "./js/pixabay-api";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { clearGallery, createGallery, hideLoader, hideLoadMoreButton, showLoader, showLoadMoreButton } from "./js/render-functions";
import { refs } from "./js/ref";


let inputValue;
let page;
let maxPage = 0;
const PAGE_SIZE = 15;


refs.formEL.addEventListener('submit', async (e) => {
    e.preventDefault();
    inputValue = e.target.elements.searchText.value.trim();
    page = 1;
    if (inputValue === '') {
         iziToast.error({
                title: 'Enter value',
                position: 'bottomRight'
         });
        return;
    }
        hideLoadMoreButton();
    clearGallery();
    showLoader();
    try {
        const res = await getImagesByQuery(inputValue, page)
       createGallery(res.hits, 'replace');
        maxPage = Math.ceil(res.totalHits / PAGE_SIZE);
        
    } catch {
         iziToast.error({
                title: 'Error',
                position: 'bottomRight'
         });
    } finally {
        hideLoader();
        showNotification();
    checkBtnLoadMoreVisible();
    }
    e.target.reset();
})



refs.btnLoadMoreEl.addEventListener('click', async () => {
    page += 1;
            hideLoadMoreButton();
    showNotification();
    showLoader();
    try {
        const res = await getImagesByQuery(inputValue, page)
        createGallery(res.hits, 'append');

        const firstCard = document.querySelector('.photo-card');
        if (firstCard) {
            const cardHeight = firstCard.getBoundingClientRect().height;
            window.scrollBy({
                top: cardHeight * 2,
                behavior: 'smooth'
            });
        }
        
    } catch {
         iziToast.error({
                title: 'Error',
                position: 'bottomRight'
         });
    } finally {
                hideLoader();
                checkBtnLoadMoreVisible();

    }
})


function checkBtnLoadMoreVisible() {
    if (page < maxPage) {
        showLoadMoreButton();
    } else {
        hideLoadMoreButton();
    }
}


function showNotification() {
    if (maxPage === 0) {
        iziToast.error({
            title: `Sorry, there are no images matching your search query. Please try again!`,
            position: 'bottomRight'
        })
    } else if (page === maxPage) {  
        iziToast.info({
            title: `We're sorry, but you've reached the end of search results.`,
            position: 'bottomRight'
        })
    } else if (page === 1) {
        iziToast.info({
            title: `Max page: ${maxPage}`,
            position: 'bottomRight'
        })
    }
}