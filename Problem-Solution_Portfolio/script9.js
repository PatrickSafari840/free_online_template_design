document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // You could add more dynamic behaviors here, for example:
    // - A "Read More" button for lengthy project descriptions (toggle visibility)
    // - Simple form validation (though server-side validation is crucial)
    // - Light/Dark mode toggle
});