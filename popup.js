document.addEventListener('DOMContentLoaded', function() {
    const countElement = document.getElementById('count');
    const viewButton = document.getElementById('view-images');
    const copyButton = document.getElementById('copy-selected');
    const clearButton = document.getElementById('clear-images');
    const statusElement = document.getElementById('status');
    
    // Get selected images count
    browser.storage.local.get(['selectedImages']).then((result) => {
        const selectedCount = result.selectedImages ? result.selectedImages.length : 0;
        countElement.textContent = selectedCount;
        // Hide buttons if selectedCount is zero
        if (selectedCount === 0) {
            viewButton.style.display = 'none';
            copyButton.style.display = 'none';
            clearButton.style.display = 'none';
        }
    });
    
    // View selected images
    viewButton.addEventListener('click', function() {
        browser.storage.local.get(['selectedImages']).then((result) => {
            if (result.selectedImages && result.selectedImages.length > 0) {
                let message = `Selected Images (${result.selectedImages.length}):\n\n`;
                result.selectedImages.forEach((src, index) => {
                    message += `${index + 1}. ${src}\n`;
                });
            } else {
                console.log('No images selected yet!');
            }
        });
    });

    // Copy selected image links
    copyButton.addEventListener('click', function() {
        browser.storage.local.get(['selectedImages']).then((result) => {
            if (result.selectedImages && result.selectedImages.length > 0) {
                let imgLinks = result.selectedImages.join("\n");
                navigator.clipboard.writeText(imgLinks).then(
                    () => { console.log(`Copied ${imgLinks}!`); },
                    () => { console.error(`Failed to copy ${imgLinks}!`); }
                );
            } else {
                console.log('No images selected yet!');
            }
        });
    });
    
    // Clear all selections
    clearButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all selected images?')) {
            browser.storage.local.set({selectedImages: []}).then(() => {
                countElement.textContent = '0';
                statusElement.textContent = 'All selections cleared!';
                setTimeout(() => {
                    statusElement.textContent = '';
                }, 2000);
            });
            const highlightedImages = document.querySelectorAll('.selected-image');
            highlightedImages.forEach(img => {
                img.classList.remove('selected-image');
            });
        }
    });
});