document.addEventListener('DOMContentLoaded', function() {
    // Tab Functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Function to switch tabs
    function switchTab(tabId) {
        // Remove active class from all tabs and contents
        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to selected tab and content
        const selectedButton = document.querySelector(`[data-tab="${tabId}"]`);
        const selectedContent = document.getElementById(tabId);
        
        if (selectedButton && selectedContent) {
            selectedButton.classList.add('active');
            selectedContent.classList.add('active');
        }
    }

    // Add click handlers to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Set default tab (Laytime)
    switchTab('laytime');

    // Glossary search functionality
    const glossarySearch = document.getElementById('glossarySearch');
    if (glossarySearch) {
        glossarySearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const terms = document.querySelectorAll('.glossary-list dt');
            const definitions = document.querySelectorAll('.glossary-list dd');

            terms.forEach((term, index) => {
                const definition = definitions[index];
                const termText = term.textContent.toLowerCase();
                const definitionText = definition.textContent.toLowerCase();

                if (termText.includes(searchTerm) || definitionText.includes(searchTerm)) {
                    term.style.display = 'block';
                    definition.style.display = 'block';
                } else {
                    term.style.display = 'none';
                    definition.style.display = 'none';
                }
            });
        });
    }

    // Image Modal functionality
    const imageModal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('imageCaption');
    const closeBtn = document.querySelector('.image-modal-close');

    // Function to open modal
    window.openImageModal = function(src, alt) {
        imageModal.style.display = "block";
        modalImg.src = src;
        captionText.innerHTML = alt;
        document.body.style.overflow = 'hidden';
    }

    // Close modal when clicking X
    if (closeBtn) {
        closeBtn.onclick = function() {
            imageModal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    }

    // Close modal when clicking outside the image
    if (imageModal) {
        imageModal.onclick = function(event) {
            if (event.target === imageModal) {
                imageModal.style.display = "none";
                document.body.style.overflow = 'auto';
            }
        }
    }
});
