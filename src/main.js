import { getImagesByQuery } from "./js/pixabay-api";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { clearGallery, createGallery, hideLoader, hideLoadMoreButton, showLoader, showLoadMoreButton } from "./js/render-functions";
import { refs } from "./js/ref";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let gallery = new SimpleLightbox('.gallery a');
    gallery.on('show.simplelightbox', function () {});



let inputValue;
let page;
let maxPage = 0;
const PAGE_SIZE = 15;


refs.formEL.addEventListener('submit', async (e) => {
    e.preventDefault();
    inputValue = e.target.elements.searchText.value.trim();
    page = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader();
    try {
        const res = await getImagesByQuery(inputValue, page)
        const markup = createGallery(res.hits);
        refs.galleryEl.innerHTML = markup;
  gallery.refresh();

        maxPage = Math.ceil(res.totalHits / PAGE_SIZE);
        hideLoader();
        
    } catch {
         iziToast.error({
                title: 'Error',
                position: 'bottomRight'
         });
        hideLoader();
    }
    showNotification();
    checkBtnLoadMoreVisible();
    e.target.reset();
})



refs.btnLoadMoreEl.addEventListener('click', async () => {
    page += 1;
        checkBtnLoadMoreVisible();
    showNotification();
    showLoader();
    try {
        const res = await getImagesByQuery(inputValue, page)
        const markup = createGallery(res.hits);
        refs.galleryEl.insertAdjacentHTML('beforeend', markup);

          gallery.refresh();

        const firstCard = document.querySelector('.photo-card');
        if (firstCard) {
            const cardHeight = firstCard.getBoundingClientRect().height;
            window.scrollBy({
                top: cardHeight * 2,
                behavior: 'smooth'
            });
        }
        hideLoader();
        
    } catch {
         iziToast.error({
                title: 'Error',
                position: 'bottomRight'
         });
        hideLoader();
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