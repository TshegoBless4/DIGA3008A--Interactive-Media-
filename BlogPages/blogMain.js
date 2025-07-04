// Wait until the DOM is fully loaded before executing our code
document.addEventListener('DOMContentLoaded', function() {

    // SEARCH FUNCTIONALITY 
    // Get references to our search input and all blog articles
    const blogSearch = document.getElementById('blogSearch');
    const articles = document.querySelectorAll('.section');
    const noResultsMsg = document.getElementById('noResultsMessage');

    // Add input event listener to the search box
    blogSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        let visibleCount = 0; // Track how many articles match the search
        
        // Loop through each article and check if it matches the search
        articles.forEach(article => {
            // Get the article title and content (in lowercase for case-insensitive search)
            const title = article.querySelector('h2').textContent.toLowerCase();
            const content = article.textContent.toLowerCase();
            
            // Check if search term is empty or matches title/content
            const isVisible = searchTerm === '' || 
                             title.includes(searchTerm) || 
                             content.includes(searchTerm);
            
            // Show/hide article based on search match
            article.style.display = isVisible ? 'block' : 'none';
            if (isVisible) visibleCount++;
            
            // Add highlight effect for matches (only if search term is > 2 characters)
            if (isVisible && searchTerm.length > 2) {
                article.classList.add('blog-highlight');
            } else {
                // Remove highlight if no search term or doesn't match
                article.classList.remove('blog-highlight');
            }
        });

        // Show "no results" message if needed
        noResultsMsg.style.display = (searchTerm.length > 0 && visibleCount === 0) ? 'block' : 'none';
    });

    // NAVIGATION FUNCTION 
    // Smooth scrolling to the articles: Function to handle navigation to specific blog posts
    function navigateToBlog(targetId) {
        const targetArticle = document.getElementById(targetId);
        if (!targetArticle) return; // Exit if article doesn't exist

        // Calculate scroll position accounting for header height
        const headerHeight = document.querySelector('header').offsetHeight;
        const articlePosition = targetArticle.getBoundingClientRect().top;
        const offsetPosition = articlePosition + window.pageYOffset - headerHeight - 20;

        // Smooth scroll to the article
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Temporarily highlight the target article (reduced duration to 750ms)
        targetArticle.classList.add('blog-highlight');
        setTimeout(() => {
            targetArticle.classList.remove('blog-highlight');
        }, 750); // Reduced from 2000ms to 750ms for better UX

        // Close mobile menu/navigation if open
        const checkBox = document.getElementById('check');
        if (checkBox && checkBox.checked) {
            checkBox.checked = false;
            const navUl = document.querySelector('nav ul');
            if (navUl) navUl.style.display = 'none';
        }
    }

    // SIDEBAR NAVIGATION 
    // Make all sidebar links use smooth scrolling
    document.querySelectorAll('aside a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            const targetId = this.getAttribute('href').substring(1); // Get ID without #
            navigateToBlog(targetId);
        });
    });

    // SEARCH BOX ENHANCEMENTS 
    // Add focus effects to search box
    if (blogSearch) {
        blogSearch.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.9)';
            this.style.outline = 'none';
        });

        blogSearch.addEventListener('blur', function() {
            this.style.boxShadow = '0 0 8px rgba(0, 255, 255, 0.7)';
        });
    }

    // BACK TO TOP BUTTONS 
    // Handle all "Back to Top" buttons
    document.querySelectorAll('.back-to-top').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            
            // Get the ID from the button's href (like "#blog1")
            const targetId = this.getAttribute('href');
            
            // If the href points to a specific ID
            if (targetId && targetId.startsWith('#')) {
                // Find the matching section on the page
                const targetSection = document.querySelector(targetId);
                
                // If found, scroll to it smoothly
                if (targetSection) {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start' // Align to top of section
                    });
                }
            }
        });
    });

    // RESPONSIVE LAYOUT 
    // Adjust layout for different screen sizes
    function adjustForMobile() {
        const filter = document.querySelector('.blog-filter'); // Search input container
        if (!filter || !noResultsMsg) return;  // Exit if elements don't exist (safety check)
        
        // Check if viewport is mobile size (<= 768px)
        if (window.innerWidth <= 768) {
            filter.style.padding = '0 1rem'; // Add horizontal padding to filter container
            noResultsMsg.style.margin = '1rem'; // Adjust message margins for mobile
            noResultsMsg.style.maxWidth = 'calc(100% - 2rem)';
        } else {
            filter.style.padding = '';    // Reset filter padding to default
            noResultsMsg.style.margin = '2rem auto';
            noResultsMsg.style.maxWidth = '600px';
        }
    }

    // Run on resize and initial load
    window.addEventListener('resize', adjustForMobile);
    adjustForMobile();
});