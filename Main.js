
document.addEventListener("DOMContentLoaded", function () {
  // ===== Configuration =====
  const config = {
    gridSize: 60, // Must match CSS grid size
    pulseCount: [4, 8], // Min/Max pulses visible
    pulseSize: [10, 20], // Min/Max pulse size 
    pulseInterval: [4000, 6000], // Min/Max time between changes (ms)
  };

  
  


  // for Animation 
  let animationTimeout;
  let resizeTimeout;

  // Main function that creates and manages the grid pulses
  function initPulses() {
    // Clear existing pulses
    document.querySelectorAll(".grid-pulse").forEach((el) => el.remove());

    // Calculate grid columns, +1 ensures it covers the screen view 
    const cols = Math.ceil(window.innerWidth / config.gridSize) + 1;
    const rows = Math.ceil(window.innerHeight / config.gridSize) + 1;

    // Create pulses randomly
    const count = randomInRange(...config.pulseCount);
    for (let i = 0; i < count; i++) {
      const pulse = document.createElement("div");
      pulse.className = "grid-pulse";


      // Set random position within grid
      pulse.style.setProperty(
        "--x-pos",
        `${randomInRange(0, cols) * config.gridSize}px`
      );
      pulse.style.setProperty(
        "--y-pos",
        `${randomInRange(0, rows) * config.gridSize}px`
      );
      // Set random size and animation properties
      pulse.style.setProperty(
        "--pulse-size",
        `${randomInRange(...config.pulseSize)}px`
      );
      pulse.style.setProperty("--pulse-delay", `${Math.random() * 3}s`);
      pulse.style.setProperty("--pulse-duration", `${2 + Math.random() * 2}s`);

      document.body.appendChild(pulse);
    }

    // Schedule next update of the pulse
    animationTimeout = setTimeout(
      initPulses,
      randomInRange(...config.pulseInterval)
    );
  }

  //  Helpers that generate a random number between min and max 
  function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initPulses, 100);
  }

  // Set up event listener for window resize
  window.addEventListener("resize", handleResize);
  setTimeout(initPulses, 1000); // Delay for page load

  // Clear timeouts and remove styles when page unloads

  window.addEventListener("beforeunload", () => {
    clearTimeout(animationTimeout);
    clearTimeout(resizeTimeout);
    document.head.removeChild(style);
  });
});


//universal back-to-top button that will be used across the pages
document.addEventListener("DOMContentLoaded", function () {
  
  if (!document.getElementById("scrollToTopBtn")) {
    const scrollBtn = document.createElement("button");
    scrollBtn.id = "scrollToTopBtn";
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.setAttribute("aria-label", "Scroll to top");
    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener("scroll", function () {
      const scrollBtn = document.getElementById("scrollToTopBtn");
      if (scrollBtn) {
        scrollBtn.style.opacity = window.scrollY > 300 ? "1" : "0";
      }
    });

    // smooth Scroll to top when clicked
    document
      .getElementById("scrollToTopBtn")
      .addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  }
});


document.addEventListener('DOMContentLoaded', function() {
    // Creating fullscreen overlay elements, the dark background overlay div
    const overlay = document.createElement('div');
    overlay.className = 'image-overlay';
    //the image element that will show the enlarged photo
    const overlayImg = document.createElement('img');
    overlayImg.className = 'overlay-image';
    
    overlay.appendChild(overlayImg);
    document.body.appendChild(overlay);//the image will be put inside the overlay div
    
    // Adding  click event to all images except the logo image 
    const images = document.querySelectorAll('img:not(#logo-img)');
    
    images.forEach(img => {
        img.addEventListener('click', function() {
            overlayImg.src = this.src;
            overlayImg.alt = this.alt || 'Enlarged image';
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close overlay when clicked. User can click anywhere on the overlay to close
    overlay.addEventListener('click', function() {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
});