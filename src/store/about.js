import { Store } from "../core/heropy";
const userImg = new URL("../../HAN_favicon_wave.ico", import.meta.url);

export default new Store({
  photo: userImg,
  name: "HAN / UYEONGHO",
  email: "gray.hk4150@gmail.com",
  github: "https://github.com/Y-HoHo",
});
