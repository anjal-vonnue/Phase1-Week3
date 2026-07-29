console.log("hello");

const hamburger = document.getElementById("hamburger");
const navigation = document.querySelector("#nav");
const linkDiv = document.querySelector("#link.links");

console.log(navigation);

function openDrawer() {
  linkDiv.setAttribute("aria-expanded", "true");

  navigation.classList.add("open");
}

function closeDrawer() {
  navigation.classList.remove("open");
  const linkDiv = document.querySelector("#link.false");
  linkDiv.setAttribute("aria-expanded", "false");
}

linkDiv.addEventListener("click", closeDrawer);
