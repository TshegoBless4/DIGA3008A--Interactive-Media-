if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const mainImage = document.querySelector('.intro-image');
    const avatarContainer = document.querySelector('.avatar-options');
    const generateBtn = document.getElementById('generateAvatars');

    // 1. Function to create an avatar image element
    function createAvatarElement(src, alt) {
      const img = document.createElement('img');
      img.src = src;
      img.className = 'avatar';
      img.alt = alt;
      img.loading = 'lazy';
      return img;
    }

    // 2. IMMEDIATELY DISPLAY DEFAULT AVATARS ON LOAD
    function displayInitialAvatars() {
      // Clear container
      avatarContainer.innerHTML = '';
      
      // Add original avatar
      avatarContainer.appendChild(createAvatarElement('./Images/me.jpg', 'Original'));
      
      // Add 3 default API avatars
      ['default1', 'default2', 'default3'].forEach(seed => {
        const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
        avatarContainer.appendChild(createAvatarElement(avatarUrl, 'Random avatar'));
      });
      
      // Load saved avatar if exists
      const savedAvatar = localStorage.getItem('selectedAvatar');
      if (savedAvatar) {
        mainImage.src = savedAvatar;
      } else {
        // Set first random avatar as default
        mainImage.src = "https://api.dicebear.com/7.x/bottts/svg?seed=default1";
      }
    }

    // 3. GENERATE NEW RANDOM AVATARS (FIXED)
    function generateAvatars() {
      // Clear container but keep original image
      avatarContainer.innerHTML = '';
      avatarContainer.appendChild(createAvatarElement('./Images/me.jpg', 'Original'));
      
      // Create 3 new random avatars
      for (let i = 0; i < 3; i++) {
        const randomSeed = Math.random().toString(36).substring(2, 10);
        const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${randomSeed}&nocache=${Date.now()}`;
        
        const img = createAvatarElement(avatarUrl, 'Random avatar');
        avatarContainer.appendChild(img);
      }
    }

    // 4. CLICK HANDLER
    function handleAvatarClick(e) {
      if (e.target.classList.contains('avatar') && e.target.src) {
        mainImage.src = e.target.src;
        localStorage.setItem('selectedAvatar', e.target.src);
      }
    }

    // INITIAL SETUP
    displayInitialAvatars();
    document.addEventListener('click', handleAvatarClick);
    generateBtn.addEventListener('click', generateAvatars);
  });
}