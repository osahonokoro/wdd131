// Investment package array with id and name
const investmentPackages = [
    { id: "pkg0", name: "₦1M – 3 Months" },
    { id: "pkg1", name: "₦2M – 6 Months" },
    { id: "pkg2", name: "₦5M – 12 Months" },
    { id: "pkg3", name: "₦10M – 18 Months" }
];

// Target the select element
const select = document.getElementById("package");

// Populate the select dropdown with options
investmentPackages.forEach(pkg => {
    const option = document.createElement("option");
    option.value = pkg.id;           // Use ID as value (rubric requirement)
    option.textContent = pkg.name;   // Display name as visible text
    select.appendChild(option);
});
