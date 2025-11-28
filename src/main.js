import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import getImagesByQuery from "./js/pixabay-api";
import { clearGallery, createGallery, showLoader, hideLoader } from "./js/render-functions"

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    clearGallery();
    const input = e.target.elements['search-text'];
    const query = input.value;  
    if (query.trim() === "") {
        iziToast.error({
            message: "The search field cannot be empty!",
            position: 'topRight',
            maxWidth: '432px',
            color: '#ef4040',
            close: false,
            animateInside: false,
            transitionIn: 'fadeIn',
            transitionOut: 'fadeOut',
        });
        input.value = "";
        return;
    }
    showLoader();
    getImagesByQuery(query)
        .then(data => {
            const hitsArray = data.hits;
            if (hitsArray.length === 0) {
                iziToast.error({
                    message: `Sorry, there are no images matching your search query. Please try again!`,
                    position: 'topRight',
                    maxWidth: '432px',
                    color: '#ef4040',
                    close: false,
                    animateInside: false,
                    transitionIn: 'fadeIn',
                    transitionOut: 'fadeOut',
                });
                return;
            }
            else { createGallery(hitsArray) }
        })
        .catch(error => {
            iziToast.error({
                message: "Something went wrong. Please try again later.",
                position: 'topRight',
                maxWidth: '432px',
                color: '#ef4040',
                close: false,
                animateInside: false,
                transitionIn: 'fadeIn',
                transitionOut: 'fadeOut',
            });
        })
        .finally(() => {
            hideLoader();
            e.target.reset();
        });
})