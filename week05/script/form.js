// Product Array (provided in assignment)
const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        avgRating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        avgRating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        avgRating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        avgRating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        avgRating: 5.0
    }
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Populate Product Select Options
    populateProductOptions();

    // Set footer dates
    setFooterDates();

    // Add form submit tracking (optional)
    trackFormSubmission();
});

/**
 * Populates the product select dropdown with options from the products array
 * Uses product.id for value and product.name for display text
 */
function populateProductOptions() {
    const productSelect = document.getElementById('product-name');

    if (!productSelect) {
        console.error('Product select element not found');
        return;
    }

    // Clear any existing options (except the first placeholder if it exists)
    while (productSelect.options.length > 1) {
        productSelect.remove(1);
    }

    // Add options from products array
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;  // Set value to product ID (as required)
        option.textContent = product.name;  // Display product name
        productSelect.appendChild(option);
    });

    console.log(`Successfully added ${products.length} product options`);
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
 * Tracks form submission (optional enhancement)
 * Can be used for analytics or additional validation
 */
function trackFormSubmission() {
    const form = document.getElementById('review-form');

    if (form) {
        form.addEventListener('submit', function (e) {
            // Optional: Add custom validation here
            console.log('Form submission initiated');

            // You could add field validation here if needed
            const requiredFields = form.querySelectorAll('[required]');
            let allValid = true;

            requiredFields.forEach(field => {
                if (!field.value) {
                    allValid = false;
                    field.style.borderColor = 'var(--error-color)';
                } else {
                    field.style.borderColor = 'var(--border-color)';
                }
            });

            if (!allValid) {
                e.preventDefault();
                alert('Please fill in all required fields');
            }
        });
    }
}

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products, populateProductOptions };
}