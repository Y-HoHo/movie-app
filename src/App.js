import { Component } from "./core/heropy";
import TheHeader from "./components/TheHeader";
import TheFooter from "./components/TheFooter";

export default class App extends Component {
  //App.js를 기준으로 각각의 페이지 구분
  render() {
    const theHeader = new TheHeader().el;
    const theFooter = new TheFooter().el;
    const routerView = document.createElement("router-view");

    this.el.append(theHeader, routerView, theFooter);
  }
}
