import "./styles/main.css";
import { loadfromlocalstorage } from "./utils/storage.js";
import { getAnimeById } from "./utils/API.js";
import { removefromlocal } from "./utils/storage.js";
import { savetoLocalstorage } from "./utils/storage.js";
import { getanimeEpisode } from "./utils/API.js";
const favCont = document.querySelector(".fav-info");
const favorites = loadfromlocalstorage();

function favanimecard(anime) {
  const favcard = document.createElement("div");
  favcard.classList.add("favcard");

  favCont.appendChild(favcard);
  favcard.innerHTML = `
    <div class="main-card">

    <div class="favimg-div">
    <button class="del-btn">X</button>
    <img src="${anime.img}" alt="${anime.title}"></img>
    </div>

    <div class="favanime-name">
    <h1>${anime.title}</h1>
    </div>
    <divclass="favselect-div">
    <select id="select">
            <option value="watching" ${anime.status === "watching" ? "selected" : ""}>Watching</option>
            <option value="completed"  ${anime.status === "completed" ? "selected" : ""}>Completed</option>
            <option value="watchlist" ${anime.status === "watchlist" ? "selected" : ""}>Watchlist</option>
            <option value="onHold" ${anime.status === "onHold" ? "selected" : ""}>On Hold</option>
            <option value="dropped" ${anime.status === "dropped" ? "selected" : ""}>Dropped</option>
          </select>
    </div>

    </div>
    `;
  favcard.dataset.id = anime.id;
  const delbtn = favcard.querySelector("button");
  delbtn.addEventListener("click", () => {
    const id = favcard.dataset.id;
    removefromlocal(id);
    favcard.remove();
  });

  const select = favcard.querySelector("select");
  select.addEventListener("change", () => {
    const favorite = {
      id: anime.id,
      title: anime.title,
      status: select.value,
      img: anime.img,
    };
    savetoLocalstorage(favorite);
  });

  const favcardimg = favcard.querySelector(".favimg-div");
  favcardimg.addEventListener("click", (e) => {
    const card = e.target.closest(".favcard");
    if (!card) return;
    const id = card.dataset.id;
    window.location.href = `anime.html?id=${id}`;
  });
}
const fav = favorites.forEach((anime) => {
  const id = anime.id;
  const favanime = getAnimeById(id);
  favanimecard(anime);
});

/**Hamburger */
const hamburger = document.querySelector(".hamburger");
const navlink = document.querySelector(".nav-links");

if (hamburger && navlink) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navlink.classList.toggle("active");
  });

  const links = document.querySelectorAll(".nav-links a");
  links.forEach((l) => {
    l.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navlink.classList.remove("active");
    });
  });

  const body = document.body;
  body.addEventListener("click", (e) => {
    if (!navlink.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("active");
      navlink.classList.remove("active");
    }
  });
}
