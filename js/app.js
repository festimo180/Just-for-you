const enterButton = document.getElementById("enterButton");
const visitorName = document.getElementById("visitorName");

function enterExperience() {
  const name = visitorName.value.trim();

  if (!name) {
    visitorName.focus();
    visitorName.placeholder = "Please enter your name first";
    return;
  }

  try {
    sessionStorage.setItem("velvetHeartsVisitor", name);
  } catch (_) {}

  window.location.href = "home.html";
}

enterButton.addEventListener("click", enterExperience);

visitorName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") enterExperience();
});
