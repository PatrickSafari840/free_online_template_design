document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active'); // For X animation
        });

        // Close menu when a link is clicked (for SPA-like behavior)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

    // Smooth scroll for navigation links & active link highlighting (simple version)
    const navbar = document.getElementById('navbar');
    const navLinksAnchors = document.querySelectorAll('#navbar .nav-links a');
    const sections = document.querySelectorAll('.section, header#hero'); // Include hero as a section

    function changeNavOnScroll() {
        let currentSection = '';
        const navHeight = navbar ? navbar.offsetHeight : 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50; // Add a little offset
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinksAnchors.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });

        // Optional: Change navbar background on scroll
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'var(--dark-bg)'; // Solid on scroll
            } else {
                navbar.style.backgroundColor = 'rgba(34, 40, 49, 0.95)'; // Semi-transparent at top
            }
        }
    }

    window.addEventListener('scroll', changeNavOnScroll);
    changeNavOnScroll(); // Initial check

    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});