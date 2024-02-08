'use strict';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.querySelector('.search-form');
  const galleryMarkup = document.querySelector('.gallery');
  const submitBtn = document.querySelector('.search-btn');
  const loader = document.querySelector('.loader');
  const GALLERY_LINK = 'gallery-link';
  let gallery;
  submitBtn.disabled = true;

  searchForm.elements.query.addEventListener('input', function () {
    const query = this.value.trim();

    submitBtn.disabled = query === '';
  });

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const query = e.target.elements.query.value.trim();
    if (query === '') {
      return;
    }

    loader.style.display = 'block';
    galleryMarkup.innerHTML = '';
    getImage(query)
      .then(data => {
        loader.style.display = 'none';
        renderImgs(data.hits);
        submitBtn.disabled = true;

        gallery = new SimpleLightbox(`.${GALLERY_LINK}`, {
          captionsData: 'alt',
          captionDelay: 250,
        });
        gallery.refresh();
        gallery.on('show.simplelightbox');
      })
      .catch(error => {
        loader.style.display = 'none';
        onError(`Error fetching images: ${error}`);
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
        onError(`Error fetching images: ${error}`);
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
      submitBtn.disabled = true;
      return;
    }
    const markup = imgsTemplate(images);
    galleryMarkup.innerHTML = markup;
  }
});

function onSuccess(message) {
  iziToast.show({
    message,
    backgroundColor: '#EF4040',
    progressBarColor: '#FFE0AC',
    icon: 'icon-close',
    ...toastOptions,
  });
}

function onError(message) {
  iziToast.show({
    message,
    backgroundColor: '#59A10D',
    progressBarColor: '#B5EA7C',
    icon: 'icon-chek',
    ...toastOptions,
  });
}
