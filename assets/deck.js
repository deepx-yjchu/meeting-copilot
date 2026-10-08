// 1280x720 고정 스테이지를 창 크기에 맞춰 스케일하고, 키보드/클릭/해시로 슬라이드를 넘긴다.
import { slides } from "./slides.js";

const stage = document.querySelector(".deck-stage");
const progress = document.querySelector(".deck-progress");
const counter = document.querySelector(".deck-counter");
const overview = document.querySelector(".deck-overview");
const grid = document.querySelector(".deck-overview-grid");

let index = 0;

function fit() {
  const sx = window.innerWidth / 1280;
  const sy = window.innerHeight / 720;
  const s = Math.min(sx, sy);
  stage.style.transform = `translate(-50%, -50%) scale(${s})`;
}

function render() {
  const s = slides[index];
  stage.innerHTML = s.html;
  progress.style.width = `${((index + 1) / slides.length) * 100}%`;
  counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  document.title = index === 0 ? "DEEPX Meeting Copilot" : `${s.title} · DEEPX Meeting Copilot`;
  history.replaceState(null, "", `#${index + 1}`);
  grid.querySelectorAll(".deck-thumb").forEach((el, i) => el.classList.toggle("is-current", i === index));
}

function go(n) {
  index = Math.max(0, Math.min(slides.length - 1, n));
  render();
}

function fromHash() {
  const n = parseInt(location.hash.slice(1), 10);
  return Number.isFinite(n) ? n - 1 : 0;
}

function toggleOverview(open) {
  overview.classList.toggle("is-open", open ?? !overview.classList.contains("is-open"));
}

// overview thumbnails
slides.forEach((s, i) => {
  const b = document.createElement("button");
  b.className = "deck-thumb";
  b.innerHTML = `<span class="deck-thumb-n">${String(i + 1).padStart(2, "0")}</span><span class="deck-thumb-title">${s.title}</span>`;
  b.addEventListener("click", () => { toggleOverview(false); go(i); });
  grid.appendChild(b);
});

document.addEventListener("keydown", (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  switch (e.key) {
    case "ArrowRight": case "ArrowDown": case " ": case "PageDown": case "j": case "l":
      e.preventDefault(); if (overview.classList.contains("is-open")) return; go(index + 1); break;
    case "ArrowLeft": case "ArrowUp": case "PageUp": case "k": case "h":
      e.preventDefault(); if (overview.classList.contains("is-open")) return; go(index - 1); break;
    case "Home": go(0); break;
    case "End": go(slides.length - 1); break;
    case "o": case "O": toggleOverview(); break;
    case "Escape": toggleOverview(false); break;
  }
});

document.querySelector(".deck-nav-prev").addEventListener("click", () => go(index - 1));
document.querySelector(".deck-nav-next").addEventListener("click", () => go(index + 1));

// touch swipe
let touchX = null;
document.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
document.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
  touchX = null;
}, { passive: true });

window.addEventListener("resize", fit);
window.addEventListener("hashchange", () => go(fromHash()));

fit();
go(fromHash());
