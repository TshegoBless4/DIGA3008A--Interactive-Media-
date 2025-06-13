
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.includes('DIGA3008A')) {
  document.addEventListener('DOMContentLoaded', function() {
    // 1. Get DOM elements
    const mainImage = document.querySelector('.intro-image');
    const avatarContainer = document.querySelector('.avatar-options');
    const generateBtn = document.getElementById('generateAvatars');

    // 2. GitHub Pages compatible image path
    function getImagePath() {
      // Check if we're on GitHub Pages
      if (window.location.hostname.includes('github.io')) {
        return '/DIGA3008A--Interactive-Media-/Images/me.jpg';
      }
      // Local development path
      return './Images/me.jpg';
    }
    const ORIGINAL_IMAGE_PATH = getImagePath();

    // 3. Create avatar with error handling
    function createAvatar(src, alt, isOriginal = false) {
      const img = new Image();
      img.className = 'avatar' + (isOriginal ? ' original-avatar' : '');
      img.alt = alt;
      
      // Special handling for original image
      if (isOriginal) {
        img.onerror = function() {
          console.error('Original image failed to load:', src);
          // Fallback SVG if your image doesn't load
          img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="gold"/><text x="50" y="50" font-size="8" text-anchor="middle" fill="black">Photo</text></svg>';
        };
      }
      
      img.src = src;
      return img;
    }

    // 4. Display avatars - original first
    function displayAvatars() {
      avatarContainer.innerHTML = '';
      
      // Your original image - first and prominent
      const originalImg = createAvatar(ORIGINAL_IMAGE_PATH, 'Your photo', true);
      avatarContainer.appendChild(originalImg);
      
      // Default avatars
      ['default1', 'default2', 'default3'].forEach(seed => {
        const url = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
        avatarContainer.appendChild(createAvatar(url, 'Avatar'));
      });
      
      // Set display image
      const savedAvatar = localStorage.getItem('selectedAvatar');
      mainImage.src = savedAvatar || ORIGINAL_IMAGE_PATH;
    }

    // 5. Generate new avatars
    function generateNewAvatars() {
      generateBtn.disabled = true;
      
      // Clear but keep original
      avatarContainer.innerHTML = '';
      avatarContainer.appendChild(createAvatar(ORIGINAL_IMAGE_PATH, 'Your photo', true));
      
      // Generate new random avatars
      for (let i = 0; i < 3; i++) {
        const randomSeed = Math.random().toString(36).slice(2, 10);
        const url = `https://api.dicebear.com/7.x/bottts/svg?seed=${randomSeed}&nocache=${Date.now()}`;
        avatarContainer.appendChild(createAvatar(url, 'New avatar'));
      }
      
      generateBtn.disabled = false;
    }

    // 6. Event listeners
    avatarContainer.addEventListener('click', function(e) {
      if (e.target.classList.contains('avatar')) {
        mainImage.src = e.target.src;
        localStorage.setItem('selectedAvatar', e.target.src);
      }
    });

    generateBtn.addEventListener('click', generateNewAvatars);
    
    // 7. Initialize
    displayAvatars();
  });
}