document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const links = document.querySelector(".nav-links");
  const track = document.querySelector(".carousel-track");
  const dotsContainer = document.querySelector(".carousel-dots");

  if (menuBtn && links) {
    menuBtn.addEventListener("click", () => {
      links.classList.toggle("open");
    });
  }

  if (track && dotsContainer) {
    const slides = Array.from(track.querySelectorAll("img"));
    let currentIndex = 0;
    let timerId;

    const dots = slides.map((_, index) => {
      const dot = document.createElement("span");
      if (index === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
      return dot;
    });

    const goToSlide = (index) => {
      currentIndex = index;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === index);
      });
    };

    const startAutoSlide = () => {
      timerId = window.setInterval(() => {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex);
      }, 2000);
    };

    const stopAutoSlide = () => {
      if (timerId) window.clearInterval(timerId);
    };

    goToSlide(0);
    startAutoSlide();

    track.addEventListener("mouseenter", stopAutoSlide);
    track.addEventListener("mouseleave", startAutoSlide);
  }

  const eventCards = Array.from(document.querySelectorAll(".card--event[data-event-date]"));
  if (eventCards.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    eventCards.forEach((card) => {
      const dateValue = card.getAttribute("data-event-date");
      if (!dateValue) return;

      const eventDate = new Date(`${dateValue}T00:00:00`);
      if (Number.isNaN(eventDate.getTime())) return;

      if (eventDate < today) {
        card.remove();
      }
    });
  }
});
