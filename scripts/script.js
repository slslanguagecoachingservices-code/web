//alert("External JS file is linked properly!");

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
});


/* ===== PROGRAMS SLIDER ===== */
const programsGrid = document.getElementById('programsGrid');
const cards = document.querySelectorAll('.course-card');

if (programsGrid && cards.length > 0) {
  let currentIndex = 0;
  let autoScrollInterval;

  function updateDisplay() {
    const cardWidth = 320; // 300px + ~20px gap
    const offset = currentIndex * cardWidth;
    programsGrid.style.transform = `translateX(-${offset}px)`;

    // Highlight the middle card of the 3 visible
    cards.forEach((card, index) => {
      const middleIndex = currentIndex + 1; // always center of 3
      card.classList.toggle('active', index === middleIndex);
    });
  }

  function nextCard() {
    // Keep looping so that 3 cards are always visible
    currentIndex = (currentIndex + 1) % (cards.length - 2);
    updateDisplay();
  }

  function startAutoScroll() {
    autoScrollInterval = setInterval(nextCard, 4000); // 4s per move
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  // Init
  updateDisplay();
  startAutoScroll();

  programsGrid.addEventListener('mouseenter', stopAutoScroll);
  programsGrid.addEventListener('mouseleave', startAutoScroll);
}

/*MENU TOGGLE*/
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const overlay = document.querySelector('.overlay');

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
