// window.onload = function () {
//   const progressBar = document.querySelector(".progress");
//   let progress = 0;

//   const interval = setInterval(() => {
//     progress += 5;
//     progressBar.style.width = `${progress}%`;

//     if (progress >= 100) {
//       clearInterval(interval);

//       const loader = document.getElementById("loader");
//       loader.style.opacity = 0;
//       loader.style.transition = "opacity 0.5s ease";

//       setTimeout(() => {
//         loader.remove();
//         progressBar.style.animation = "none";
//       }, 500);
//     }
//   }, 100);
// };

// const sections
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuDiv = document.getElementById("mobile-menu-div");

// mobile menu
let IsOpen = false;
mobileMenu.addEventListener("click", () => {
  IsOpen = !IsOpen;
  if (IsOpen) {
    mobileMenu.innerHTML = `
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.2309 19.4732L11.9563 16.2608L13.0496 18.5691L13.2893 19.0754L13.8462 19.1354L19.7685 19.7734L21.7679 19.9888L20.733 18.2645L16.3279 10.9249L20.8366 4.03857L21.9025 2.41065L19.9584 2.49166L14.6582 2.71252L14.0963 2.73594L13.8244 3.22831L12.1662 6.23168L10.3728 2.56103L10.041 1.8818L9.29702 2.01585L4.12128 2.94836L2.58732 3.22474L3.47792 4.5039L7.93595 10.907L3.1745 17.8712L2.22887 19.2543L3.89508 19.4301L9.24501 19.9945L9.91303 20.065L10.2309 19.4732Z" fill="white" stroke="#250061" stroke-width="2"/>
    </svg> 
    `;
    mobileMenuDiv.classList.remove("!opacity-0");
    mobileMenuDiv.classList.remove("!invisible");
    mobileMenuDiv.classList.add("!opacity-100");
    mobileMenuDiv.classList.add("!visible");
  } else {
    mobileMenu.innerHTML = `
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 2H6C5.448 2 5 1.552 5 1C5 0.448 5.448 0 6 0H19C19.552 0 20 0.448 20 1C20 1.552 19.552 2 19 2ZM20 7C20 6.448 19.552 6 19 6H1C0.448 6 0 6.448 0 7C0 7.552 0.448 8 1 8H19C19.552 8 20 7.552 20 7ZM20 13C20 12.448 19.552 12 19 12H10C9.448 12 9 12.448 9 13C9 13.552 9.448 14 10 14H19C19.552 14 20 13.552 20 13Z" fill="white"/>
    </svg>
    `;
    mobileMenuDiv.classList.remove("!opacity-100");
    mobileMenuDiv.classList.remove("!visible");
    mobileMenuDiv.classList.add("!opacity-0");
    mobileMenuDiv.classList.add("!invisible");
  }
});

document.querySelectorAll(".openModal").forEach((button) => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("modal-hidden");
      setTimeout(() => {
        modal
          .querySelector(".custom-modal-content")
          .classList.add("custom-modal-open");
      }, 10);
    }
  });
});

document.querySelectorAll(".closeModal").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".custom-modal");
    if (modal) {
      const modalContent = modal.querySelector(".custom-modal-content");
      modalContent.classList.add("custom-modal-close");
      setTimeout(() => {
        modal.classList.add("modal-hidden");
        modalContent.classList.remove(
          "custom-modal-close",
          "custom-modal-open"
        );
      }, 300);
    }
  });
});
