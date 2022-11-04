import axios from "axios";
import Player from "@vimeo/player"

const base_url = 'https://api.themoviedb.org/3/trending/all/day?api_key=288ace10ced3ba69bdb97de2fe588e41';
const API_KEY = '288ace10ced3ba69bdb97de2fe588e41'
const movie_url = 'https://api.themoviedb.org/3/movie/{movie_id}?api_key=288ace10ced3ba69bdb97de2fe588e41&language=en-US'


getMovies(base_url);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            //"api_key": API_KEY,
        }
    })
    const respData = await resp.json();
    showMovies(respData);
}

function showMovies(data) {

    // console.log(data);
    const moviesEl = document.querySelector(".movies")

    data.results.forEach(movie => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `<div class="movie">
            <div class="movie__cover">
              <img src="${movie.poster_path}"
              alt="${movie.backdrop_path}" />
            </div>
            <div class="movie__info">
              <div class="movie__title">${movie.title}</div>
              <div class="movie__category">${movie.media_type}</div>
              <div class="movie__average">${movie.vote_average}</div>
            </div>
          </div>`;
        
        movieEl.addEventListener('click', () => openModal(movie.id))
        moviesEl.appendChild(movieEl);
        // console.log(movieEl)

    });
}

//модалка

const modalEl = document.querySelector(".modal");


async function openModal(id) {
    // console.log(id)
    //     const resp = await fetch(movie_url, {
    //     headers: {
    //         "Content-Type": "application/json",
    //         //"api_key": API_KEY,
    //     }
    // })
    // const respData = await resp.json();

    modalEl.classList.add("modal--show");
    document.body.classList.add("stop-scroll");
    modalEl.innerHTML = `<div class="modal__card">
        <img src="" alt="" class="modal__movie-backdrop" />
        <h2>
          <span class="modal__movie-title">TITLE</span>
          <span class="modal__movie-release-year">YEAR</span>
        </h2>
        <ul class="modal__movie-info">
          <div class="modal__loader"></div>
          <li class="modal__movie-genre">ЖАНР</li>
          <li class="modal__movie-runtime">ВРЕМЯ</li>
          <li>САЙТ: <a href="" class="modal__movie-site"></a></li>
          <li class="modal__movie-overview">ОПИСАНИЕ</li>
        </ul>
        <button type="button" class="modal__btn-close">CLOSE</button>
      </div>`
    
    const btnClose = document.querySelector(".modal__btn-close");
    btnClose.addEventListener("click", () => closeModal())
}

function closeModal() {
    modalEl.classList.remove("modal--show")
    document.body.classList.remove("stop-scroll");
}

window.addEventListener("click", (evt) => {
    // console.log(evt.target)
    if(evt.target === modalEl) {
        closeModal()
    }
})

window.addEventListener("keydown", (evt) => {
    if (evt.keyCode === 27) {
        closeModal()
    }

})