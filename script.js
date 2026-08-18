const invitation = document.getElementById("invitationBody");
const openButton = document.getElementById("openInvitation");
const choices = [...document.querySelectorAll(".choiceCard")];
const reaction = document.getElementById("reaction");
const reactionText = document.getElementById("reactionText");
const detailsButton = document.getElementById("detailsButton");

openButton.addEventListener("click", () => {
  invitation.classList.add("isOpen"); invitation.setAttribute("aria-hidden", "false");
  setTimeout(() => document.getElementById("readiness").scrollIntoView({ behavior: "smooth" }), 350);
});
choices.forEach((choice) => choice.addEventListener("click", () => {
  choices.forEach((item) => item.classList.remove("selected")); choice.classList.add("selected");
  reactionText.textContent = choice.dataset.reply; reaction.classList.add("show"); detailsButton.classList.add("show");
}));
detailsButton.addEventListener("click", () => document.getElementById("details").scrollIntoView({ behavior: "smooth" }));
const eventTime = new Date("2026-08-22T10:00:00+03:00").getTime();
function updateCountdown() {
  const distance = Math.max(0, eventTime - Date.now());
  const values = { days: Math.floor(distance/86400000), hours: Math.floor((distance/3600000)%24), minutes: Math.floor((distance/60000)%60), seconds: Math.floor((distance/1000)%60) };
  Object.entries(values).forEach(([id,value]) => document.getElementById(id).textContent = String(value).padStart(2,"0"));
}
updateCountdown(); setInterval(updateCountdown,1000);
