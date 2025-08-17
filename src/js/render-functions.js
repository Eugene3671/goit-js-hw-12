
import { refs } from "./ref";

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
  return markup;
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