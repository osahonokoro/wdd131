// scripts/getdate.js

function updateLastModified() {
    const footerDate = document.getElementById("last-modified");
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    footerDate.textContent = today.toLocaleDateString("en-US", options);
}
document.addEventListener("DOMContentLoaded", updateLastModified);
