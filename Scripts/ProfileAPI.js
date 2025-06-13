

// 1. Initialize when homepage loads
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', function() {
    
    // 2. Get DOM elements
    const mainImage = document.querySelector('.intro-image');
    const avatarContainer = document.querySelector('.avatar-options');
    const generateBtn = document.getElementById('generateAvatars');

    // 3. Load saved avatar if exists
    const savedAvatar = localStorage.getItem('selectedAvatar');
    if (savedAvatar) {
      mainImage.src = savedAvatar;
    }

    // 4. Generate random avatars from API
    function generateAvatars() {
      avatarContainer.innerHTML = `
        <img src="./Images/me.jpg" class="avatar" alt="Original">
      `;

      // Create 3 random robot avatars
      [1, 2, 3].forEach(() => {
        const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${Math.random().toString(36).slice(2)}`;
        const img = document.createElement('img');
        img.src = avatarUrl;
        img.className = 'avatar';
        img.alt = 'Random avatar';
        avatarContainer.appendChild(img);
      });
    }

    // 5. Handle avatar clicks
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('avatar')) {
        mainImage.src = e.target.src;
        localStorage.setItem('selectedAvatar', e.target.src);
      }
    });

    // 6. Initial setup
    generateAvatars();
    generateBtn.addEventListener('click', generateAvatars);
  });
}