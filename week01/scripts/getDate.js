// Get current year
const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;

// Get last modified date
const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = lastModified;
