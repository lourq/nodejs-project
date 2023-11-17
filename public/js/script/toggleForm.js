const loginMenu = document.getElementById("loginMenu");
const registerMenu = document.getElementById("registerMenu");
const toggleButtons = document.querySelectorAll(".toggle-button");

const toggleForms = () => {
  if (loginMenu.style.display === "none") {
    loginMenu.style.display = "flex";
    registerMenu.style.display = "none";
  } else {
    loginMenu.style.display = "none";
    registerMenu.style.display = "flex";
  }
};

export const loginForm = () => {
  if (loginMenu.style.display === "none") {
    loginMenu.style.display = "flex";
    registerMenu.style.display = "none";
  }
};

toggleButtons.forEach(button => {
  button.addEventListener("click", toggleForms);
});