
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', function() {
    // 1. Get DOM elements
    const mainImage = document.querySelector('.intro-image');
    const avatarContainer = document.querySelector('.avatar-options');
    const generateBtn = document.getElementById('generateAvatars');

    // 2. Create avatar element helper
    function createAvatar(imgSrc, altText) {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.className = 'avatar';
      img.alt = altText;
      img.loading = 'lazy';
      return img;
    }

    // 3. Display DEFAULT avatars immediately
    function showDefaultAvatars() {
      // Clear container
      avatarContainer.innerHTML = '';
      
      // Add original avatar
      avatarContainer.appendChild(createAvatar('./Images/me.jpg', 'Original'));
      
      // Add 3 default API avatars (show immediately)
      const defaults = [
        'https://api.dicebear.com/7.x/bottts/svg?seed=default1',
        'https://api.dicebear.com/7.x/bottts/svg?seed=default2', 
        'https://api.dicebear.com/7.x/bottts/svg?seed=default3'
      ];
      
      defaults.forEach(url => {
        avatarContainer.appendChild(createAvatar(url, 'Default avatar'));
      });

      // Set default main image if none saved
      if (!loadSavedAvatar()) {
        mainImage.src = defaults[0];
      }
    }

    // 4. Load saved avatar from cache
    function loadSavedAvatar() {
      const saved = localStorage.getItem('selectedAvatar');
      if (saved) {
        mainImage.src = saved;
        return true;
      }
      return false;
    }

    // 5. GENERATE NEW RANDOM AVATARS (button click)
    function generateNewAvatars() {
      // Visual feedback
      generateBtn.disabled = true;
      generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
      
      // Clear existing (keep original)
      avatarContainer.innerHTML = '';
      avatarContainer.appendChild(createAvatar('./Images/me.jpg', 'Original'));
      
      // Create 3 new random avatars
      for (let i = 0; i < 3; i++) {
        const randomSeed = Math.random().toString(36).slice(2, 10);
        const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${randomSeed}&nocache=${Date.now()}`;
        
        const img = createAvatar(avatarUrl, 'Random avatar');
        avatarContainer.appendChild(img);
      }
      
      // Reset button
      setTimeout(() => {
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<i class="fas fa-random"></i> New Avatars';
      }, 500);
    }

    // 6. Handle avatar selection
    function handleAvatarClick(e) {
      if (e.target.classList.contains('avatar') && e.target.src) {
        mainImage.src = e.target.src;
        localStorage.setItem('selectedAvatar', e.target.src);
      }
    }

    // 7. Set up event listeners
    generateBtn.addEventListener('click', generateNewAvatars);
    avatarContainer.addEventListener('click', handleAvatarClick);
    
    // 8. Initialize
    showDefaultAvatars();
  });
}