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
    const span = document.getElementsByClassName('close')[0];

    btn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Add search functionality
    const searchInput = document.getElementById('glossarySearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const terms = document.querySelectorAll('.glossary-list dt');
            const definitions = document.querySelectorAll('.glossary-list dd');
            
            // Function to highlight matching text
            function highlightText(element, searchTerm) {
                const content = element.textContent;
                if (searchTerm.length > 0 && content.toLowerCase().includes(searchTerm)) {
                    const regex = new RegExp(`(${searchTerm})`, 'gi');
                    element.innerHTML = content.replace(regex, '<span class="highlight-match">$1</span>');
                } else {
                    element.innerHTML = content;
                }
            }

            // Search through terms and definitions
            terms.forEach((term, index) => {
                const definition = definitions[index];
                const termText = term.textContent.toLowerCase();
                const definitionText = definition.textContent.toLowerCase();
                
                if (termText.includes(searchTerm) || definitionText.includes(searchTerm)) {
                    term.classList.remove('hidden');
                    definition.classList.remove('hidden');
                    // Highlight matching text
                    highlightText(term, searchTerm);
                    highlightText(definition, searchTerm);
                } else {
                    term.classList.add('hidden');
                    definition.classList.add('hidden');
                }
            });
        });

        // Clear search when modal closes
        const modal = document.getElementById('glossaryModal');
        const closeBtn = document.querySelector('.close');
        
        function clearSearch() {
            searchInput.value = '';
            const terms = document.querySelectorAll('.glossary-list dt');
            const definitions = document.querySelectorAll('.glossary-list dd');
            terms.forEach(term => {
                term.classList.remove('hidden');
                term.innerHTML = term.textContent;
            });
            definitions.forEach(def => {
                def.classList.remove('hidden');
                def.innerHTML = def.textContent;
            });
        }

        closeBtn.addEventListener('click', clearSearch);
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                clearSearch();
            }
        });
    }

    // PDF Modal functionality
    const pdfModal = document.getElementById('pdfModal');
    const pdfBtn = document.getElementById('pdfButton');
    const pdfClose = document.querySelector('.pdf-close');

    pdfBtn.onclick = function() {
        pdfModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    pdfClose.onclick = function() {
        pdfModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    // Close PDF modal when clicking outside
    window.onclick = function(event) {
        if (event.target == pdfModal) {
            pdfModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Full Screen PDF functionality
    const fullScreenBtn = document.getElementById('fullScreenBtn');
    
    fullScreenBtn.addEventListener('click', function() {
        window.open('./pdfs/laytime-flow-diagram.pdf', '_blank');
    });
});
