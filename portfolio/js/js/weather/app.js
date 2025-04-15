// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", populateTableRows);

// Utility function to capitalize the first letter of a string
const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

// Async function to fetch weather data and populate the table
async function populateTableRows() {
    try {
        // Fetch weather data from the OpenWeatherMap API
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=dublin,ie&units=metric&APPID=bc425ac2188d406c884f4fdd88b339f0');

        // Check if the response status is not OK
        if (!response.ok) {
            console.error(`Error Status Code: ${response.status}`);
            return;
        }

        // Parse the JSON response
        const data = await response.json();

        // Construct table rows with weather data
        const strTableRows = `
            <tr>
                <td><span>Summary</span></td>
                <td>${capitalize(data.weather[0].description)}</td>
            </tr>
            <tr>
                <td><span>Temperature</span></td>
                <td>${data.main.temp} &deg;C</td>
            </tr>
            <tr>
                <td><span>Humidity</span></td>
                <td>${data.main.humidity} %</td>
            </tr>
            <tr>
                <td><span>Pressure</span></td>
                <td>${data.main.pressure} Pa</td>
            </tr>
        `;

        // Update the table body with the constructed rows
        document.querySelector("#table-weather-dublin tbody").innerHTML = strTableRows;

        // Call the function to change the background based on the time of day
        changeBackground();
    } catch (error) {
        // Log any errors that occur during the fetch or processing
        console.error('Error fetching weather data:', error);
    }
}

// Function to change the background image based on the time of day
function changeBackground() {
    const currentHour = new Date().getHours();
    const themeElement = document.querySelector(".theme-js");

    if (currentHour > 23 || currentHour <= 6) {
        themeElement.style.backgroundImage = "url('assets/img/dublin-night.jpg')";
    } else {
        themeElement.style.backgroundImage = "url('assets/img/dublin-day.jpg')";
    }
}
