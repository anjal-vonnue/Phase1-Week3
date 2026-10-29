const searchInput = document.getElementById("search-input");

const articleSection = document.querySelectorAll("article");

const noResult = document.getElementById("no-result");

console.log(articleSection);

console.log(typeof articleSection[0].innerHTML);

searchInput.addEventListener("search", () => {
  searchFN();
});

let timer;
searchInput.addEventListener("keyup", () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    searchFN();
  }, 300);
});

function searchFN() {
  for (let i = 0; i < articleSection.length; i++) {
    articleSection[i].innerHTML = articleSection[i].innerHTML.replace(
      /<span class="highlight">(.*?)<\/span>/gi,
      "$1",
    );
  }

  const ogSearchValue = searchInput.value.trim();
  console.log("ogSearchValue: " + ogSearchValue);
  const searchValue = searchInput.value.trim().toLowerCase();
  console.log("searchValue: " + searchValue);

  let articleCount = 0;

  for (let i = 0; i < articleSection.length; i++) {
    let ogArticleContent = articleSection[i].innerHTML;
    let articleContent = articleSection[i].innerHTML.toLowerCase();
    if (articleContent.includes(searchValue)) {
      articleSection[i].style.display = "block";
      articleCount++;

      articleSection[i].innerHTML = articleSection[i].innerHTML.replace(
        ogSearchValue,
        `<span class="highlight">${ogSearchValue}</span>`,
      );
    } else {
      articleSection[i].style.display = "none";
    }

    if (articleCount == 0) {
      noResult.style.display = "block";
    }
  }
}
