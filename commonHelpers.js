import{S as u,i as m}from"./assets/vendor-7659544d.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const n of e.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(t){if(t.ep)return;t.ep=!0;const e=o(t);fetch(t.href,e)}})();const g=document.querySelector(".search-form"),l=document.querySelector(".gallery"),i=document.querySelector(".loader"),p="gallery-link";let c;g.addEventListener("submit",function(r){r.preventDefault();const s=r.target.elements.query.value.trim();i.style.display="block",s!==""&&(l.innerHTML="",f(s).then(o=>{i.style.display="none",h(o.hits),c=new u(`.${p}`,{captionsData:"alt",captionDelay:250}),c.refresh(),c.on("show.simplelightbox")}).catch(o=>{i.style.display="none",console.error(`${o}`)}),r.target.elements.query.value="")});function f(r){const s="https://pixabay.com/api/",a=`?${new URLSearchParams({key:"42137546-386b5be41212ccd429cab5a80",q:r,image_type:"photo",orientation:"horizontal",safeSearch:!0})}`,t=s+a;return fetch(t).then(e=>{if(!e.ok)throw new Error(`Network response was not ok, status: ${e.status}`);return e.json()}).catch(e=>{throw console.error(`${e}`),e})}function d({webformatURL:r,largeImageURL:s,tags:o,likes:a,views:t,comments:e,downloads:n}){return`
  <a href="${s}" class="${p}">
     <figure>
      <img src="${r}" alt="${o}" class="gallery-image">
      <figcaption class="gallery__figcaption">
        <p class="image-item">Likes <span class="image-caption">${a}</span></p>
        <p class="image-item">Views <span class="image-caption">${t}</span></p>
        <p class="image-item">Comments <span class="image-caption">${e}</span></p>
        <p class="image-item">Downloads <span class="image-caption">${n}</span></p>
  </figcaption>
  </figure>
</a>`}function y(r){return r.map(d).join("")}function h(r){if(r.length===0){m.show({icon:"icon-close",messageSize:"16px",backgroundColor:"red",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});return}const s=y(r);l.innerHTML=s}
//# sourceMappingURL=commonHelpers.js.map
