// Ensure the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // 1. Update the Footer Year and Last Modified Date
    const yearSpan = document.getElementById("year");
    const lastModifiedSpan = document.getElementById("lastModified");

    // Set the current year dynamically
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;

    // Set the last modified date dynamically
    const lastModifiedDate = document.lastModified;
    lastModifiedSpan.textContent = lastModifiedDate;

    // 2. Implement the Responsive Hamburger Menu Toggle
    const hamburgerButton = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    // Toggle menu visibility when clicking the hamburger button
    hamburgerButton.addEventListener("click", function () {
        if (navMenu.style.display === "none" || navMenu.style.display === "") {
            navMenu.style.display = "flex"; // Show menu
            hamburgerButton.innerHTML = "✖"; // Change to 'X' symbol
        } else {
            navMenu.style.display = "none"; // Hide menu
            hamburgerButton.innerHTML = "&#9776;"; // Change back to hamburger icon
        }
    });

    // Ensure the menu is hidden by default on mobile view
    function checkScreenSize() {
        if (window.innerWidth > 768) {
            navMenu.style.display = "flex"; // Show menu on larger screens
        } else {
            navMenu.style.display = "none"; // Hide menu on mobile
        }
    }

    // Run the function on page load and when resizing
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
});
