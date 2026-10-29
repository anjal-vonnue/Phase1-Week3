console.log("hello");

let htmlRoot;
let localTheme;
let currentTheme;

document.addEventListener("DOMContentLoaded", () => {
  htmlRoot = document.querySelector("html");
  localTheme = localStorage.getItem("theme");
  if (localTheme) {
    htmlRoot.setAttribute("data-theme", localTheme);
  }
});

function themeToggle() {
  currentTheme = htmlRoot.getAttribute("data-theme");
  const btn = document.getElementById("theme-btn");
  btn.setAttribute("aria-pressed", "true");
  if (currentTheme == "light") {
    htmlRoot.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    htmlRoot.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}
