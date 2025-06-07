document.addEventListener('DOMContentLoaded', function() {
  // Skills Data - Using only Font Awesome icons. This array contains all my skills and their corresponding icon. Each skill is represented with an icon
  const skills = [
    { name: "Unity", icon: "fab fa-unity" },
    { name: "C#", icon: "fas fa-code" },
    { name: "HTML5", icon: "fab fa-html5" },
    { name: "CSS3", icon: "fab fa-css3-alt" },
    { name: "JavaScript", icon: "fab fa-js" },
    { name: "UI/UX", icon: "fas fa-pencil-ruler" },
    { name: "Game Design", icon: "fas fa-gamepad" },
    { name: "3D Modeling", icon: "fas fa-cube" },
   
    // { name: "Responsive Design", icon: "fas fa-mobile-alt" },
    { name: "Interactive Media", icon: "fas fa-laptop-code" }
  ];

  // getting thecontainer element where i will put all the skills,
  const skillsGrid = document.getElementById('skillsGrid');
  //The forEach method executes a function for each item in the array
  skills.forEach(skill => {
    const skillElement = document.createElement('div');// creating a div element to hold each skill
    skillElement.className = 'skill-item'; // Give this div a class name so we can style it with CSS
// Set the HTML content of this div to include an icon element and a span element containing the skill name text
    skillElement.innerHTML = `
      <i class="${skill.icon}"></i>
      <span>${skill.name}</span>
    `;
    skillsGrid.appendChild(skillElement);
  });

  // Add hover effect to profile elements. Here we're looking for elements with class "profile-card", "skills-card", or "work-item"
  const profileElements = document.querySelectorAll('.profile-card, .skills-card, .work-item'); //querySelectorAll finds all elements matching the CSS selector
  //Add event listeners to each of these elements
  profileElements.forEach(element => { 
    element.addEventListener('mouseenter', () => {
      element.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.5)';//When the mouse enters (hovers over) the element, we add these colours
    });
    //When the mouse leaves (stops hovering over) the element, return to the glow effext defined in my CSS
    element.addEventListener('mouseleave', () => {
      element.style.boxShadow = 'var(--glow)';
    });
  });

  // Typewriter effect for tagline
  const tagline = document.querySelector('.tagline');
  if (tagline) {
    const text = "Game Designer | Interactive Media Developer | Aspiring Creative Technologist";
    let i = 0;
    tagline.textContent = "";

    //This function will type one character at a time
    function typeWriter() {
      if (i < text.length) {
        tagline.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    setTimeout(typeWriter, 1000);
  }
});


