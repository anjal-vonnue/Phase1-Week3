const postContainer = document.getElementById("post-container");
const sentinelDiv = document.getElementById("sentinel-div");
const spinnerDiv = document.getElementById("spinner-div");
const maxDiv = document.getElementById("max");
const errorDiv = document.getElementById("error");
let count = 0;
let loading = false;

const retryBtn = document.getElementById("retry-button");
retryBtn.addEventListener("click", loadPosts);

function showRetry(visible) {
  if (visible) {
    errorDiv.style.display = "flex";
  } else {
    errorDiv.style.display = "none";
  }
}

function showSpinner(visible) {
  if (visible) {
    spinnerDiv.style.display = "block";
  } else {
    spinnerDiv.style.display = "none";
  }
}

async function loadPosts() {
  if (loading) return;
  loading = true;
  try {
    showRetry(false);
    showSpinner(true);
    const startingPoint = count * 10;
    const posts = await fetchPosts(startingPoint);
    render(posts);
    count++;
  } catch (error) {
    console.log(error);
    showRetry(true);
    showSpinner(false);
  } finally {
    loading = false;
  }
}

const observer = new IntersectionObserver(async (entries) => {
  if (entries[0].isIntersecting) {
    if (count * 10 <= 90) {
      console.log("count: ", count);
      await loadPosts();
    } else {
      console.log("count: ", count);

      showSpinner(false);
      maxDiv.style.display = "block";
    }
  }
}, {});

observer.observe(sentinelDiv);

function render(posts) {
  posts.forEach((post) => {
    const article = document.createElement("article");
    const content = `<header><h3>${post.title}</h3></header>
                     <p>${post.body}</p>`;
    article.innerHTML = content;

    postContainer.appendChild(article);
  });
  showSpinner(false);
}

async function fetchPosts(number = 0) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${number}&_limit=10`,
  );

  if (!response.ok) {
    throw new Error("errow while fetching posts");
  }

  const posts = await response.json();
  return posts;
}

async function onLoad() {
  const posts = await fetchPosts();
  render(posts);
}

onLoad();
