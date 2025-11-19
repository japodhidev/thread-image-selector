// Wait for page to fully load
window.addEventListener('load', function() {
    initializeImageSelector();
});


function initializeImageSelector() {
    let selectedImages = new Set();
    
    // Create floating control panel
    const controlPanel = document.createElement('div');
    controlPanel.id = 'image-selector-panel';
    controlPanel.innerHTML = `
        <div class="panel-header">
            <span>Image Selector</span>
            <button id="close-panel">×</button>
        </div>
        <div class="panel-content">
            <div class="counter">Selected: <span id="selected-count">0</span></div>
            <button id="view-selected" class="btn">View Selected</button>
            <button id="copy-selected" class="btn">
                Copy To Clipboard
                <span id="check-icon-select">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12l2 2l4-4"/></g></svg>
                </span>
            </button>
            <button id="clear-selected" class="btn btn-danger">
                Clear All
                <span id="check-icon-clear">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12l2 2l4-4"/></g></svg>
                </span>
            </button>
        </div>
    `;
    document.body.appendChild(controlPanel);
    
    // Load previously selected images
    browser.storage.local.get(['selectedImages']).then((result) => {
        if (result.selectedImages) {
            selectedImages = new Set(result.selectedImages);
            updateCounter();
        }
    });
    
    // Add click handlers for image selection
    document.addEventListener('click', function(e) {
        // Check if clicked element is an image
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            e.stopPropagation();
            toggleImageSelection(e.target);
        }
    });
    
    // Panel button handlers
    document.getElementById('close-panel').addEventListener('click', function() {
        controlPanel.style.display = 'none';
    });
    
    document.getElementById('clear-selected').addEventListener('click', function() {
        selectedImages.clear();
        saveSelectedImages();
        updateCounter();
        showIcon("check-icon-clear");
        removeImageHighlights();
    });

    document.getElementById('copy-selected').addEventListener('click', function() {
        //Extract set elements to an array
        const imageStr = Array.from(selectedImages).join("\n");
        // Copy selected images to clipboard
        navigator.clipboard.writeText(imageStr).then(
            () => {
                console.log(`Copied ${selectedImages.size} images to the clipboard.`);
            },
            () => {
                console.error("Couldn't copy to the clipboard!");
            },
        );
        showIcon("check-icon-select");

    });
    
    document.getElementById('view-selected').addEventListener('click', function() {
        showSelectedImages();
    });
    
    function toggleImageSelection(img) {
        // Copy the parent <a>'s href value or burst
        const imgSrc = img.closest('a').href || '';
        if (!imgSrc) return;
        
        if (selectedImages.has(imgSrc)) {
            selectedImages.delete(imgSrc);
            img.classList.remove('selected-image');
        } else {
            selectedImages.add(imgSrc);
            img.classList.add('selected-image');
        }
        
        saveSelectedImages();
        updateCounter();
    }
    
    function saveSelectedImages() {
        browser.storage.local.set({
            selectedImages: Array.from(selectedImages)
        });
    }
    
    function updateCounter() {
        const counter = document.getElementById('selected-count');
        if (counter) {
            counter.textContent = selectedImages.size;
        }
    }
    
    function removeImageHighlights() {
        const highlightedImages = document.querySelectorAll('.selected-image');
        highlightedImages.forEach(img => {
            img.classList.remove('selected-image');
        });
    }
    
    function showSelectedImages() {
        if (selectedImages.size === 0) {
            console.log('No images selected yet!');
            return;
        }
        
        let message = `Selected Images (${selectedImages.size}):\n\n`;
        let count = 1;
        selectedImages.forEach(src => {
            message += `${count}. ${src}\n`;
            count++;
        });
        
    }
    
    // Highlight already selected images
    setTimeout(() => {
        selectedImages.forEach(src => {
            const img = document.querySelector(`img[src="${src}"], img[data-src="${src}"]`);
            if (img) {
                img.classList.add('selected-image');
            }
        });
    }, 1000);

    function showIcon(iconId) {
        const checkIcon = document.getElementById(iconId);
        if (checkIcon) {
            checkIcon.style.display = "block";
        }

        // Hide button after 2 seconds
        setTimeout(() => {
            checkIcon.style.display = 'none';
        }, 2000);
    }
}