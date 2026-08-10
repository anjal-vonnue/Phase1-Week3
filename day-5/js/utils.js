export function fetchJson() {}

export function debounce() {}

export function showToast() {
  const toastDiv = document.getElementById("toast");
  toastDiv.classList.add("show");
  setTimeout(() => {
    toastDiv.classList.remove("show");
  }, 2500);
}
