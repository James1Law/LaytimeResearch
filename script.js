document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Get all elements that need effects
    const keywords = document.querySelectorAll('.highlight-keyword');
    const laytimeWords = document.querySelectorAll('.box-keyword');
    const bracketSection = document.querySelector('.bracket-section');
    const underlineWords = document.querySelectorAll('.underline-keyword');
    const circleWords = document.querySelectorAll('.circle-keyword');
    
    // Create an observer for scrolling
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let annotation;
                
                // Apply appropriate effect based on class
                if (entry.target.classList.contains('highlight-keyword')) {
                    annotation = RoughNotation.annotate(entry.target, {
                        type: 'highlight',
                        color: '#FFF176',
                        animationDuration: 1500
                    });
                } else if (entry.target.classList.contains('box-keyword')) {
                    annotation = RoughNotation.annotate(entry.target, {
                        type: 'box',
                        color: '#FF5722',
                        padding: 5,
                        animationDuration: 1000
                    });
                } else if (entry.target.classList.contains('bracket-section')) {
                    annotation = RoughNotation.annotate(entry.target, {
                        type: 'bracket',
                        color: '#0052CC',
                        padding: 10,
                        brackets: ['left', 'right'],
                        strokeWidth: 3,
                        animationDuration: 1500
                    });
                } else if (entry.target.classList.contains('underline-keyword')) {
                    annotation = RoughNotation.annotate(entry.target, {
                        type: 'underline',
                        color: '#4A148C',
                        strokeWidth: 2,
                        animationDuration: 800
                    });
                } else if (entry.target.classList.contains('circle-keyword')) {
                    annotation = RoughNotation.annotate(entry.target, {
                        type: 'circle',
                        color: '#2196F3',
                        padding: 15,
                        strokeWidth: 3,
                        animationDuration: 1500
                    });
                }
                
                if (annotation) {
                    annotation.show();
                }
                // Stop observing after effect is applied
                observer.unobserve(entry.target);
            }
        });
    });

    // Observe all elements
    keywords.forEach(keyword => observer.observe(keyword));
    laytimeWords.forEach(word => observer.observe(word));
    if (bracketSection) {
        observer.observe(bracketSection);
    }
    underlineWords.forEach(word => observer.observe(word));
    circleWords.forEach(word => observer.observe(word));
});
