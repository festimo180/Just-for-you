const welcomeName = document.getElementById("welcomeName");

try {
  const savedName = sessionStorage.getItem("velvetHeartsVisitor");
  if (savedName) welcomeName.textContent = savedName;
} catch (_) {}

document.getElementById("yesButton").addEventListener("click", () => {
  document.getElementById("answerMessage").textContent =
    "You just made this little world a lot more beautiful. ♡";
  document.getElementById("yesButton").textContent = "A moment to remember ♡";
});

document.getElementById("noButton").addEventListener("click", () => {
  document.getElementById("answerMessage").textContent =
    "That's okay. Take your time — your feelings matter. ♡";
});

document.getElementById("secretButton").addEventListener("click", () => {
  const message = document.getElementById("secretMessage");
  message.hidden = !message.hidden;
  document.getElementById("secretButton").textContent = message.hidden
    ? "Open your little secret ♡"
    : "Keep this little secret ♡";
});

document.getElementById("musicToggle").addEventListener("click", () => {
  alert("Our music player is the next feature we'll add here. ♡");
});
