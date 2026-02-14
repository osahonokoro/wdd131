// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize and update review counter
    updateReviewCounter();

    // Set footer dates
    setFooterDates();

    // Add animation to counter (optional enhancement)
    animateCounter();
});

/**
 * Updates the review counter using localStorage
 * Increments by 1 each time review.html is loaded
 */
function updateReviewCounter() {
    // Get the current count from localStorage
    let reviewCount = localStorage.getItem('reviewCount');

    // If no count exists, initialize to 0
    if (reviewCount === null) {
        reviewCount = 0;
    } else {
        // Convert string to number
        reviewCount = parseInt(reviewCount);
    }

    // Increment the count for this new review
    reviewCount++;

    // Save the updated count back to localStorage
    localStorage.setItem('reviewCount', reviewCount.toString());

    // Display the count on the page
    const reviewCountElement = document.getElementById('review-count');
    if (reviewCountElement) {
        reviewCountElement.textContent = reviewCount;

        // Add a data attribute for animation
        reviewCountElement.setAttribute('data-count', reviewCount);
    }

    console.log(`Review counter updated: ${reviewCount} total reviews`);
}

/**
 * Sets the current year and last modified date in the footer
 */
function setFooterDates() {
    // Set current year
    const currentYearElement = document.getElementById('currentyear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Set last modified date
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }
}

/**
 * Optional: Adds a simple animation to the counter
 * Makes the number pulse when it updates
 */
function animateCounter() {
    const counterElement = document.getElementById('review-count');

    if (counterElement) {
        // Add animation class
        counterElement.classList.add('counter-update');

        // Remove animation class after it completes
        setTimeout(() => {
            counterElement.classList.remove('counter-update');
        }, 500);
    }
}

// Add CSS animation style (can be added to CSS file instead)
const style = document.createElement('style');
style.textContent = `
    .counter-update {
        animation: pulse 0.5s ease-in-out;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); color: var(--accent-color); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { updateReviewCounter };
}