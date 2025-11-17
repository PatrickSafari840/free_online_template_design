document.addEventListener('DOMContentLoaded', function() {

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"], .hero-section a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate offset for fixed header if you have one
                const headerOffset = document.querySelector('.site-header') ? document.querySelector('.site-header').offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Basic form submission handling (prevent default, log to console)
    // For a real form, you'd use something like Formspree, Netlify Forms, or a backend.
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Basic validation example (could be more robust)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                console.log('Form submitted:', { name, email, message });
                alert('Thank you for your message! (This is a demo)');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Subtle fade-in animation for sections on scroll
    const fadeElements = document.querySelectorAll('section'); // Or target specific elements with a class like .fade-in
    
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after it's visible to save resources
                // observer.unobserve(entry.target); 
            } else {
                 // Optional: remove 'visible' if you want it to fade out when scrolling up
                 // entry.target.classList.remove('visible');
            }
        });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    fadeElements.forEach(el => {
        el.classList.add('fade-in'); // Add initial class for styling
        intersectionObserver.observe(el);
    });

});