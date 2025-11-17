document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    // Apply saved theme or default to dark
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'light-theme') {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    } else {
        body.classList.add('dark-theme'); // Default
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Helper to set RGB values for alpha transparency in CSS
    function setRgbCssVariables() {
        const styles = getComputedStyle(body);
        const primaryAccent = styles.getPropertyValue('--primary-accent').trim();
        const bgColor = styles.getPropertyValue('--bg-color').trim();
        
        // Function to convert hex/rgb to RGB values string
        function toRgbValues(colorStr) {
            if (colorStr.startsWith('#')) {
                const r = parseInt(colorStr.slice(1, 3), 16);
                const g = parseInt(colorStr.slice(3, 5), 16);
                const b = parseInt(colorStr.slice(5, 7), 16);
                return `${r}, ${g}, ${b}`;
            } else if (colorStr.startsWith('rgb')) {
                return colorStr.match(/\d+/g).join(', ');
            }
            return '0,0,0'; // fallback
        }

        body.style.setProperty('--primary-accent-rgb', toRgbValues(primaryAccent));
        body.style.setProperty('--bg-color-rgb', toRgbValues(bgColor));
        
        // Set light theme specific bg color if light theme is active
        if (body.classList.contains('light-theme')) {
            const bgColorLight = styles.getPropertyValue('--bg-color-light').trim();
            body.style.setProperty('--bg-color-rgb-light', toRgbValues(bgColorLight));
        } else {
            // Ensure light theme variable is not set if dark theme is active
            body.style.removeProperty('--bg-color-rgb-light');
        }
    }

    setRgbCssVariables(); // Initial call

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        body.classList.toggle('dark-theme');

        let theme = 'dark-theme';
        if (body.classList.contains('light-theme')) {
            theme = 'light-theme';
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
        localStorage.setItem('theme', theme);
        setRgbCssVariables(); // Update RGB vars on theme change
    });

    // --- Custom Cursor ---
    const cursor = document.querySelector('.custom-cursor');
    const hoverableElements = document.querySelectorAll('a, button, .project-card, input, textarea, .social-links a');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    hoverableElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });


    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Animate skill bars when they become visible
                if (entry.target.classList.contains('skill-item')) {
                    const skillBar = entry.target.querySelector('.skill-bar');
                    if (skillBar) {
                        skillBar.style.width = skillBar.dataset.level + '%';
                    }
                }
                // observer.unobserve(entry.target); // Optional: stop observing after first animation
            } else {
                 // Optional: remove class if you want animation to replay on scroll up/down
                 // entry.target.classList.remove('is-visible');
            }
        });
    };
    const animationObserver = new IntersectionObserver(observerCallback, observerOptions);
    animatedElements.forEach(el => animationObserver.observe(el));


    // --- Contact Form Floating Labels ---
    // Handled by CSS :focus and :valid. JS might be needed for more complex scenarios
    // or if you don't use `required` and rely on JS validation.

    // --- Contact Form Submission (Basic Example) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Basic validation (can be expanded)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                // Here you would typically send data to a backend or service
                // (e.g., using Fetch API to Netlify Functions, Formspree, etc.)
                console.log('Form submitted:', { name, email, message });
                alert('Message sent (simulated)! Check console.');
                contactForm.reset(); // Reset form fields
                // Manually trigger label reset if needed after form.reset()
                document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
                    if (input.value === '') {
                        input.nextElementSibling.style.top = '14px'; // Reset label position
                        input.nextElementSibling.style.fontSize = '1rem';
                    }
                });
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // Auto update year in footer
    const currentYearSpan = document.getElementById('current-year');
    if(currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Active Nav Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust offset if you have a fixed header
            if (pageYOffset >= (sectionTop - sectionHeight / 3 - 60 /* header height */)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

});