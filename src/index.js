import { getTopAnime } from "./utils/API.js";
import { searchAnime } from "./utils/API.js";
import { getAnimeById } from "./utils/API.js";
import "./styles/main.css";
import "./styles/home.css";

const browse_btn = document.querySelector(".browse-btn");
browse_btn.addEventListener("click", () => {
  window.location.href = "browse.html";
});
