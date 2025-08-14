import { getImagesByQuery } from "./js/pixabay-api";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { clearGallery, createGallery, hideLoader, showLoader } from "./js/render-functions";


const formEL = document.querySelector('.form');

formEL.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.searchText.value.trim();
    clearGallery();
    showLoader();
    getImagesByQuery(inputValue)
        .then(hits => {
            createGallery(hits);
        })
        .catch(error => {
            iziToast.error({
                title: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight'
            });
        })
    .finally(() => hideLoader());
    
})