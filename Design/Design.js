document.addEventListener('DOMContentLoaded', function() {
    const index = document.getElementById('design-index');//The sidebar container
    const list = index.querySelector('ul');//The headings or rather unordered list inside the sidebar
    const toggleBtn = document.querySelector('.design-index-toggle');//the button that shows the index/hides the index 

    // Build index. Here we find all h2 headings in the main content sections
    document.querySelectorAll('main section h2').forEach(heading => {
        if (!heading.id) heading.id = heading.textContent.toLowerCase().replace(/\s+/g, '-');//If heading doesn't have an ID, create one by making text lowercase
        // and Replacing spaces with hyphens. For instance: Goal Alignment" becomes "goal-alignment
        list.innerHTML += `<li><a href="#${heading.id}" class="design-index-link">${heading.textContent}</a></li>`;
    });

    // handles clicks on the index items 
    //Only run this if an <a> tag was clicked (not empty space in the list)
    list.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') { 
            e.preventDefault();
            const heading = document.querySelector(e.target.getAttribute('href'));
            heading.classList.add('highlight');//Add highlight effect to the section
            setTimeout(() => heading.classList.remove('highlight'), 2000);
            heading.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Toggle sidebar visibility
    toggleBtn.addEventListener('click', () => {
        index.classList.toggle('hidden');
        // Change button text to match current state:
        // If hidden -> "Show Index"
        // If visible -> "Hide Index"
        toggleBtn.textContent = index.classList.contains('hidden') ? 'Show Index' : 'Hide Index';
    });
});