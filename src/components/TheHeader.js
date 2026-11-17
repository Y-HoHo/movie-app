import { Component } from "../core/heropy";
const userImg = new URL("../../HAN_favicon_wave.ico", import.meta.url);

export default class TheHeader extends Component {
  constructor() {
    super({
      tagName: "header",
      state: {
        menu: [
          {
            name: "Search",
            href: "#/",
          },
          {
            name: "Movie",
            href: "#/movie?id=tt4520988",
          },
          {
            name: "About",
            href: "#/about",
          },
        ],
      },
    });
    window.addEventListener("popstate", () => {
      this.render();
    });
  }
  render() {
    this.el.innerHTML = /* html */ `
      <a href="#/" class="logo"><span>OMDbAPI</span>.COM</a>
      <nav>
        <ul>
          ${this.state.menu
            .map((menu) => {
              const href = menu.href.split("?")[0]; // 이동할 페이지 주소
              const hash = location.hash.split("?")[0]; // 현재 페이지 주소
              const isActive = href === hash; // 이동할 페이지 주소와 현재 페이지의 주소 비교
              return /* html */ `
              <li>
                <a href="${menu.href}" class="${isActive ? "active" : ""}">${menu.name}</a>
              </li>
            `;
            })
            .join("")}
        </ul>
      </nav>
      <a href="#/about" class="user">
        <img src="${userImg}" alt="User" />
      </a>
    `;
  }
}
