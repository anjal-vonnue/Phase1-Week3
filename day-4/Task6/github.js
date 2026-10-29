let controller = null;

function showError(visible, error = "") {
  const errorEl = document.getElementById("error");
  const errorText = document.getElementById("error-text");
  if (visible) {
    errorEl.style.display = "block";
    errorText.textContent = error;
  } else {
    errorEl.style.display = "none";
    errorText.textContent = "";
  }
}

async function fetchUserData(username, signal) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      signal,
    });

    if (!response.ok) {
      if (response.status === 404) {
        showError(true, "user not found");
        return;
      }

      if (response.status === 403 && response.status === 429) {
        showError(true, "rate limit exceeded");
        return;
      }
      throw new Error("username not found");
    }
    const data = await response.json();
    //   console.log(response);

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    showError(true, error);
  }
}

async function fetchRepoData(username, signal) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      { signal },
    );
    if (!response.ok) {
      throw new Error("error while fetching repos");
    }

    const repoData = await response.json();
    //   console.log(repoData);

    const sortedRepos = repoData.sort(
      (a, b) => b.stargazers_count - a.stargazers_count,
    );

    const topRepos = sortedRepos.slice(0, 6);
    // console.log(topRepos.length);

    return topRepos;
  } catch (error) {
    console.log(error);
  }
}

// const result = await fetchUserData("2");
// const repo = await fetchRepoData("anjalxbt");

// console.log(result.avatar_url);
// console.log(result.name);
// console.log(result.bio);
// console.log(result.location);
// console.log(result.followers);
// console.log(result.following);

const submitBtn = document.getElementById("search-button");
const userNameEl = document.getElementById("name");
const bioEl = document.getElementById("bio");
const locationEl = document.getElementById("location");
const followersEL = document.getElementById("followers");
const followingEl = document.getElementById("following");
const imageEl = document.getElementById("image");
const repoEl = document.getElementById("repo-container");
const githubCard = document.getElementById("github-card");

submitBtn.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    githubCard.style.display = "none";
    showError(false);

    if (controller) {
      controller.abort();
    }
    controller = new AbortController();

    const signal = controller.signal;

    repoEl.innerHTML = "";
    imageEl.src = "";
    const userName = document.getElementById("github-id").value.trim();
    if (userName) {
      const userData = await fetchUserData(userName, signal);
      const topRepos = await fetchRepoData(userName, signal);
      console.log(userData);

      userNameEl.textContent = userData.name;
      bioEl.textContent = userData.bio;
      locationEl.textContent = userData.location;
      followersEL.textContent = userData.followers;
      followingEl.textContent = userData.following;
      imageEl.src = userData.avatar_url;

      topRepos.forEach((repo) => {
        const div = document.createElement("div");
        div.classList.add("repo");
        const innerContent = `
              <p>Repo Name: <span> ${repo.name}</span></p>
              <p>Stars: <span>${repo.stargazers_count}</span></p>
              <p>Desc: <span>${repo.description}</span></p>
              <p>lang: <span>${repo.language}</span></p>
              `;
        div.innerHTML = innerContent;
        repoEl.appendChild(div);
      });

      githubCard.style.display = "flex";
    }
  } catch (error) {
    console.log(error);
  }
});
