// 1:10 урок

let moviesList = null;

const createElement = (type, attrs, container) => {
  const el = document.createElement(type);

  Object.keys(attrs).forEach((key) => {
    if (key !== 'innerHTML') el.setAttribute(key, attrs[key]);
    else el.innerHTML = attrs[key];
  });

  container.append(el);
};

const createStyle = () => {
  const style = document.createElement('style');

  style.innerHTML = `
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
  }

  .container {
    padding: 20px;
  }

  .movies {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

  .movie {
    display: flex;
    align-content: center;
    justify-content: center;
  }

  .movie__image {
    width: 100%;
  }
  `;
  document.head.append(style);
};

const createMarkup = () => {
  const container = document.createElement('div');
  const movies = document.createElement('div');

  container.setAttribute('class', 'container');
  movies.setAttribute('class', 'movies');
//

  const header = createElement('h1', {innerHTML: 'Приложение для поиска фильмов'}, container);

//
  const search = createElement('div', {class: 'search'}, container);

//
  const searchInput = createElement('input', {
    class: 'search__input',
    id: 'search',
    placeholder: 'Введите название фильма'
  }, container);

//

  container.append(movies);
  document.body.prepend(container);

  moviesList = document.querySelector('.movies');
};

/* <h1>Приложение для поиска фильмов</h1>
  <div class="search">
    <div class="search__group search__group--input">
      <label for="search">Поиск фильмов</label>
      <input id="search" type="search" placeholder="Введите название фильма">
    </div>
    <div class="search__group search__group--checkbox">
      <input id="checkbox" type="checkbox">
      <label for="checkbox">Добавить фильмы к уже найденным</label>
    </div>
  </div> */

/* <div class="container">
    <div class="movies">
      <div class="movie">
        <img class="movie__image" src="" alt="">
      </div>
    </div>
  </div> */

const addMovieToList = (movie) => {
  const item = document.createElement('div');
  const img = document.createElement('img');

  item.setAttribute('class', 'movie');
  img.setAttribute('class', 'movie__image');

  img.src = /^(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'assets/img/no-image-available.jpg';
  img.alt = `${movie.Title}, ${movie.Year}`;
  img.title = `${movie.Title}, ${movie.Year}`;

  item.append(img);
  moviesList.append(item);
};

// Poster: "https://m.media-amazon.com/images/M/MV5BMDJhZjA5MWEtOTE5Yy00MWJiLTgwNjQtMDliOWI0NWJmZDZkXkEyXkFqcGdeQXVyMjY1ODY2Ng@@._V1_SX300.jpg"
// Title: "Lauf um Dein Leben - Vom Junkie zum Ironman"
// Type: "movie"
// Year: "2008"
// imdbID: "tt0954542"

const getData = (url) => fetch(url)
  .then((response) => response.json())
  .then((json) => json.Search);

const search = 'ironman';

createMarkup();
createStyle();

getData(`http://www.omdbapi.com/?apikey=18b8609f&s=${search}`)
  .then((movies) => movies.forEach(movie => addMovieToList(movie)))
  .then((err) => console.log(err));