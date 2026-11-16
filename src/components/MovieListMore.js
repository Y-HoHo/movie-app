import { Component } from "../core/heropy";
import movieStore, { searchMovies } from "../store/movie";

export default class MovieListMore extends Component {
  constructor() {
    super({
      tagName: "button",
    });
    movieStore.subscribe("pageMax", () => {
      const { page, pageMax } = movieStore.state;
      if (pageMax > page) {
        // pageMax가 더 크다는건 보여줄 페이지가 더 남았다는 뜻.(ex. max가 4페이지인데 현재 페이지도 4페이지면 else구문으로 hide 처리)
        this.el.classList.remove("hide"); // 더보기 버튼을 보여줌
      } else {
        this.el.classList.add("hide"); // 더보기 버튼을 숨김
      }
    });
  }
  render() {
    this.el.classList.add("btn", "view-more", "hide");
    this.el.textContent = "View more..";

    this.el.addEventListener("click", async () => {
      this.el.classList.add("hide"); // 페이지를 가져오기 전에 먼저 더보기 버튼을 숨기고 위에 if문으로 통해 페이지가 있으면 더보기 버튼 추가
      await searchMovies(movieStore.state.page + 1); //항상 다음 페이지를 요청
    });
  }
}
