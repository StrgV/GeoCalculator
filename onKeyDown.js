document.addEventListener('keydown', function(event) {
    if (event.key === 'k' || event.key === 'K') {
        // Preserve the elements related to the Sphere, which includes its title, equation, and image
        const elementsToPreserve = document.querySelectorAll('.sphere');

        // Remove all child elements from the body
        document.body.innerHTML = '';

        // Append the preserved elements to the container
        elementsToPreserve.forEach(element => {
            element.style.padding = '20px';
            document.body.appendChild(element);
        });

        // Create a new button for restoring the page
        const restoreButton = document.createElement('button');
        restoreButton.textContent = 'Restore';
        restoreButton.style.display = 'block';
        restoreButton.style.margin = '20px auto';
        restoreButton.onclick = function() {
        location.reload();
        };

        // Append the restore button to the body
        document.body.appendChild(restoreButton);
    }
});