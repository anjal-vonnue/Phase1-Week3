const title = document.getElementById("title");
console.log(title);

const linkContainer = document.getElementsByClassName("links");
console.log(linkContainer);

const h3Tag = document.getElementsByTagName("h3");
console.log(h3Tag);

const tags = document.querySelector(".tags");
console.log(tags);

const contentContainer = document.querySelectorAll(".content");
console.log(contentContainer);

//dom traversal
const parent = document.querySelector(".project-grid");
console.log(parent);

const firstChild = parent.firstElementChild;
console.log(firstChild);

const lastChild = parent.lastElementChild;
console.log(lastChild);

const nextSibling = parent.nextElementSibling;
console.log(nextSibling);

function addCard(title, body, imageUrl) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("wrapper", "not-featured");

  const overlayDiv = document.createElement("div");
  overlayDiv.classList.add("overlay");
  newDiv.appendChild(overlayDiv);

  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = "random image";
  newDiv.appendChild(image);

  const contetDiv = document.createElement("div");
  contetDiv.classList.add("content");

  const tagDiv = document.createElement("div");
  tagDiv.classList.add("tags");

  const h2Title = document.createElement("h2");
  h2Title.textContent = title;
  contetDiv.appendChild(h2Title);

  const para = document.createElement("p");
  para.textContent = body;
  contetDiv.appendChild(para);

  newDiv.appendChild(contetDiv);
  const projectGrid = document.querySelector(".project-grid");
  projectGrid.appendChild(newDiv);
}

addCard(
  "sample title",
  "Lorem ipsum dolor, sit amet consectetur aewrhoaweir  awehroa wera ahoew rowae rawehroiha wer ",
  "https://t4.ftcdn.net/jpg/03/89/39/09/360_F_389390965_lwqVX10TBdFH2WMBH6GGF8pcNiOhzfnb.jpg",
);

function removeCard(id) {
  const newDiv = document.querySelectorAll(".wrapper");
  const rmDiv = newDiv[id];
  rmDiv.remove();
}

removeCard(2);
removeCard(3);

function clearAllCard() {
  const newDiv = document.querySelectorAll(".wrapper");
  for (let i = 0; i < newDiv.length; i++) {
    const rmDiv = newDiv[i];
    rmDiv.remove();
  }

  newDiv.remove();
}

clearAllCard();
