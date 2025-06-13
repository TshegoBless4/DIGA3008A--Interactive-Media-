
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', function() {
    // 1. Get DOM elements
    const mainImage = document.querySelector('.intro-image');
    const avatarContainer = document.querySelector('.avatar-options');
    const generateBtn = document.getElementById('generateAvatars');

    // 2. Path to your original image 
    const ORIGINAL_IMAGE = './Images/me.jpg';

    // 3. Create avatar helper function
    function createAvatar(imgSrc, altText) {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.className = 'avatar';
      img.alt = altText;
      img.loading = 'lazy';
      return img;
    }

    // 4. Display default avatars (including my origina;)
    function showDefaultAvatars() {
      // Clear container
      avatarContainer.innerHTML = '';
      
      // Add your original image first
      const originalImg = createAvatar(ORIGINAL_IMAGE, 'Original photo');
      avatarContainer.appendChild(originalImg);
      
      // Add 3 default API avatars
      ['default1', 'default2', 'default3'].forEach(seed => {
        const url = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
        avatarContainer.appendChild(createAvatar(url, 'Random avatar'));
      });
      
      // Set original image as default display
      const savedAvatar = localStorage.getItem('selectedAvatar');
      mainImage.src = savedAvatar || ORIGINAL_IMAGE;
    }

    // 5. Generate new random avatars
    function generateNewAvatars() {
      // Visual feedback
      generateBtn.disabled = true;
      generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
      
      // Clear container but keep original image
      avatarContainer.innerHTML = '';
      avatarContainer.appendChild(createAvatar(ORIGINAL_IMAGE, 'Original photo'));
      
      // Create 3 new random avatars
      for (let i = 0; i < 3; i++) {
        const randomSeed = Math.random().toString(36).slice(2, 10);
        const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${randomSeed}&nocache=${Date.now()}`;
        avatarContainer.appendChild(createAvatar(avatarUrl, 'New avatar'));
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
    
    // 8. Initialize - show avatars immediately
    showDefaultAvatars();
  });
}