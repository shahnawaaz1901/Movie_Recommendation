const apiKey = "5767718b7cdf13cd0adf06ce36815fdc";
const playButton = document.getElementById("playBtn");
const genreListContainer = document.getElementById("genres");
const nextButton = document.getElementById("likeOrDislikeBtns");
const moviePoster = document.getElementById("moviePoster");
const movieText = document.getElementById("movieText");
const nextBtn = document.getElementById("likeBtn");
let genre;
let genreSize;

function fetchGenretion() {
  const request = new XMLHttpRequest();
  request.open(
    "get",
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
  );

  request.send();
  request.onload = () => {
    const data = JSON.parse(request.response).genres;
    if (request.status == 404) {
      return;
    }
    genreSize = data.length;
    renderGenre(data);
  };
}

function renderGenre(data) {
  for (let eachGenre of data) {
    const newGenre = document.createElement("option");
    newGenre.textContent = eachGenre.name;
    genreListContainer.appendChild(newGenre);
  }
}

function fetchMovie() {
  genre = genreListContainer.value;
  const request = new XMLHttpRequest();
  request.open(
    "get",
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}`
  );
  request.send();
  request.onload = () => {
    const movieList = JSON.parse(request.response).results;
    console.log(movieList);
    const random = Math.floor(Math.random() * movieList.length);
    const movie = movieList[random];
    console.log(movie);
    renderMovie(movie);
  };
  nextButton.removeAttribute("hidden");
}

function renderMovie(movie) {
  moviePoster.innerHTML = "";
  movieText.innerHTML = "";
  movieText.textContent = movie.title;
  const newElement = document.createElement("img");
  newElement.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`
  );
  moviePoster.appendChild(newElement);
}
document.addEventListener("DOMContentLoaded", fetchGenretion);

playButton.addEventListener("click", fetchMovie);
nextBtn.addEventListener("click", fetchMovie);
