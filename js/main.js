document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".header__nav");

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.classList.toggle("is-open");
    nav.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", isOpen);
  });

  document.querySelectorAll(".header__nav a").forEach(link => {
    link.addEventListener("click", () => {
      menuButton.classList.remove("is-open");
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", false);
    });
  });
});
