import { Store } from "../core/heropy"; //store개념 가져오기

const store = new Store({
  searchText: "",
  page: 1,
  pageMax: 1,
  movies: [],
  movie: {},
  loading: false,
  message: "Search for the move title!",
});

export default store;

export const searchMovies = async (page) => {
  store.state.loading = true;
  //실제 영화 정보를 가져오도록 추가
  store.state.page = page;
  if (page === 1) {
    // 새로운 영화를 검색 할 때의 경우 다시 1page이기 때문에.
    store.state.movies = [];
    store.state.message = ""; // 페이지를 가져오면 메세지 출력은 없어져야 하기 때문.
  }
  try {
    const res = await fetch("/api/movie", {
      method: "POST",
      body: JSON.stringify({ title: store.state.searchText, page: page }),
    });
    const { Search, totalResults, Response, Error } = await res.json(); // Response가 false일때는 영화 정보를 가져오지 못했기때문에 Error 반환
    if (Response === "True") {
      store.state.movies = [...store.state.movies, ...Search];
      store.state.pageMax = Math.ceil(Number(totalResults) / 10);
    } else {
      store.state.message = Error;
      store.state.pageMax = 1; // 영화 목록을 가져올 수 없는 상황일때 초기화 필요! 안하게 되면 추가 페이지가 더 있음에도 불구하고 더보기 버튼이 표시 안됨!
    }
  } catch (error) {
    console.log("searchMovies error: ", error);
  } finally {
    store.state.loading = false;
  }
};

export const getMovieDetails = async (id) => {
  try {
    // id = 해당하는 영화, plot = 영화 상세 설명
    const res = await fetch("/api/movie", {
      method: "POST",
      body: JSON.stringify({ id: id }),
    });
    store.state.movie = await res.json();
  } catch (error) {
    console.log("getMovieDetails : ", error);
  }
};
