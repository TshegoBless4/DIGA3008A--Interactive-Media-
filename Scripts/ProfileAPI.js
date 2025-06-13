
// Only run on homepage (either index.html or root)
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', function() {
    
    
    const mainImage = document.querySelector('.intro-image');          // Main display image
    const avatarContainer = document.querySelector('.avatar-options'); // Container for avatar options
    const generateBtn = document.getElementById('generateAvatars');    // Generate new avatars button

    const savedAvatar = localStorage.getItem('selectedAvatar');
    if (savedAvatar) {
      mainImage.src = savedAvatar;  // Use saved avatar if available
    }

   
    // ======================
    function generateAvatars() {
      // Clear container but keep original image
      avatarContainer.innerHTML = `
        <img src="./Images/me.jpg" class="avatar" alt="Original" loading="lazy">
      `;

      // Create 3 random robot avatars with performance optimizations
      [1, 2, 3].forEach(() => {
        // Generate unique URL with cache busting
        const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${Math.random().toString(36).slice(2)}&nocache=${Date.now()}`;
        
        // Create image element with optimizations
        const img = new Image();  // Faster than createElement('img')
        img.src = avatarUrl;
        img.className = 'avatar';
        img.alt = 'Random avatar';
        img.loading = 'lazy';     // Lazy loading for better performance
        img.crossOrigin = 'anonymous'; // Handle CORS properly
        
        avatarContainer.appendChild(img);
      });
    }

   
    function handleAvatarClick(e) {
      // Only handle clicks on avatar images
      if (e.target.classList.contains('avatar') && e.target.src) {
        mainImage.src = e.target.src;
        localStorage.setItem('selectedAvatar', e.target.src);
      }
    }

    // Use event delegation for better performance
    document.body.addEventListener('click', handleAvatarClick);

   
    
    // Generate avatars immediately on page load
    generateAvatars(); 
    
    // Set up generate button click handler
    generateBtn.addEventListener('click', function() {
      // Add slight delay to prevent rapid clicking
      generateBtn.disabled = true;
      generateAvatars();
      setTimeout(() => generateBtn.disabled = false, 300);
    });

    
  });
}