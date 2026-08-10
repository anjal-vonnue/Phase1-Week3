const searchInput = document.getElementById("search-input");
const articleSection = document.querySelectorAll("article");
const noResult = document.getElementById("no-result");
console.log(articleSection);
console.log(typeof articleSection[0].innerHTML);

const originalArticleHTML = [];

for (let i = 0; i < articleSection.length; i++) {
  originalArticleHTML.push(articleSection[i].innerHTML);
}

function getQueryFromURL() {
  const querySearch = window.location.search;
  console.log(querySearch);
  const urlParams = new URLSearchParams(querySearch);
  const searchQuery = urlParams.get("search");

  return searchQuery || "";
}

function updateUrl(query) {
  console.log("updateUrl: ", query);

  const url = new URL(window.location.href);

  const trimmedQuery = query.trim();
  if (trimmedQuery) {
    console.log("inside if");

    url.searchParams.set("search", trimmedQuery);
  } else {
    url.searchParams.delete("search");
    console.log("inside else");
  }

  window.history.pushState({ search: trimmedQuery }, "", url);
}

let timer;
searchInput.addEventListener("keyup", () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    let sValue = searchInput.value.trim();
    console.log("searchValue: ", sValue);
    updateUrl(sValue);
    searchFN(sValue);
    console.log("new state: ", window.history.state);
  }, 300);
});

function searchFN(query = "") {
  console.log("query: ", query);

  for (let i = 0; i < articleSection.length; i++) {
    articleSection[i].innerHTML = originalArticleHTML[i];
  }

  let ogSearchValue = query.trim();
  let searchValue = query.trim().toLowerCase();

  //   if (searchQuery) {
  //     ogSearchValue = searchQuery.trim();
  //     searchValue = searchQuery.trim().toString();
  //   } else {
  //     ogSearchValue = searchInput.value.trim();
  //     console.log("ogSearchValue: " + ogSearchValue);
  //     searchValue = searchInput.value.trim().toLowerCase();
  //     console.log("searchValue: " + searchValue);
  //   }

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
  }
}

window.addEventListener("popstate", () => {
  searchFN(getQueryFromURL());
  console.log("pop state: ", window.history.state);
  searchInput.value = window.history.state.search;
});

function onLoad() {
  searchFN(getQueryFromURL());
  searchInput.value = getQueryFromURL();
}

onLoad();
