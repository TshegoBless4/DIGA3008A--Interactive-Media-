

if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const mainImage = document.querySelector('.intro-image');
    const avatarContainer = document.querySelector('.avatar-options');
    const generateBtn = document.getElementById('generateAvatars');

    // 1. IMMEDIATELY DISPLAY DEFAULT AVATARS ON LOAD
    function displayInitialAvatars() {
      // Original avatar
      avatarContainer.innerHTML = `
        <img src="./Images/me.jpg" class="avatar" alt="Original">
        <img src="https://api.dicebear.com/7.x/bottts/svg?seed=default1" class="avatar" alt="Random avatar 1" loading="lazy">
        <img src="https://api.dicebear.com/7.x/bottts/svg?seed=default2" class="avatar" alt="Random avatar 2" loading="lazy">
        <img src="https://api.dicebear.com/7.x/bottts/svg?seed=default3" class="avatar" alt="Random avatar 3" loading="lazy">
      `;
      
      // Load saved avatar if exists
      const savedAvatar = localStorage.getItem('selectedAvatar');
      if (savedAvatar) {
        mainImage.src = savedAvatar;
      } else {
        // Set first random avatar as default
        mainImage.src = "https://api.dicebear.com/7.x/bottts/svg?seed=default1";
      }
    }

    // 2. GENERATE NEW RANDOM AVATARS (original function)
    function generateAvatars() {
      avatarContainer.innerHTML = `
        <img src="./Images/me.jpg" class="avatar" alt="Original">
      `;

      [1, 2, 3].forEach(() => {
        const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${Math.random().toString(36).slice(2)}`;
        const img = document.createElement('img');
        img.src = avatarUrl;
        img.className = 'avatar';
        img.alt = 'Random avatar';
        img.loading = 'lazy';
        avatarContainer.appendChild(img);
      });
    }

    // 3. CLICK HANDLER (unchanged)
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('avatar')) {
        mainImage.src = e.target.src;
        localStorage.setItem('selectedAvatar', e.target.src);
      }
    });

    // INITIAL SETUP
    displayInitialAvatars(); // Show avatars immediately
    generateBtn.addEventListener('click', generateAvatars);
  });
}