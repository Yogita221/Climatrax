const apiKey = "23d138d53afe843e9021cad9e9282a36"; // Your OpenWeather API key

// Selecting elements
const Cityinput = document.getElementById("Cityinput");
const btn = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const weatherIconImg = document.getElementById("weather-icon-img");
const errorMessage = document.getElementById("error-message");
const weatherInfo = document.getElementById("weather-info");

// Event listener for button click
btn.addEventListener("click", () => {
    const city = Cityinput.value.trim();
    
    if (city !== "") {
        getWeather(city);
    } else {
        errorMessage.textContent = "Please enter a city name!";
        weatherInfo.style.display = "none";
    }
});

// Fetch weather data
async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            showError(data.message);
        }
    } catch (error) {
        showError("Failed to fetch weather data. Try again!");
    }
}

// Display weather information
function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
    description.textContent = `Weather: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    // Set weather icon
    const iconCode = data.weather[0].icon;
    weatherIconImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIconImg.alt = data.weather[0].description;

    errorMessage.textContent = "";
    weatherInfo.style.display = "block";
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    weatherInfo.style.display = "none";
}
