'use strict';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.querySelector('.search-form');
  const galleryMarkup = document.querySelector('.gallery');
  const loader = document.querySelector('.loader');
  const GALLERY_LINK = 'gallery-link';
  let gallery;

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    loader.style.display = 'block';
    const query = e.target.elements.query.value.trim();
    // console.log();
    if (query === '') return;
    galleryMarkup.innerHTML = '';
    getImage(query)
      .then(data => {
        // console.log(data);
        loader.style.display = 'none';
        renderImgs(data.hits);

        gallery = new SimpleLightbox(`.${GALLERY_LINK}`, {
          captionsData: 'alt',
          captionDelay: 250,
        });
        gallery.refresh();
        gallery.on('show.simplelightbox');
      })
      .catch(error => {
        loader.style.display = 'none';
        console.error(`${error}`);
      });

    e.target.elements.query.value = '';
  });

  function getImage(query) {
    const BASE_URL = 'https://pixabay.com/api/';

    const searchParams = new URLSearchParams({
      key: '42137546-386b5be41212ccd429cab5a80',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safeSearch: true,
    });
    const Params = `?${searchParams}`;
    const url = BASE_URL + Params;

    return fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Network response was not ok, status: ${res.status}`);
        }
        return res.json();
      })
      .catch(error => {
        console.error(`${error}`);
        throw error;
      });
  }

  function imgTemplate({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) {
    return `
  <a href="${largeImageURL}" class="${GALLERY_LINK}">
     <figure>
      <img src="${webformatURL}" alt="${tags}" class="gallery-image">
      <figcaption class="gallery__figcaption">
        <p class="image-item">Likes <span class="image-caption">${likes}</span></p>
        <p class="image-item">Views <span class="image-caption">${views}</span></p>
        <p class="image-item">Comments <span class="image-caption">${comments}</span></p>
        <p class="image-item">Downloads <span class="image-caption">${downloads}</span></p>
  </figcaption>
  </figure>
</a>`;
  }

  function imgsTemplate(imgs) {
    return imgs.map(imgTemplate).join('');
  }
  function renderImgs(images) {
    if (images.length === 0) {
      iziToast.show({
        icon: 'icon-close',
        messageSize: '16px',
        backgroundColor: `red`,
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    const markup = imgsTemplate(images);
    galleryMarkup.innerHTML = markup;
  }
});
