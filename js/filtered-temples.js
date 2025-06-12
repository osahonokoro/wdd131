console.log("JavaScript file is loaded!");

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

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Add more temple objects here...
    {
        templeName: "Nashville Tennessee Temple",
        location: "Tennessee, United States",
        dedicated: " 2000, May, 21",
        area: 10700,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/nashville-tennessee-temple/nashville-tennessee-temple-38227-main.jpg"
    },
    {
        templeName: "Madrid Spain Temple",
        location: " Madrid, Spain",
        dedicated: "1999, March, 19-21",
        area: 45800,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/_temp/056-Madrid-Spain-Temple.jpg"
    },
    {
        templeName: "Twin Falls Idaho Temple",
        location: "Twin Falls, Idaho, United States",
        dedicated: " 2008, August, 24",
        area: 31245,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/twin-falls-idaho-temple/twin-falls-idaho-temple-56338-main.jpg"
    },
  ];

function displayTemples(filteredTemples) {
    const container = document.getElementById("templeContainer");
    container.innerHTML = ""; // Clear previous content

    filteredTemples.forEach(temple => {
        const templeCard = document.createElement("figure");

        templeCard.innerHTML = `
            <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
            <figcaption>
                <h2>${temple.templeName}</h2>
                <p><strong>Location:</strong> ${temple.location}</p>
                <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
                <p><strong>Area:</strong> ${temple.area} sq ft</p>
            </figcaption>
        `;

        container.appendChild(templeCard);
    });
}

function filterTemples(criteria) {
    let filteredTemples = temples;

    switch (criteria) {
        case "old":
            filteredTemples = temples.filter(t => parseInt(t.dedicated.split(",")[0]) < 1900);
            break;
        case "new":
            filteredTemples = temples.filter(t => parseInt(t.dedicated.split(",")[0]) > 2000);
            break;
        case "large":
            filteredTemples = temples.filter(t => t.area > 90000);
            break;
        case "small":
            filteredTemples = temples.filter(t => t.area < 10000);
            break;
        default:
            filteredTemples = temples; // Show all temples
    }

    displayTemples(filteredTemples);
}

document.addEventListener("DOMContentLoaded", () => {
    displayTemples(temples); // Show all temples initially

    document.getElementById("filterMenu").addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            const filterType = event.target.getAttribute("data-filter");
            filterTemples(filterType);
        }
    });

    // Footer Year and Last Modified Date
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
});
