const div = document.querySelectorAll(".capture");

for (let i = 0; i < div.length; i++) {
  div[i].addEventListener(
    "click",
    (e) => alert(`capturing: ${div[i].tagName}: ${i + 1}`),
    true,
  );
  div[i].addEventListener("click", (e) =>
    alert(`bubbling: ${div[i].tagName}: ${i + 1}`),
  );
}

const propDiv = document.querySelectorAll(".propagation");

for (let i = 0; i < div.length; i++) {
  propDiv[i].addEventListener("click", (e) => {
    e.stopPropagation();
    alert(`clicked on div: ${i + 1}`);
  });
}

const stopDiv = document.querySelector(".stopImm");

stopDiv.addEventListener("click", (e) => {
  alert("hello world");
  e.stopImmediatePropagation();
});

stopDiv.addEventListener("click", (e) => {
  alert("good morning");
});

const formContainer = document.getElementById("form");
console.log(formContainer);

formContainer.addEventListener("submit", (e) => {
  e.preventDefault();
});

const anchorTag = document.getElementById("google-anchor");
anchorTag.addEventListener("click", (e) => {
  e.preventDefault();
});
