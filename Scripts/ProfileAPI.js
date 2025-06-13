

if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', function() {
    // 1. DOM Elements
    const mainImage = document.querySelector('.intro-image');
    const avatarContainer = document.querySelector('.avatar-options');
    const generateBtn = document.getElementById('generateAvatars');

    // 2. Image Path (confirmed to be ./Images/me.jpg)
    const ORIGINAL_IMAGE_PATH = './Images/me.jpg';

    // 3. Create avatar element with error handling
    function createAvatar(src, alt, isOriginal = false) {
      const img = new Image();
      img.className = 'avatar' + (isOriginal ? ' original-avatar' : '');
      img.alt = alt;
      
      // Error handling for your original image
      img.onerror = function() {
        console.error('Failed to load image:', src);
        if (isOriginal) {
          // Fallback - show a placeholder if your image fails
          img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="gold"/><text x="50" y="50" font-size="8" text-anchor="middle" fill="black">Your Photo</text></svg>';
        }
      };
      
      img.src = src;
      return img;
    }

    // 4. Display avatars with original first
    function displayAvatars() {
      avatarContainer.innerHTML = '';
      
      // original image - added first and prominently
      const originalImg = createAvatar(ORIGINAL_IMAGE_PATH, 'Your original photo', true);
      avatarContainer.appendChild(originalImg);
      
      // Default DiceBear avatars
      ['default1', 'default2', 'default3'].forEach(seed => {
        const url = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
        avatarContainer.appendChild(createAvatar(url, 'Generated avatar'));
      });
      
      // Set display image - prioritize original
      const savedAvatar = localStorage.getItem('selectedAvatar');
      mainImage.src = savedAvatar || ORIGINAL_IMAGE_PATH;
    }

    // 5. Generate new avatars (keeping original)
    function generateNewAvatars() {
      generateBtn.disabled = true;
      
      // Clear but preserve original
      avatarContainer.innerHTML = '';
      avatarContainer.appendChild(createAvatar(ORIGINAL_IMAGE_PATH, 'Your original photo', true));
      
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