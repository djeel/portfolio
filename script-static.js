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

// Add subtle mouse movement effects
document.addEventListener('mousemove', function(e) {
    const card = document.querySelector('.portfolio-card');
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

// Reset card position when mouse leaves
document.addEventListener('mouseleave', function() {
    const card = document.querySelector('.portfolio-card');
    if (card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
});

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
