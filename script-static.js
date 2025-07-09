// Loading screen and main content management
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
            
            // Load content after loading screen
            loadPortfolioContent();
        }, 500);
    }, 2000);
});

// Load portfolio content
function loadPortfolioContent() {
    const portfolioContent = document.getElementById('portfolio-content');
    
    // Static content for GitHub Pages
    const content = `
        <div class="name">jules beaugrand</div>
        <div class="title">product designer</div>
        <div class="info-item">live in france</div>
        <div class="info-item">speaking: french & english</div>
        <div class="info-item contact">
            contact: <a href="mailto:djeel@proton.me" class="contact-link">djeel@proton.me</a>
        </div>
    `;
    
    // Add content with animation
    portfolioContent.innerHTML = content;
    portfolioContent.classList.add('htmx-added');
    
    // Add staggered animation to text elements
    const textElements = portfolioContent.querySelectorAll('.name, .title, .info-item');
    textElements.forEach((element, index) => {
        element.style.animationDelay = `${0.2 + (index * 0.2)}s`;
    });
    
    // Apply typewriter effect to name
    const nameElement = portfolioContent.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        setTimeout(() => {
            typewriterEffect(nameElement, originalText, 100);
        }, 500);
    }
}

// Classic mouse movement effect
const portfolioCard = document.querySelector('.portfolio-card');
if (portfolioCard) {
    document.addEventListener('mousemove', function(e) {
        const rect = portfolioCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Subtle rotation effect
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;

        portfolioCard.style.transition = 'transform 0.1s ease-out';
        portfolioCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    document.addEventListener('mouseleave', function() {
        portfolioCard.style.transition = 'transform 0.3s ease-out';
        portfolioCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
}

// Typewriter effect for specific elements
function typewriterEffect(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add click effect for contact link
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('contact-link')) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.classList.contains('contact-link')) {
        e.target.click();
    }
});

// Functionality to change card design on left mouse click
const card = document.querySelector('.central-card');
const designs = ['design1', 'design2', 'design3', 'design4', 'design5', 'design6', 'design7', 'design8', 'design9', 'design10']; // Add CSS class names for all designs
let currentDesignIndex = 0;

if (card) {
    console.log('Central card element found:', card);
    card.addEventListener('click', (event) => {
        if (event.button === 0) { // Left mouse button
            console.log('Card clicked');
            console.log('Current design index:', currentDesignIndex);
            console.log('Current design class:', designs[currentDesignIndex]);

            // Remove current design class
            card.classList.remove(designs[currentDesignIndex]);

            // Update design index
            currentDesignIndex = (currentDesignIndex + 1) % designs.length;

            // Add new design class
            card.classList.add(designs[currentDesignIndex]);

            console.log('New design index:', currentDesignIndex);
            console.log('New design class:', designs[currentDesignIndex]);
        }
    });
} else {
    console.error('Central card element not found');
}
