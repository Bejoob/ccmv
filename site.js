document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const links = document.querySelector(".nav-links");

  if (menuBtn && links) {
    menuBtn.addEventListener("click", () => {
      links.classList.toggle("open");
    });
  }
});
