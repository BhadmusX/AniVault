import "@fortawesome/fontawesome-free/css/all.min.css";
import { getAnimeById } from "./utils/API.js";
import { getanimeEpisode } from "./utils/API.js";
import "./styles/main.css";
import { savetoLocalstorage } from "./utils/storage.js";

const animeCont = document.querySelector(".anime-info");

export async function Animecard() {
  try{
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  const animeid = await getAnimeById(id);
  if (!animeid) return;

  const card = document.createElement("div");
  card.classList.add("anime-card");

  animeCont.appendChild(card);

  function formatNumberClean(num) {
    if (num >= 1000000) {
      const formatted = (num / 1000000).toFixed(1);
      return parseFloat(formatted) + "m";
    }
    return num;
  }
 const epi =  await getanimeEpisode(animeid.id);
 console.log(epi);
  card.innerHTML = `
    <div class="animeimg-cont">
      <img src="${animeid.img}" alt="${animeid.title}">
    </div>
    <div class="animecard-info">
      <h3 class="title-eng">${animeid.titleEng}</h3>
      <div class="card-meta">
        <span>🎬 ${animeid.episode} episodes</span>
        <span>⏱ ${animeid.duration}</span>
      </div>
    </div>
    <div class="anime-infocard">
      <div class="synopsis">
        <h3>Synopsis</h3>
        <p>${animeid.synopsis}</p>
      </div>

      <details class="episodes-div">
      <h3>Episodes</h3>
        <summary>${epi.length} Episodes</summary>
      <div class="episodes"></div>
      </details>

      <div class="favorite-div">
        <div class="favdiv-btn">
          <button class="fav-btn"><i class="fas fa-heart"></i>Add to Favorites</button>
        </div>
        <div id="toast" class="toast hidden">Added to favorites</div>
        <div class="status-inputdiv">
          <label for="select">Trending Status</label>
          <select id="select">
            <option value="watching" default selected>Watching</option>
            <option value="completed">Completed</option>
            <option value="watchlist">Watchlist</option>
            <option value="onHold">On Hold</option>
            <option value="dropped">Dropped</option>
          </select>
        </div>
        <div class="fav-infodiv">
          <div class="fav-info">
            <h3>FORMAT</h3>
            <p>${animeid.type}</p>
          </div>

          <div class="fav-info">
            <h3>STATUS</h3>
            <p>${animeid.status}</p>
          </div>

          <div class="fav-info">
            <h3>SEASON</h3>
            <p>${animeid.season}</p>
          </div>
        </div>
      </div>

      <div class="genre"></div>

      <div class="rank-div">
        <div class="rank">
          <h3>#${animeid.rank}</h3>
          <p>ALL TIME RANK</p>
        </div>

        <div class="members">
          <h3>${formatNumberClean(animeid.members)}</h3>
          <p>MEMBERS</p>
        </div>
      </div>
    </div>
  `;

  const episodes = card.querySelector(".episodes");
  function createEpisodeCard(anime){
    const div = document.createElement("div");
    div.classList.add("epi")
    episodes.appendChild(div);
    div.innerHTML= `
    <h1 class="episode-num">${anime.id}</h1>
    <div class="title">
    <h3 class="anime-title">${anime.title}</h3>
    </div>
    <input type="checkbox"/>
    </div>
    `;
  }

 
  epi.map(anime => {
     createEpisodeCard(anime);
   })


  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.remove("hidden");
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 2000);
}
  const genre = document.querySelector(".genre");
  genre.innerHTML = "";
  animeid.genre.forEach((g) => {
    const genpara = document.createElement("p");
    genpara.textContent = g.name;
    genpara.classList.add("genpara");
    genre.appendChild(genpara);
  });

  const favbtn = card.querySelector(".fav-btn");
  const favselect = card.querySelector("#select");

  favbtn.addEventListener("click", async () => {
    const favstatus = favselect?.value;
    const favorite = {
      id: animeid.id,
      title: animeid.title,
      status: favstatus,
      img: animeid.img,
    };
        savetoLocalstorage(favorite);
        showToast("Added to favorites ✓");
  });

  return card;
}catch(err){
  animeCont.innerHTML = `<div class="err-div"> 
    <p class="error-msg">${err.message}</p>
    </div>`
}
}

const params = new URLSearchParams(window.location.search);
if (params.has("id")) {
  Animecard();
}

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
