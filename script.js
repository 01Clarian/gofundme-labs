// GoFundMe Go - Interactive Features

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.step, .feature-card, .gallery-item, .tokenomics-card, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Copy token CA to clipboard
    const tokenCA = document.querySelector('.token-ca');
    if (tokenCA) {
        tokenCA.style.cursor = 'pointer';
        tokenCA.title = 'Click to copy';
        tokenCA.addEventListener('click', () => {
            navigator.clipboard.writeText('4vTeHaoJGvrKduJrxVmfgkjzDYPzD8BJJDv5Afempump')
                .then(() => {
                    const originalText = tokenCA.textContent;
                    tokenCA.textContent = '✓ Copied!';
                    tokenCA.style.color = '#4ade80';
                    setTimeout(() => {
                        tokenCA.textContent = originalText;
                        tokenCA.style.color = '';
                    }, 2000);
                })
                .catch(err => console.error('Failed to copy:', err));
        });
    }

    // FAQ accordion effect (optional enhancement)
    document.querySelectorAll('.faq-question').forEach(question => {
        question.style.cursor = 'pointer';
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            
            // Toggle active state
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Particle effect on hero (optional - lightweight)
    createParticles();
});

// Simple particle effect
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
    `;
    hero.insertBefore(particlesContainer, hero.firstChild);

    // Create particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(74, 222, 128, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }

    // Add animation keyframes
    if (!document.querySelector('#particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Track button clicks (for analytics if needed)
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        console.log('Button clicked:', btn.textContent.trim());
        // Add analytics here if needed
    });
});
