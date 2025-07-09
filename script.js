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
            
            // Fallback: Load content if HTMX hasn't loaded it yet
            setTimeout(() => {
                const portfolioContent = document.getElementById('portfolio-content');
                if (portfolioContent && portfolioContent.innerHTML.trim() === '<!-- Content will be loaded here -->') {
                    console.log('HTMX failed, loading content manually');
                    fetch('/portfolio-content')
                        .then(response => response.text())
                        .then(html => {
                            portfolioContent.innerHTML = html;
                            portfolioContent.classList.add('htmx-added');
                        })
                        .catch(error => {
                            console.error('Error loading content:', error);
                            // Load static content as final fallback
                            portfolioContent.innerHTML = `
                                <div class="name">jules beaugrand</div>
                                <div class="title">product designer</div>
                                <div class="info-item">live in france</div>
                                <div class="info-item">speaking: french & english</div>
                                <div class="info-item contact">
                                    contact: <a href="mailto:djeel@proton.me" class="contact-link">djeel@proton.me</a>
                                </div>
                            `;
                            portfolioContent.classList.add('htmx-added');
                        });
                }
            }, 1000);
        }, 500);
    }, 2000);
});

// HTMX event listeners for smooth transitions
document.addEventListener('htmx:beforeRequest', function(event) {
    console.log('HTMX: Before request to', event.detail.xhr.responseURL);
    const target = event.target;
    target.classList.add('htmx-loading');
});

document.addEventListener('htmx:afterRequest', function(event) {
    console.log('HTMX: After request, status:', event.detail.xhr.status);
});

document.addEventListener('htmx:afterSettle', function(event) {
    console.log('HTMX: Content loaded successfully');
    const target = event.target;
    target.classList.remove('htmx-loading');
    target.classList.add('htmx-added');
    
    // Add staggered animation to text elements
    const textElements = target.querySelectorAll('.name, .title, .info-item');
    textElements.forEach((element, index) => {
        element.style.animationDelay = `${0.2 + (index * 0.2)}s`;
    });
});

document.addEventListener('htmx:responseError', function(event) {
    console.error('HTMX: Response error:', event.detail);
});

document.addEventListener('htmx:sendError', function(event) {
    console.error('HTMX: Send error:', event.detail);
});

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

// Apply typewriter effect to name when content loads
document.addEventListener('htmx:afterSettle', function() {
    const nameElement = document.querySelector('.name');
    if (nameElement && nameElement.textContent) {
        const originalText = nameElement.textContent;
        setTimeout(() => {
            typewriterEffect(nameElement, originalText, 100);
        }, 500);
    }
});

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
