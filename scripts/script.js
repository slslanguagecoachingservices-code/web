document.addEventListener("DOMContentLoaded", () => {
  /* ===== NAVBAR ===== */
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });
  }

  /* ===== LEARNING HUB ===== */
  const learningHubLink = document.getElementById("learningHubLink");
  if (learningHubLink) {
    learningHubLink.addEventListener("click", function(event) {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        event.preventDefault();
        alert("The Learning Hub is not mobile-friendly. Please access it from a laptop, tablet, or desktop.");
      }
    });
  }

  /* ===== SLS NUMBERS ANIMATION ===== */
  const section = document.querySelector(".sls-numbers");
  if (section) {
    const numbers = section.querySelectorAll(".number-item h3");
    section.addEventListener("mouseenter", () => {
      numbers.forEach(num => {
        const originalText = num.textContent;
        const target = parseInt(originalText.replace(/\D/g, ""));
        const hasPlus = originalText.includes("+");

        let current = 0;
        const increment = Math.ceil(target / 100);

        clearInterval(num.counter);
        num.textContent = "0";

        num.counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            num.textContent = hasPlus ? target + "+" : target;
            clearInterval(num.counter);
          } else {
            num.textContent = current;
          }
        }, 30);
      });
    });
  }

  /* ===== TESTIMONIALS SLIDER ===== */
  const grid = document.getElementById('testimonialsGrid');
  const indicatorsContainer = document.getElementById('indicators');
  if (grid && indicatorsContainer) {
    let currentIndex = 0;
    let autoScrollInterval;
    let isScrolling = true;
    const cards = document.querySelectorAll('.testimonials-card');

    // Create indicators
    cards.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.className = 'indicator';
      indicator.onclick = () => goToCard(index);
      indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.indicator');

    function updateDisplay() {
      const cardWidth = 380; // 350px + 30px gap
      const offset = currentIndex * cardWidth;
      grid.style.transform = `translateX(-${offset}px)`;

      const middleIndex = (currentIndex + 1) % cards.length;

      cards.forEach((card, index) => {
        card.classList.toggle('active', index === middleIndex);
      });

      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === middleIndex);
      });
    }

    function nextCard() {
      currentIndex = (currentIndex + 1) % cards.length;
      updateDisplay();
    }

    function goToCard(index) {
      currentIndex = index;
      updateDisplay();
    }

    function startAutoScroll() {
      autoScrollInterval = setInterval(nextCard, 3000);
    }

    // Initialize
    updateDisplay();
    startAutoScroll();

    grid.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    grid.addEventListener('mouseleave', startAutoScroll);
  }

  /* ===== COURSES CAROUSEL (NEW) ===== */
  const coursesCarousel = document.querySelector('.courses-carousel');
  const coursesContainer = document.querySelector('.courses-carousel-container');
  if (coursesCarousel && coursesContainer) {
    const courseCards = coursesCarousel.querySelectorAll('.course-card');
    let currentIndex = 0;

    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-nav carousel-prev';
    prevButton.innerHTML = '‹';
    prevButton.setAttribute('aria-label', 'Previous course');

    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-nav carousel-next';
    nextButton.innerHTML = '›';
    nextButton.setAttribute('aria-label', 'Next course');

    coursesContainer.appendChild(prevButton);
    coursesContainer.appendChild(nextButton);

    function updateCarousel() {
      // Calculate card width based on screen size
      let cardWidth = 320; // Default for mobile
      const screenWidth = window.innerWidth;
      
      if (screenWidth > 1181) {
        cardWidth = 500 + 40; // card width + gap
      } else if (screenWidth > 993) {
        cardWidth = 460 + 32; // card width + gap
      } else if (screenWidth > 779) {
        cardWidth = 420 + 28; // card width + gap
      } else if (screenWidth > 601) {
        cardWidth = 380 + 24; // card width + gap
      } else if (screenWidth > 401) {
        cardWidth = 320 + 20; // card width + gap
      } else {
        cardWidth = 280 + 16; // card width + gap
      }

      const offset = currentIndex * cardWidth;
      coursesCarousel.style.transform = `translateX(-${offset}px)`;
    }

    function nextCourse() {
      currentIndex = (currentIndex + 1) % courseCards.length;
      updateCarousel();
    }

    function prevCourse() {
      currentIndex = (currentIndex - 1 + courseCards.length) % courseCards.length;
      updateCarousel();
    }

    // Event listeners
    nextButton.addEventListener('click', nextCourse);
    prevButton.addEventListener('click', prevCourse);

    // Touch/swipe support for mobile
    let startX = 0;
    let isDragging = false;

    coursesCarousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    coursesCarousel.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });

    coursesCarousel.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      
      if (Math.abs(diffX) > 50) { // Minimum swipe distance
        if (diffX > 0) {
          nextCourse(); // Swipe left - next course
        } else {
          prevCourse(); // Swipe right - previous course
        }
      }
    });

    // Keyboard navigation
    coursesContainer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevCourse();
      } else if (e.key === 'ArrowRight') {
        nextCourse();
      }
    });

    // Update on window resize
    window.addEventListener('resize', updateCarousel);

    // Initialize
    updateCarousel();
  }
});

/* ===== MENU TOGGLE ===== */
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const overlay = document.querySelector('.overlay');

if (navbarToggle && navbarMenu && overlay) {
  navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    // Close everything when clicking the overlay
    navbarToggle.classList.remove('active');
    navbarMenu.classList.remove('active');
    overlay.classList.remove('active');
  });
}