// Footer: Current year and last modified
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Wind Chill Calculation
function calculateWindChill(tempF, speedMph) {
    windchill = (
        35.74 +
        0.6215 * tempF -
        35.75 * Math.pow(speedMph, 0.16) +
        0.4275 * tempF * Math.pow(speedMph, 0.16)
    ).toFixed(1);
    return (windchill)
}

const temp = parseFloat(document.getElementById('temp').textContent);
const speed = parseFloat(document.getElementById('wind').textContent);

let chill = 'N/A';
if (temp <= 50 && speed > 3) {
    chill = `${calculateWindChill(temp, speed)} °F`;
}

document.getElementById('chill').textContent = chill;
