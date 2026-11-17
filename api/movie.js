import fetch from "node-fetch";
const { APIKEY } = process.env;

export default async function handler(request, response) {
  const { title, page, id } = JSON.parse(request.body);
  const url = id
    ? `https://omdbapi.com?apikey=${APIKEY}&i=${encodeURIComponent(id)}&plot=full`
    : `https://omdbapi.com?apikey=${APIKEY}&s=${encodeURIComponent(title)}&page=${page}`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    response.status(200).json(json);
  } catch (error) {
    // 잘못된 id를 보내면 OMDb가 형식이 깨진 JSON을 줘서 res.json()이 실패함
    // → 서버가 멈추지 않도록, 화면에서 처리할 수 있는 모양으로 에러를 돌려줌
    response.status(200).json({ Response: "False", Error: "Movie not found!" });
  }
}
