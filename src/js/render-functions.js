import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { refs } from "./ref";

let gallery = new SimpleLightbox('.gallery a');
    gallery.on('show.simplelightbox', function () {});


export function createGallery(images, status) {
    const markup = images.map(img => `<li class="photo-card">
          <a href="${img.largeImageURL}"><img src="${img.webformatURL}" alt="${img.tags}" />
          <div class="info">
            <p><b>Likes</b> <span>${img.likes}</span></p>
            <p><b>Views</b> <span>${img.views}</span></p>
            <p><b>Comments</b> <span>${img.comments}</span></p>
            <p><b>Downloads</b> <span>${img.downloads}</span></p>
          </div>
          </a>
        </li>`).join('\n');
    if (status === 'replace') {
         refs.galleryEl.innerHTML = markup;
    }else if (status === 'append') {
    refs.galleryEl.insertAdjacentHTML('beforeend', markup);
    }
    gallery.refresh();
}
export function clearGallery() {
        refs.galleryEl.innerHTML = '';
}
export function showLoader() {
    refs.loaderEl.classList.remove('hidden');
}
export function hideLoader() {
    refs.loaderEl.classList.add('hidden');
}
export function showLoadMoreButton() {
    refs.btnLoadMoreEl.classList.remove('hidden');
}
export function hideLoadMoreButton() {
    refs.btnLoadMoreEl.classList.add('hidden');
}