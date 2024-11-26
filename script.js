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

    // Glossary Modal functionality
    const modal = document.getElementById('glossaryModal');
    const btn = document.getElementById('glossaryButton');
    const span = document.querySelector('.close');

    // Show modal when glossary button is clicked
    btn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close modal when X is clicked
    span.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Search functionality
    const searchInput = document.getElementById('glossarySearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            const terms = document.querySelectorAll('.glossary-list dt');
            const definitions = document.querySelectorAll('.glossary-list dd');
            
            // Function to highlight matching text
            function highlightText(element, searchTerm) {
                if (!searchTerm) {
                    element.innerHTML = element.textContent;
                    return;
                }
                
                const content = element.textContent;
                const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                element.innerHTML = content.replace(regex, '<span class="highlight-match">$1</span>');
            }

            // Search through terms and definitions
            terms.forEach((term, index) => {
                const definition = definitions[index];
                const termText = term.textContent.toLowerCase();
                const definitionText = definition.textContent.toLowerCase();
                
                if (!searchTerm) {
                    // Show all if search is empty
                    term.classList.remove('hidden');
                    definition.classList.remove('hidden');
                    term.innerHTML = term.textContent;
                    definition.innerHTML = definition.textContent;
                } else if (termText.includes(searchTerm) || definitionText.includes(searchTerm)) {
                    term.classList.remove('hidden');
                    definition.classList.remove('hidden');
                    highlightText(term, searchTerm);
                    highlightText(definition, searchTerm);
                } else {
                    term.classList.add('hidden');
                    definition.classList.add('hidden');
                }
            });

            // Show/hide section headers based on visible terms
            document.querySelectorAll('.glossary-list h3').forEach(header => {
                const nextSection = header.nextElementSibling;
                let hasVisibleTerms = false;
                
                let current = nextSection;
                while (current && current.tagName !== 'H3') {
                    if (current.tagName === 'DT' && !current.classList.contains('hidden')) {
                        hasVisibleTerms = true;
                        break;
                    }
                    current = current.nextElementSibling;
                }
                
                header.style.display = hasVisibleTerms ? '' : 'none';
            });
        });
    }

    // Full Screen PDF functionality
    const fullScreenBtn = document.getElementById('fullScreenBtn');
    
    fullScreenBtn.addEventListener('click', function() {
        window.open('./pdfs/laytime-flow-diagram.pdf', '_blank');
    });
});
