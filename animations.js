// Search bar animation

const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector("#search-input");

searchBtn.addEventListener("click", openSearchBar);
function openSearchBar() {
  searchInput.classList.toggle("active");
  searchInput.focus();
}
