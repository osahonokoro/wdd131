// Ensure the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // 1. Update the Footer Year and Last Modified Date
    const yearSpan = document.getElementById("year");
    const lastModifiedSpan = document.getElementById("lastModified");

    yearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = document.lastModified;

    // 2. Responsive Hamburger Menu Toggle
    const hamburgerButton = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    // Accessibility attributes
    hamburgerButton.setAttribute("aria-expanded", "false");
    hamburgerButton.setAttribute("aria-controls", "navMenu");

    // Toggle menu visibility
    hamburgerButton.addEventListener("click", function () {
        const isOpen = navMenu.classList.toggle("open");

        // Update button icon and accessibility state
        hamburgerButton.textContent = isOpen ? "✖" : "☰";
        hamburgerButton.setAttribute("aria-expanded", isOpen.toString());
    });

    // Set initial menu state based on screen size
    function checkScreenSize() {
        if (window.innerWidth > 768) {
            navMenu.classList.add("open");
            hamburgerButton.textContent = "✖";
            hamburgerButton.setAttribute("aria-expanded", "true");
        } else {
            navMenu.classList.remove("open");
            hamburgerButton.textContent = "☰";
            hamburgerButton.setAttribute("aria-expanded", "false");
        }
    }

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
});
