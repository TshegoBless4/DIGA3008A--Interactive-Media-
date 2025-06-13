

// 1. Only run on homepage (index.html or root)
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', function() {
    
    // 2. DOM Elements
    const mainImage = document.querySelector('.intro-image');
    const avatarContainer = document.querySelector('.avatar-options');
    const generateBtn = document.getElementById('generateAvatars');
    
    // 3. Cache System
    const AVATAR_CACHE_KEY = 'selectedAvatar';
    
    // 4. Function to create avatar element
    function createAvatarElement(src, alt) {
      const img = document.createElement('img');
      img.src = src;
      img.className = 'avatar';
      img.alt = alt || 'Random avatar';
      img.loading = 'lazy';
      return img;
    }
    
    // 5. Display default avatars immediately
    function displayDefaultAvatars() {
      // Clear container
      avatarContainer.innerHTML = '';
      
      // Add original avatar
      avatarContainer.appendChild(createAvatarElement('./Images/me.jpg', 'Original'));
      
      // Add 3 default API avatars (these will show immediately)
      const defaultAvatars = [
        'https://api.dicebear.com/7.x/bottts/svg?seed=default1',
        'https://api.dicebear.com/7.x/bottts/svg?seed=default2',
        'https://api.dicebear.com/7.x/bottts/svg?seed=default3'
      ];
      
      defaultAvatars.forEach(url => {
        avatarContainer.appendChild(createAvatarElement(url));
      });
      
      // Set first avatar as default if none saved
      if (!loadSavedAvatar()) {
        mainImage.src = defaultAvatars[0];
      }
    }
    
    // 6. Load Saved Avatar
    function loadSavedAvatar() {
      const savedAvatar = localStorage.getItem(AVATAR_CACHE_KEY);
      if (savedAvatar) {
        mainImage.src = savedAvatar;
        return true;
      }
      return false;
    }
    
    // 7. Generate new random avatars (original functionality)
    function generateAvatars() {
      // Show loading state
      avatarContainer.innerHTML = '<div class="loading-spinner"></div>';
      generateBtn.disabled = true;
      
      // Keep original avatar
      avatarContainer.appendChild(createAvatarElement('./Images/me.jpg', 'Original'));
      
      // Generate 3 new random avatars
      [1, 2, 3].forEach(() => {
        const randomSeed = Math.random().toString(36).slice(2);
        const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${randomSeed}&_=${Date.now()}`;
        const img = createAvatarElement(avatarUrl);
        avatarContainer.appendChild(img);
      });
      
      generateBtn.disabled = false;
    }
    
    // 8. Event Handlers
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('avatar') && e.target.src) {
        mainImage.src = e.target.src;
        localStorage.setItem(AVATAR_CACHE_KEY, e.target.src);
      }
    });
    
    generateBtn.addEventListener('click', function() {
      if (!generateBtn.disabled) generateAvatars();
    });
    
    // 9. Initialization
    displayDefaultAvatars(); // Show avatars immediately on load
  });
}