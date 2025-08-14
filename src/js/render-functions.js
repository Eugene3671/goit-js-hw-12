import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let gallery = new SimpleLightbox('.gallery a');
    gallery.on('show.simplelightbox', function () {});

const galleryEl = document.querySelector('.gallery');
export function createGallery(images) {
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
    galleryEl.innerHTML = markup;
      gallery.refresh();
}
export function clearGallery() {
        galleryEl.innerHTML = '';
}

const loaderEl = document.querySelector('.loader');

export function showLoader() {
    loaderEl.classList.remove('hidden');
}
export function hideLoader() {
    loaderEl.classList.add('hidden');
}