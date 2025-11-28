import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const ulEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = cardsTemplate(images);
  ulEl.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}

export function clearGallery() {
  ulEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.remove('hidden');
}

export function hideLoader() {
  loaderEl.classList.add('hidden');
}

function cardTemplate({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img 
          class="gallery-image" 
          src="${webformatURL}" 
          alt="${tags}"
        />
      </a>

      <div class="card-container">
        <p class="card-item"><b>Likes</b> ${likes}</p>
        <p class="card-item"><b>Views</b> ${views}</p>
        <p class="card-item"><b>Comments</b> ${comments}</p>
        <p class="card-item"><b>Downloads</b> ${downloads}</p>
      </div>
    </li>
  `;
}

function cardsTemplate(images) {
    return images.map(cardTemplate).join('');
}
