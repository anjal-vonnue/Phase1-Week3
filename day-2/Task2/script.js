const todoList = document.getElementById("todo-list");

todoList.onclick = function (e) {
  let tagName = e.target.tagName;
  console.log(tagName);
  if (tagName === "BUTTON") {
    let li = e.target.closest("li");
    console.log(li);
    li.remove();
  }
  if (tagName === "INPUT") {
    let pTag = e.target.closest("li").querySelector("p");
    if (e.target.checked) {
      pTag.classList.add("strike");
    } else {
      pTag.classList.remove("strike");
    }
  }
  if (tagName === "P") {
    e.target.contentEditable = true;
  }

  if (tagName === "DIV") {
    let ul = e.target.closest("ul");
    const listItem = document.createElement("li");
    const inputItem = document.createElement("input");
    inputItem.setAttribute("type", "checkbox");
    const pItem = document.createElement("p");
    pItem.textContent = "write your task";
    const buttonItem = document.createElement("button");
    buttonItem.setAttribute("type", "button");
    buttonItem.textContent = "delete";
    listItem.appendChild(inputItem);
    listItem.appendChild(pItem);
    listItem.appendChild(buttonItem);
    ul.appendChild(listItem);
  }
};
