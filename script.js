document.addEventListener('DOMContentLoaded', function() {
    // Glossary Modal functionality
    const modal = document.getElementById('glossaryModal');
    const btn = document.getElementById('glossaryButton');
    const span = document.querySelector('.close');

    // Show modal when glossary button is clicked
    btn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Close modal when X is clicked
    span.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
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
            
            function highlightText(element, searchTerm) {
                if (!searchTerm) {
                    element.innerHTML = element.textContent;
                    return;
                }
                
                const content = element.textContent;
                const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                element.innerHTML = content.replace(regex, '<span class="highlight-match">$1</span>');
            }

            terms.forEach((term, index) => {
                const definition = definitions[index];
                const termText = term.textContent.toLowerCase();
                const definitionText = definition.textContent.toLowerCase();
                
                if (!searchTerm) {
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

            document.querySelectorAll('.glossary-list h3').forEach(header => {
                const nextSection = header.nextElementSibling;
                let hasVisibleTerms = false;
                let current = nextSection;
                while (current && current.tagName !== 'H3') {
                    if (current.tagName === 'DT' && !current.classList.contains('hidden')) {
                        hasVisibleTerms = true;
                    }
                    current = current.nextElementSibling;
                }
                if (!hasVisibleTerms) {
                    header.classList.add('hidden');
                } else {
                    header.classList.remove('hidden');
                }
            });
        });
    }

    // Image Modal functionality
    function openImageModal(src, alt) {
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("modalImage");
        const captionText = document.getElementById("imageCaption");
        
        modal.style.display = "block";
        modalImg.src = src;
        captionText.innerHTML = alt;
    }

    // Image Modal functionality
    const imageModal = document.getElementById("imageModal");
    const closeImageBtn = document.getElementsByClassName("image-modal-close")[0];

    // Make all gallery images clickable
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', function() {
            openImageModal(this.src, this.alt);
        });
    });

    // Close image modal when clicking the × button
    closeImageBtn.onclick = function() {
        imageModal.style.display = "none";
    }

    // Close image modal when clicking outside the image
    imageModal.onclick = function(event) {
        if (event.target === imageModal) {
            imageModal.style.display = "none";
        }
    }

    // Close image modal with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && imageModal.style.display === "block") {
            imageModal.style.display = "none";
        }
    });
});
