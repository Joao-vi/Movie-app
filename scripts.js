const body = document.querySelector("body");
const main = document.querySelector("main");
const HomePage = document.createElement("section");
const searchSection = document.createElement("section");
searchSection.classList.add("movies");
const home = document.querySelector("#home");

//----API KEY--------
const API = {
  base: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=eb15685beee24af0f55e514540c0acab&with_genres=",
  type: {
    action: "28",
    adventure: "12",
    animation: "16",
    comedy: "35",
    mystery: "9648",
  },
  page: "1",
  imgPath: "https://image.tmdb.org/t/p/w1280",
  search:
    "https://api.themoviedb.org/3/search/movie?&api_key=eb15685beee24af0f55e514540c0acab&language=pt_BR&query= ",
};

// ------------

// Home page html

function htmlStructureForMovie(genre) {
  const section = document.createElement("section");
  section.classList.add("movie");
  section.innerHTML = `
    <div class="header">
      <h2>${genre}</h2>
      <p id="see-btn">
        See All <span><i class="far fa-arrow-alt-circle-right"></i></span>
      </p>
    </div>
    <div class="carousel-movies"></div>
     
   
 
  `;

  const carouselMovies = section.querySelector(".carousel-movies");
  main.appendChild(section);
  return carouselMovies;
}
//---------------------------

// Creating html for search page

function searchPage(title) {
  searchSection.innerHTML = `
  <section class="movie">
      <div class="header">
        <h2>${title}</h2>
      </div>
      <div class="movies-bar"></div>
  </section>
  
  `;
  main.appendChild(searchSection);
}

// Request for movies

async function requestUserInput(api, title = "") {
  const request = await fetch(api + title);
  const jsonData = await request.json();
  return jsonData;
}

// Displaying movies taking by request user

function displayMovie(movieInfo, movieBar) {
  const movieContainer = document.createElement("div");
  const { title, vote_average, poster_path, overview, id } = movieInfo;
  if (poster_path == null) {
    return;
  } else {
    movieContainer.innerHTML = `
    <div class="movie-container" onclick="showMore(this)">
      <div class="img-movie">
        <img src="${API.imgPath + poster_path}" alt="${title}">
        <p class="id-movie">${id} </p>
      </div>
      <div class="info-container">
        <div class="info">
          <h3>${title}</h3>
          <h3 class="grade">${vote_average}</h3>
        </div>
        <div class="more-info">
          <p>${overview}</p>
        </div>
      </div>
    </div>
    
    `;
    movieBar.appendChild(movieContainer);
  }
}

const formSearch = document.querySelector("#form-search");

// Event listener for input user

formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  main.querySelectorAll(".movie").forEach((element) => {
    element.style.display = "none";
  });
  searchSection.style.display = "initial";
  requestUserInput(API.search, searchInput.value)
    .then((movies) => {
      searchPage(searchInput.value);
      const moviesBar = searchSection.querySelector(".movies-bar");
      movies.results.forEach((movie) => {
        displayMovie(movie, moviesBar);
      });
    })
    .catch((error) => {
      console.log("Error on requestUserInput area", error);
    });
  searchInput.value = "";
});
//-----------------------
// Back to home page

home.addEventListener("click", clearPage);

function clearPage() {
  searchSection.style.display = "none";
  main.querySelectorAll(".movie").forEach((el) => {
    el.style.display = "initial";
  });
}
// Request movies by genres

function requestMoviesByGenres(api, genre) {
  const carousel = htmlStructureForMovie(genre);

  requestUserInput(api)
    .then((movies) => {
      movies.results.forEach((movie) => {
        displayMovie(movie, carousel, true);
      });
      $(carousel).slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        width: "max-content",
      });
    })
    .catch((error) => console.log(error));
}
requestMoviesByGenres(API.base + API.type.action, "Action");
requestMoviesByGenres(API.base + API.type.animation, "Animation");
requestMoviesByGenres(API.base + API.type.mystery, "Mystery");

//----------

// SEE All page

function changePage(type) {
  searchSection.style.display = "initial";
  requestUserInput(API.base + API.type[type]).then((movies) => {
    searchPage("Action");
    const moviesBar = searchSection.querySelector(".movies-bar");
    console.log(movies);
    movies.results.forEach((movie) => {
      displayMovie(movie, moviesBar);
    });
  });
}

const seeAllBtn = document.querySelectorAll("#see-btn");

seeAllBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const SeeAllTarget = e.target.previousElementSibling.textContent;
    main.childNodes.forEach((elements) => {
      elements.style.display = "none";
    });
    switch (SeeAllTarget) {
      case "Action": {
        changePage("action");
        break;
      }
      case "Animation": {
        changePage("animation");
        break;
      }
      case "Mystery": {
        changePage("mystery");
        break;
      }
      default: {
        break;
      }
    }
  });
});

//--------------

/*
fetch(
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=eb15685beee24af0f55e514540c0acab&with_genres=28"
).then((response) => {
  response.json(response).then((dataJson) => {
    console.log(dataJson);
  });
});

// https://api.themoviedb.org/3/movie/451048/videos?api_key=eb15685beee24af0f55e514540c0acab&language=en-US
*/
