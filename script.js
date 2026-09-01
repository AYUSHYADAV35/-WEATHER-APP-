// Week 3 - JavaScript Logic & APIs
// Weather App using OpenWeatherMap Current Weather API.
//
// IMPORTANT:
// 1. Create an OpenWeather account.
// 2. Generate your API key.
// 3. Paste it below between the quotes.
// 4. Do not share your real API key publicly.

const API_KEY = "c4b3afe3f2ea14d05a27502b6b126513";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");
const weatherResult = document.getElementById("weatherResult");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const feelsLike = document.getElementById("feelsLike");

async function getWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    showMessage("Please enter a city name.");
    weatherResult.classList.add("hidden");
    return;
  }

  if (API_KEY === "PASTE_YOUR_OPENWEATHER_API_KEY_HERE") {
    showMessage("Add your OpenWeather API key in script.js first.");
    weatherResult.classList.add("hidden");
    return;
  }

  showMessage("Loading weather...");
  weatherResult.classList.add("hidden");
  searchBtn.disabled = true;

  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Check the spelling and try again.");
      }
      if (response.status === 401) {
        throw new Error("Invalid API key. Check your OpenWeather API key.");
      }
      throw new Error("Unable to fetch weather data right now.");
    }

    const data = await response.json();

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = Math.round(data.main.temp);
    condition.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

    message.textContent = "";
    weatherResult.classList.remove("hidden");
  } catch (error) {
    showMessage(error.message);
  } finally {
    searchBtn.disabled = false;
  }
}

function showMessage(text) {
  message.textContent = text;
}

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeather();
  }
});
