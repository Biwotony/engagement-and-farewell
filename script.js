const screens = [...document.querySelectorAll(".screen")];
const steps = [...document.querySelectorAll(".stepNav span")];
const choices = [...document.querySelectorAll(".choiceCard")];
const reaction = document.getElementById("reaction");
const reactionText = document.getElementById("reactionText");
const detailsButton = document.getElementById("detailsButton");
let currentScreen = 0;

// This invitation is a fixed slideshow, never a document that scrolls.
window.addEventListener("wheel", (event) => event.preventDefault(), { passive: false });
window.addEventListener("touchmove", (event) => event.preventDefault(), { passive: false });
window.addEventListener("keydown", (event) => {
  if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) event.preventDefault();
});

function showScreen(index) {
  screens[currentScreen].classList.remove("active");
  steps[currentScreen].classList.remove("active");
  currentScreen = index;
  screens[currentScreen].classList.add("active");
  steps[currentScreen].classList.add("active");
}

document.getElementById("openInvitation").addEventListener("click", () => showScreen(1));
document.querySelectorAll("[data-next]").forEach((button) => button.addEventListener("click", () => showScreen(Number(button.dataset.next))));

choices.forEach((choice) => choice.addEventListener("click", () => {
  choices.forEach((item) => item.classList.remove("selected"));
  choice.classList.add("selected");
  reactionText.textContent = choice.dataset.reply;
  reaction.classList.add("show");
  detailsButton.classList.add("show");
}));

detailsButton.addEventListener("click", () => showScreen(2));
document.getElementById("replayButton").addEventListener("click", () => {
  choices.forEach((item) => item.classList.remove("selected"));
  reaction.classList.remove("show");
  detailsButton.classList.remove("show");
  showScreen(0);
});

const eventTime = new Date("2026-08-22T10:00:00+03:00").getTime();
function updateCountdown() {
  const distance = Math.max(0, eventTime - Date.now());
  const values = {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
  Object.entries(values).forEach(([id, value]) => {
    document.getElementById(id).textContent = String(value).padStart(2, "0");
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);
