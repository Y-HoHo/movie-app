import { Component } from "../core/heropy";
import movieStore, { getMovieDetails } from "../store/movie";

export default class Movie extends Component {
  async render() {
    this.el.classList.add("container", "the-movie");
    this.el.innerHTML = /* html */ `
      <div class="poster skeleton"></div>
      <div class="specs">
        <div class="title skeleton"></div>
        <div class="labels skeleton"></div>
        <div class="plot skeleton"></div>
      </div>
    `;
    await getMovieDetails(history.state.id);
    const { movie } = movieStore.state;
    if (movie.Response === "False") {
      // 영화 정보를 못 가져온 경우 (movie.Poster가 없어서 아래 replace에서 에러가 남)
      this.el.innerHTML = /* html */ `
        <div class="specs">
          <div class="title">${movie.Error}</div>
        </div>
      `;
      return;
    }
    const bigPoster =
      movie.Poster === "N/A"
        ? "" // 포스터가 없는 영화
        : movie.Poster.replace("UX380_CR0,0,380,562", "UX680_CR0,0,670,1005");

    this.el.innerHTML = /* html */ `
      <div ${bigPoster ? `style="background-image: url(${bigPoster})"` : ""} class="poster"></div>
      <div class="specs">
        <div class="title">${movie.Title}</div>
        <div class="labels">
          <span>${movie.Released}</span> &nbsp;/&nbsp;
          <span>${movie.Runtime}</span> &nbsp;/&nbsp;
          <span>${movie.Country}</span>
        </div>
        <div class="plot">
          ${movie.Plot}
        </div>
        <div>
          <h3>Ratings</h3>
          ${movie.Ratings.map((rating) => {
            return `<p>${rating.Source} - ${rating.Value}</p>`;
          }).join("")}
        </div>
        <div>
          <h3>Actors</h3>
          <p>${movie.Actors}</p>
        </div>
        <div>
          <h3>Director</h3>
          <p>${movie.Director}</p>
        </div>
        <div>
          <h3>Production</h3>
          <p>${movie.Production}</p>
        </div>
        <div>
          <h3>Genre</h3>
          <p>${movie.Genre}</p>
        </div>
      </div>
    `;
  }
}
