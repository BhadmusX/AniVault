import { getTopAnime } from "./utils/API.js";
import { searchAnime } from "./utils/API.js";
import { getAnimeById } from "./utils/API.js";
import "./styles/main.css";
import "./styles/home.css";

const browse_btn = document.querySelector(".browse-btn");
browse_btn.addEventListener("click", () => {
  window.location.href = "browse.html";
});
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