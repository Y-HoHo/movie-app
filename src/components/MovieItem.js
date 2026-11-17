import { Component } from "../core/heropy";

export default class MovieItem extends Component {
  constructor(props) {
    super({
      props,
      tagName: "a",
    });
  }
  render() {
    const { movie } = this.props;

    this.el.setAttribute("href", `#/movie?id=${movie.imdbID}`);
    this.el.classList.add("movie");
    if (movie.Poster !== "N/A") {
      // 포스터가 없는 영화는 OMDb가 "N/A"를 줌 → url(N/A)로 넣으면 없는 주소를 요청해서 404
      this.el.style.backgroundImage = `url(${movie.Poster})`; // 출력되는 포스터마다 크기가 다름. 동일한 크기로 출력하기 위함.
    }
    this.el.innerHTML = /* html */ `
      <div class="info">
        <div class="year">
          ${movie.Year}
        </div>
        <div class="title">
          ${movie.Title}
        </div>
      </div>
    `;
  }
}
