// Loading screen and main content management
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const portfolioCard = document.querySelector('.portfolio-card');
    
    // Hide loading screen after 1 second
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
            
            // Load content after loading screen
            loadPortfolioContent();
            
            // Démarre l'animation de fade-in de la carte
            setTimeout(() => {
                if (portfolioCard) {
                    isAnimating = true;
                    animateCard();
                }
            }, 100);
        }, 300);
    }, 1000);
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

// Classic mouse movement effect with fade-in animation
const portfolioCard = document.querySelector('.portfolio-card');
let mouseX = 0, mouseY = 0;
let currentRotateX = 0, currentRotateY = 0;
let isAnimating = false;

// Variables pour l'animation de fade-in
let fadeProgress = 0;
let animationStartTime = null;

function animateCard() {
    const now = Date.now();
    
    if (!animationStartTime) {
        animationStartTime = now;
    }
    
    const elapsed = now - animationStartTime;
    const duration = 800; // 800ms pour l'animation
    
    // Calcul du progrès de l'animation (0 à 1)
    fadeProgress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - fadeProgress, 3); // Courbe ease-out
    
    // Animation du fade-in
    const opacity = easeOut;
    const translateY = 30 * (1 - easeOut);
    const scale = 0.95 + (0.05 * easeOut);
    
    // Combine avec l'effet de souris
    portfolioCard.style.opacity = opacity;
    portfolioCard.style.transform = `perspective(1000px) translateY(${translateY}px) scale(${scale}) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
    
    // Continue l'animation jusqu'à la fin
    if (fadeProgress < 1) {
        requestAnimationFrame(animateCard);
    } else {
        isAnimating = false;
    }
}

if (portfolioCard) {
    document.addEventListener('mousemove', function(e) {
        const rect = portfolioCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calcul de la rotation
        const targetRotateX = (y - centerY) / 30;
        const targetRotateY = (centerX - x) / 30;
        
        // Détection du design actuel
        const currentCard = portfolioCard.closest('.central-card');
        
        // Lissage de l'effet de souris - plus rapide pour Discord
        const smoothness = currentCard && currentCard.classList.contains('design1') ? 0.2 : 0.1;
        
        currentRotateX += (targetRotateX - currentRotateX) * smoothness;
        currentRotateY += (targetRotateY - currentRotateY) * smoothness;
        
        // Effet shiny - position de la souris en pourcentage
        const mouseXPercent = (x / rect.width) * 100;
        const mouseYPercent = (y / rect.height) * 100;
        
        // Applique l'effet shiny sur le design par défaut et GANGUI
        if (!currentCard || !currentCard.classList.contains('design1')) {
            portfolioCard.style.setProperty('--mouse-x', `${mouseXPercent}%`);
            portfolioCard.style.setProperty('--mouse-y', `${mouseYPercent}%`);
        }
        
        // Applique la transformation si pas en animation de fade-in
        if (!isAnimating) {
            portfolioCard.style.transform = `perspective(1000px) translateY(0px) scale(1) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
        }
    });

    document.addEventListener('mouseleave', function() {
        // Reset progressif
        currentRotateX *= 0.9;
        currentRotateY *= 0.9;
        
        if (!isAnimating) {
            portfolioCard.style.transform = `perspective(1000px) translateY(0px) scale(1) rotateX(0deg) rotateY(0deg)`;
        }
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

// Design configurations with their own content
const designConfigs = [
    {
        name: 'default',
        className: '',
        content: `
            <div class="name">jules beaugrand</div>
            <div class="title">product designer</div>
            <div class="info-item">live in france</div>
            <div class="info-item">speaking: french & english</div>
            <div class="info-item contact">
                contact: <a href="mailto:djeel@proton.me" class="contact-link">djeel@proton.me</a>
            </div>
        `
    },
    {
        name: 'discord',
        className: 'design1',
        content: `
            <div class="discord-header">
                <div class="discord-avatar"></div>
                <div class="discord-content">
                    <div class="discord-user-info">
                        <span class="discord-username">djeel</span>
                        <span class="discord-timestamp">Today at 00:00</span>
                    </div>
                    <div class="discord-message">
                        i'm a <strong>product designer</strong>
                        <br>based in france 🇫🇷<br>
                        and i speak french & english<br>
                        hire me at <a href="mailto:djeel@proton.me">djeel@proton.me</a>
                    </div>
                </div>
            </div>
        `
    },
    {
        name: 'gangui',
        className: 'design2',
        content: `
            <div class="bank-header">
                <div class="bank-logo">GANGUI</div>
                <div class="bank-chip"></div>
            </div>
            <div class="bank-number">4532 **** **** 2891</div>
            <div class="bank-info">
                <div class="bank-holder">
                    <div class="bank-label">Card Holder</div>
                    <div class="bank-name">Jules Beaugrand</div>
                    <div class="bank-title">Product Designer</div>
                    <div class="bank-contact">📧 <a href="mailto:djeel@proton.me">djeel@proton.me</a></div>
                </div>
                <div class="bank-expiry">
                    <div class="bank-label">Valid Thru</div>
                    <div class="bank-date">07/29</div>
                    <div class="bank-valid">France 🇫🇷</div>
                </div>
            </div>
        `
    }
];

// Functionality to change card design on left mouse click
const card = document.querySelector('.central-card');
const portfolioContent = document.getElementById('portfolio-content');
let currentDesignIndex = 0;

function switchDesign() {
    const currentConfig = designConfigs[currentDesignIndex];
    const nextIndex = (currentDesignIndex + 1) % designConfigs.length;
    const nextConfig = designConfigs[nextIndex];
    
    console.log('Design switched to:', nextConfig.name);
    
    // Remove current design class
    if (currentConfig.className) {
        card.classList.remove(currentConfig.className);
    }
    
    // Add new design class
    if (nextConfig.className) {
        card.classList.add(nextConfig.className);
        // Reset shiny effect variables only for Discord design
        if (nextConfig.className === 'design1') {
            portfolioCard.style.removeProperty('--mouse-x');
            portfolioCard.style.removeProperty('--mouse-y');
        }
    }
    
    // Update content
    portfolioContent.innerHTML = nextConfig.content;
    
    // Update index
    currentDesignIndex = nextIndex;
}

if (card && portfolioContent) {
    card.addEventListener('click', (event) => {
        if (event.button === 0) { // Left mouse button
            switchDesign();
        }
    });
} else {
    console.error('Card or content element not found');
}
