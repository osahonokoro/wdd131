// scripts/getdate.js

// Function to update the footer with today's date
function updateLastModified() {
  const footerDate = document.getElementById("last-modified");
  const today = new Date();
  
  // Format: Month Day, Year
  const options = { year: "numeric", month: "long", day: "numeric" };
  footerDate.textContent = today.toLocaleDateString("en-US", options);
}

// Run when the page loads
document.addEventListener("DOMContentLoaded", updateLastModified);
