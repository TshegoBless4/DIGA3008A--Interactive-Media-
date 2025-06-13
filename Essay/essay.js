

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the essay gallery page
    const essayCards = document.querySelectorAll('.essay-card');
    
    if (essayCards.length > 0) {
        // Gallery page: Make cards clickable
        essayCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = this.querySelector('a').getAttribute('href');
            });
        });
    } else {
        // Individual essay page: Create navigation
        
        // List of all essay URLs in order
        const essayUrls = [
            '../Essay/Essay.html',
            '../Essay/EssayTwo.html',
            '../Essay/EssayThree.html'
        ];
        
        // Get current page filename
        const currentPage = window.location.pathname.split('/').pop();
        const currentIndex = essayUrls.findIndex(url => url.includes(currentPage));
        
        if (currentIndex !== -1) {
            // Create navigation container
            const navContainer = document.createElement('div');
            navContainer.className = 'essay-navigation';
            
            // Previous button (left arrow)
            if (currentIndex > 0) {
                const prevButton = document.createElement('button');
                prevButton.className = 'nav-button prev-button';
                prevButton.innerHTML = '<span>Previous Essay</span>'; // Accessible text
                prevButton.addEventListener('click', () => {
                    window.location.href = essayUrls[currentIndex - 1];
                });
                navContainer.appendChild(prevButton);
            }
            
            // Next button (right arrow)
            if (currentIndex < essayUrls.length - 1) {
                const nextButton = document.createElement('button');
                nextButton.className = 'nav-button next-button';
                nextButton.innerHTML = '<span>Next Essay</span>'; // Accessible text
                nextButton.addEventListener('click', () => {
                    window.location.href = essayUrls[currentIndex + 1];
                });
                navContainer.appendChild(nextButton);
            }
            
            // Add to page
            document.body.appendChild(navContainer);
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the essay gallery page
    const essayCards = document.querySelectorAll('.essay-card');
    
    if (essayCards.length > 0) {
        // Gallery page: Make cards clickable
        essayCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = this.querySelector('a').getAttribute('href');
            });
        });
    } else {
        // Individual essay page: Create navigation
        
        // List of all essay URLs in order
        const essayUrls = [
            '../Essay/Essay.html',
            '../Essay/EssayTwo.html',
            '../Essay/EssayThree.html'
        ];
        
        // Get current page filename
        const currentPage = window.location.pathname.split('/').pop();
        const currentIndex = essayUrls.findIndex(url => url.includes(currentPage));
        
        if (currentIndex !== -1) {
            // Create navigation container
            const navContainer = document.createElement('div');
            navContainer.className = 'essay-navigation';
            
            // Previous button (left arrow)
            if (currentIndex > 0) {
                const prevButton = document.createElement('button');
                prevButton.className = 'nav-button prev-button';
                prevButton.innerHTML = '<span>Previous Essay</span>'; // Accessible text
                prevButton.addEventListener('click', () => {
                    window.location.href = essayUrls[currentIndex - 1];
                });
                navContainer.appendChild(prevButton);
            }
            
            // Next button (right arrow)
            if (currentIndex < essayUrls.length - 1) {
                const nextButton = document.createElement('button');
                nextButton.className = 'nav-button next-button';
                nextButton.innerHTML = '<span>Next Essay</span>'; // Accessible text
                nextButton.addEventListener('click', () => {
                    window.location.href = essayUrls[currentIndex + 1];
                });
                navContainer.appendChild(nextButton);
            }
            
            // Add to page
            document.body.appendChild(navContainer);
        }
    }
});