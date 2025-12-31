// Advanced Animations and Effects
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe cards and stat cards
    document.querySelectorAll('.card, .stat-card').forEach(card => {
        observer.observe(card);
    });

    // Add stagger animation to navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('nav-item-animated');
    });

    // Enhanced hover effects for stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.stat-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.stat-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Button ripple effect
    document.querySelectorAll('.btn-primary, .btn-success, .btn-purple').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Smooth page transitions
    const navButtons = document.querySelectorAll('[data-page]');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            const currentActive = document.querySelector('.dashboard-section.active');

            if (currentActive) {
                currentActive.style.opacity = '0';
                currentActive.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    currentActive.classList.remove('active');
                    currentActive.style.opacity = '';
                    currentActive.style.transform = '';

                    const newPage = document.getElementById(targetPage + 'Page');
                    if (newPage) {
                        newPage.classList.add('active');
                        newPage.style.opacity = '0';
                        newPage.style.transform = 'translateY(20px)';

                        requestAnimationFrame(() => {
                            newPage.style.transition = 'all 0.4s ease-out';
                            newPage.style.opacity = '1';
                            newPage.style.transform = 'translateY(0)';
                        });
                    }
                }, 200);
            }
        });
    });

    // Floating animation for logo
    const logoIcon = document.querySelector('.sidebar .logo-icon');
    if (logoIcon) {
        let floatAnimation = 0;
        function animateLogo() {
            floatAnimation += 0.02;
            const y = Math.sin(floatAnimation) * 2;
            logoIcon.style.transform = `translateY(${y}px)`;
            requestAnimationFrame(animateLogo);
        }
        animateLogo();
    }

    // Typing effect for welcome message (if exists)
    const welcomeText = document.querySelector('.content-header p');
    if (welcomeText && welcomeText.textContent.includes('Welcome')) {
        const originalText = welcomeText.textContent;
        welcomeText.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                welcomeText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        setTimeout(typeWriter, 1000);
    }
});