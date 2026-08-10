import {
  accordionOnLoad,
  addChangeEventToAccordion,
  addKeyboardtToAccordion,
} from "./components/accordion.js";
import { themeToggle } from "./components/darkMode.js";

let htmlRoot;
let localTheme;

document.addEventListener("DOMContentLoaded", () => {
  htmlRoot = document.querySelector("html");
  localTheme = localStorage.getItem("theme");
  if (localTheme) {
    htmlRoot.setAttribute("data-theme", localTheme);
  }

  const themeBtn = document.getElementById("theme-btn");
  themeBtn.addEventListener("click", themeToggle);
});

accordionOnLoad();

addChangeEventToAccordion();

addKeyboardtToAccordion();
