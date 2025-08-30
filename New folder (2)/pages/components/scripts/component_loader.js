document.addEventListener("DOMContentLoaded", () => {
  // Load Footer
  fetch("/pages/components/footer.html")
    .then((res) => res.text())
    .then((data) => {
      const footerEl = document.getElementById("footer");
      if (footerEl) footerEl.innerHTML = data;
    })
    .catch((err) => console.error("Footer load error:", err));

  // Load Search Overlay
  fetch("/pages/components/searchOverlay.html")
    .then((res) => res.text())
    .then((data) => {
      const searchEl = document.getElementById("searchComponent");
      if (searchEl) {
        searchEl.innerHTML = data;

        // Attach Search Overlay listeners AFTER loading it
        const openSearch = document.getElementById("openSearch");
        const searchOverlay = document.getElementById("searchOverlay");
        const closeSearch = document.getElementById("closeSearch");
        const searchInput = document.getElementById("searchInput");
        const searchResults = document.getElementById("searchResults");

        if (!openSearch || !searchOverlay) return;

        const openOverlay = () => {
          searchOverlay.style.display = "flex";
          searchInput.value = "";
          searchResults.innerHTML = "";
          setTimeout(() => searchInput.focus(), 0);
        };
        const closeOverlayFn = () => {
          searchOverlay.style.display = "none";
          searchInput.value = "";
          searchResults.innerHTML = "";
        };

        openSearch.addEventListener("click", openOverlay);
        closeSearch.addEventListener("click", closeOverlayFn);
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") closeOverlayFn();
        });
        searchOverlay.addEventListener("click", (e) => {
          if (e.target === searchOverlay) closeOverlayFn();
        });

        // Your product search logic...
      }
    })
    .catch((err) => console.error("Search Overlay load error:", err));
});
