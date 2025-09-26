// ===============================
// Footer: Last Modified + Year
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    // Last modified date
    const lastModified = document.lastModified;
    document.getElementById("lastModified").textContent = lastModified;

    // Current year
    const year = new Date().getFullYear();
    const footer = document.querySelector("footer p");
    footer.innerHTML = `&copy; OKORO | Calabar, Cross Rivers State | ${year} | Last Modified: <span id="lastModified">${lastModified}</span>`;
});

// ===============================
// Wind Chill Calculation
// ===============================
// Formula works for Celsius: T ≤ 10°C and wind speed > 4.8 km/h
function calculateWindChill(tempC, windSpeedKmh) {
    if (tempC <= 10 && windSpeedKmh > 4.8) {
        const chill =
            13.12 +
            0.6215 * tempC -
            11.37 * Math.pow(windSpeedKmh, 0.16) +
            0.3965 * tempC * Math.pow(windSpeedKmh, 0.16);
        return chill.toFixed(1) + " °C";
    } else {
        return "N/A";
    }
}

// Example: Replace with real data or API values
const temperature = 8;      // Example temperature in °C
const windSpeed = 12;       // Example wind speed in km/h

// Display result in Weather section
document.addEventListener("DOMContentLoaded", () => {
    const windChillElement = document.getElementById("windChill");
    if (windChillElement) {
        windChillElement.textContent = calculateWindChill(temperature, windSpeed);
    }
});
