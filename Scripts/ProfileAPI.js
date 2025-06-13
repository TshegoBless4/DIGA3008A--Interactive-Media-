/**
 * AVATAR GENERATOR MODULE
 * - Handles avatar generation and selection
 * - Caches selected avatar in localStorage
 * - Uses DiceBear API for random avatars
 */

// 1. Only run on homepage (index.html or root)
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', function() {
    
    // 2. DOM Elements
    const mainImage = document.querySelector('.intro-image');
    const avatarContainer = document.querySelector('.avatar-options');
    const generateBtn = document.getElementById('generateAvatars');
    
    // 3. Cache System 
    const AVATAR_CACHE_KEY = 'selectedAvatar';
    const CACHE_EXPIRY_DAYS = 7;
    
    // 4. Load Saved Avatar 
    function loadSavedAvatar() {
      const savedAvatar = localStorage.getItem(AVATAR_CACHE_KEY);
      if (savedAvatar) {
        mainImage.src = savedAvatar;
        return true; // Found cached avatar
      }
      return false; // No cache
    }
    
    // 5. Avatar Generation 
    function generateAvatars() {
      // Show loading state
      avatarContainer.innerHTML = '<div class="loading-spinner"></div>';
      generateBtn.disabled = true;
      
      // Always include original avatar
      const avatarsHTML = `<img src="./Images/me.jpg" class="avatar" alt="Original">`;
      
      // Generate 3 random avatars with cache-busting
      const avatarPromises = [1, 2, 3].map(() => {
        const cacheBuster = Date.now(); // Prevent browser caching
        return `https://api.dicebear.com/7.x/bottts/svg?seed=${Math.random().toString(36).slice(2)}&_=${cacheBuster}`;
      });
      
      // Preload images before showing
      Promise.all(avatarPromises.map(preloadImage))
        .then(() => {
          avatarContainer.innerHTML = avatarsHTML;
          avatarPromises.forEach(url => {
            const img = document.createElement('img');
            img.src = url;
            img.className = 'avatar';
            img.alt = 'Random avatar';
            img.loading = 'lazy'; // Lazy loading
            avatarContainer.appendChild(img);
          });
        })
        .catch(error => {
          console.error("Avatar load failed:", error);
          avatarContainer.innerHTML = avatarsHTML + '<p>Failed to load new avatars</p>';
        })
        .finally(() => {
          generateBtn.disabled = false;
        });
    }
    
    // 6. Image Preloader 
    function preloadImage(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    }
    
    // 7. Event Handlers 
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('avatar')) {
        mainImage.src = e.target.src;
        localStorage.setItem(AVATAR_CACHE_KEY, e.target.src);
      }
    });
    
    generateBtn.addEventListener('click', function() {
      // Throttle button clicks (300ms cooldown)
      if (!generateBtn.disabled) generateAvatars(); 
    });
    
    // 8. Initialization
    if (!loadSavedAvatar()) {
      generateAvatars(); // Show random avatars if no cache
    }
  });
}