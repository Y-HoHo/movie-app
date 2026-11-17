import { Component } from "../core/heropy";
import movieStore from "../store/movie";
import MovieItem from "./MovieItem";

export default class MovieList extends Component {
  constructor() {
    super();
    movieStore.subscribe("movies", () => {
      this.render();
    });
    movieStore.subscribe("loading", () => {
      this.render();
    });
    movieStore.subscribe("message", () => {
      this.render();
    });
  }
  render() {
    this.el.classList.add("movie-list");
    this.el.innerHTML = /* html */ `
      ${
        movieStore.state.message
          ? `<div class="message">${movieStore.state.message}</div>`
          : '<div class="movies"></div>'
      }
      <div class="the-loader hide text-center"></div>
    `;

    const moviesEl = this.el.querySelector(".movies");
    moviesEl?.append(
      // ? -> .movies가 있을 수도 있고, 없을 수도 있으니 그냥 append실행 ( 옵셔널 체이닝 - error반환x)
      ...movieStore.state.movies.map((movie) => {
        return new MovieItem({ movie: movie }).el;
      }),
    );
    const loaderEl = this.el.querySelector(".the-loader");
    movieStore.state.loading
      ? loaderEl.classList.remove("hide")
      : loaderEl.classList.add("hide");
  }
}
