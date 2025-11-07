// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Skills Section Toggle
const skillButtons = document.querySelectorAll('.skill-btn');
const skillCategories = document.querySelectorAll('.skill-category');

skillButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and categories
        skillButtons.forEach(btn => btn.classList.remove('active'));
        skillCategories.forEach(cat => cat.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Show corresponding category
        const category = button.getAttribute('data-category');
        document.getElementById(category).classList.add('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentTheme = html.getAttribute('data-theme');

    if (window.scrollY > 50) {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        }
        navbar.style.boxShadow = '0 2px 20px var(--shadow)';
    } else {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.boxShadow = '0 2px 20px var(--shadow)';
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (name && email && message) {
        // Show success message (you can customize this)
        alert('Thank you for your message! I will get back to you soon.');

        // Reset form
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Download Resume Button
const downloadBtn = document.getElementById('downloadBtn');

// downloadBtn.addEventListener('click', (e) => {
//     e.preventDefault();
//     // You can replace this with actual resume download functionality
//     alert("Your resume is downloading!");
//     // Example: window.open('path/to/resume.pdf', '_blank');
// });

// Typing Animation for Profession
const professionText = document.getElementById('professionText');
const professions = ['Frontend Developer', 'Software Developer', 'Web Developer'];
let currentProfessionIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeProfession() {
    const currentProfession = professions[currentProfessionIndex];

    if (isDeleting) {
        professionText.textContent = currentProfession.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 40;
    } else {
        professionText.textContent = currentProfession.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 80;
    }

    if (!isDeleting && currentCharIndex === currentProfession.length) {
        typingSpeed = 1500; // Pause at end
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentProfessionIndex = (currentProfessionIndex + 1) % professions.length;
        typingSpeed = 300; // Pause before starting new word
    }

    setTimeout(typeProfession, typingSpeed);
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeProfession, 500);
});

// Scroll Animation Observer
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe elements for scroll animations
document.querySelectorAll('.about-text').forEach(el => {
    scrollObserver.observe(el);
});

document.querySelectorAll('.skill-item').forEach(el => {
    scrollObserver.observe(el);
});

// Timeline animation observer
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


