// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation for elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run once on load and then on scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[type="text"]:nth-of-type(2)').value;
            const message = this.querySelector('textarea').value;
            
            // Here you would typically send the data to a server
            // For demo purposes, we'll just show an alert
            alert(`Terima kasih ${name}! Pesan Anda telah berhasil dikirim. Saya akan segera menghubungi Anda kembali.`);
            
            // Reset form
            this.reset();
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Simple validation
            if (email.includes('@')) {
                alert('Terima kasih telah berlangganan newsletter kami!');
                this.reset();
            } else {
                alert('Masukkan alamat email yang valid.');
            }
        });
    }

    // Intersection Observer for more performant scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all elements with animate-me class
    document.querySelectorAll('.animate-me').forEach(el => {
        observer.observe(el);
    });

    // Project card hover effect enhancement
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });

    // Dynamic year in footer copyright
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }
});

// Additional animations
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        // Reset animation
        bar.style.animation = 'none';
        void bar.offsetWidth; // Trigger reflow
        bar.style.animation = 'progress 1.5s ease-in-out forwards';
    });
}

// Run skill bar animation when skills section is in view
const skillsSection = document.querySelector('#skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Dark/light mode toggle (optional feature)
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.zIndex = '1000';
    themeToggle.style.background = 'var(--primary-color)';
    themeToggle.style.color = 'white';
    themeToggle.style.border = 'none';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Initialize theme toggle if needed
// initThemeToggle();

// Helper function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}
