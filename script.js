// Toggle mobile menu visibility
const hamburgerIcon = document.getElementById("hamburger-icon");
const mobileNav = document.getElementById("mobile-nav");

// Open mobile menu when hamburger icon is clicked
hamburgerIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  mobileNav.classList.toggle("active");
});

// Close the mobile menu when clicking anywhere outside the menu
document.addEventListener("click", (event) => {
  if (!mobileNav.contains(event.target) && event.target !== hamburgerIcon) {
    mobileNav.classList.remove("active");
  }
});

// Prevent the menu from closing when clicking inside it
mobileNav.addEventListener("click", (event) => {
  event.stopPropagation();
});

// Carousel functionality
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const devices = document.querySelectorAll(".device-wrapper");
  const dots = document.querySelectorAll(".carousel-dot");
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");

  let currentIndex = 0;
  let startX;
  let currentX;
  let isDragging = false;
  let initialPosition = 0;

  function updateCarousel() {
    const offset = -currentIndex * (devices[0].offsetWidth + 32); // 32 is the gap (2rem)
    carousel.style.transform = `translateX(${offset}px)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function handleDragStart(e) {
    isDragging = true;
    startX = e.type === "mousedown" ? e.pageX : e.touches[0].pageX;
    initialPosition = carousel.getBoundingClientRect().left;
    e.preventDefault();
  }

  function handleDragMove(e) {
    if (!isDragging) return;

    currentX = e.type === "mousemove" ? e.pageX : e.touches[0].pageX;
    const diff = currentX - startX;
    const offset = -currentIndex * (devices[0].offsetWidth + 32);

    carousel.style.transform = `translateX(${offset + diff}px)`;
  }

  function handleDragEnd() {
    if (!isDragging) return;

    isDragging = false;
    const diff = currentX - startX;

    if (Math.abs(diff) > 100) {
      if (diff > 0 && currentIndex > 0) {
        currentIndex--;
      } else if (diff < 0 && currentIndex < devices.length - 1) {
        currentIndex++;
      }
    }

    updateCarousel();
  }

  // Add touch and mouse event listeners
  carousel.addEventListener("mousedown", handleDragStart);
  carousel.addEventListener("touchstart", handleDragStart);

  document.addEventListener("mousemove", handleDragMove);
  document.addEventListener("touchmove", handleDragMove);

  document.addEventListener("mouseup", handleDragEnd);
  document.addEventListener("touchend", handleDragEnd);

  // Navigation buttons
  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < devices.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  // Auto-advance carousel
  setInterval(() => {
    currentIndex = (currentIndex + 1) % devices.length;
    updateCarousel();
  }, 5000);

  // Dark mode toggle
const toggle = document.getElementById("dark-mode-toggle");
const body = document.body;
const screenshots = document.querySelectorAll('.screenshot');

function swapImages(isDark) {
  screenshots.forEach(img => {
    if (isDark) {
      // Store the light mode src for later
      img.dataset.lightSrc = img.src;
      // Switch to dark mode image if specified
      if (img.dataset.darkSrc) {
        img.src = img.dataset.darkSrc;
      }
    } else {
      // Switch back to light mode image if we stored it
      if (img.dataset.lightSrc) {
        img.src = img.dataset.lightSrc;
      }
    }
  });
}

// Check initial dark mode state
if (localStorage.getItem("dark-mode") === "enabled") {
  body.classList.add("dark-mode");
  toggle.checked = true;
  swapImages(true);
}

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    body.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "enabled");
    swapImages(true);
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "disabled");
    swapImages(false);
  }
});
  

  // Initial position
  updateCarousel();
});
