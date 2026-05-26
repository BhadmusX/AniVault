import "./styles/main.css";
import { searchAnime } from "./utils/API.js";
import { getTopAnime } from "./utils/API.js";
const animeCont = document.querySelector(".anime-container");
const searchinput = document.querySelector("#searchinput");
const results = document.querySelector(".results");
function createAnimeCard(anime) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = anime.id;

  const genres = anime.genre.map((g) => g.name).join(" . ");
  card.innerHTML = `
        <img src="${anime.img}" alt="${anime.title}">
        <div class="card-info">
         <h3 class="title-eng">${anime.titleEng || anime.title}</h3>
         <p class="title-jp">${anime.title}</p>
         <p class="genres">${genres}</p>
        </div>
         `;
  animeCont.appendChild(card);
  card.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const id = card.dataset.id;
    window.location.href = `anime.html?id=${id}`;
  });
}

async function searchanime(searchitem) {
    try{
  const searchedAnime = await searchAnime(searchitem);
  searchedAnime.forEach((anime) => {
    createAnimeCard(anime);
  });}
  catch(err) {
    animeCont.innerHTML = `<div class="err-div"> 
    <p class="error-msg">${err.message}</p>
    </div>`
  }
}


searchinput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = e.target.value.trim();

    if (query === "") return;

    animeCont.innerHTML = "";
    results.textContent = "";
    const search = query[0].toUpperCase() + query.slice(1);
    searchanime(query);
    searchinput.value = "";
  }
});

async function TopAnime() {
    try{
  const topAnime = await getTopAnime();
  topAnime.forEach((anime) => {
    createAnimeCard(anime);
  });
} catch(err){
    animeCont.innerHTML = `<div class="err-div"><p class="error-msg">${err.message}</p></div>`
}
}

const hamburger = document.querySelector(".hamburger");
const navlink = document.querySelector(".nav-links");
hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
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
TopAnime();
