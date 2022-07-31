let now = new Date();
function formatDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let dayIndex = date.getDay();
  let day = days[dayIndex];
  return day;
}
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = formatDay(now);

function formatTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let min = date.getMinutes();

  if (min < 10) {
    min = `0${min}`;
  }

  let time = hours + ":" + min;
  return time;
}

function formatDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 forecast">
      <div class="day">${formatDays(forecastDay.dt)}</div>
      <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
      <div class="temperature-day">${Math.round(forecastDay.temp.max)}°C</div>
      <div class="temperature-night">${Math.round(forecastDay.temp.min)}°C</div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "7eda9a879fbfa9500bfd6eee738cce64";
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperarture(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = celsiusTemperature;
  let iconElement = document.querySelector("#icon");
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-type").innerHTML =
    response.data.weather[0].main;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function getTemperatureFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = Math.floor((9 * celsiusTemperature + 160) / 5);
  let temperatureFahrenheit = document.querySelector("#current-temperature");
  temperatureFahrenheit.innerHTML = temperatureElement;
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}

function getTemperatureCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = celsiusTemperature;
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

function search(city) {
  let apiKey = "7eda9a879fbfa9500bfd6eee738cce64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperarture);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;

  let currentCity = document.querySelector("#city");
  if (city) {
    currentCity.innerHTML = city;
  } else {
    currentCity.innerHTML = null;
    alert("Please, type a city...");
  }
  search(city);
}

function showCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "7eda9a879fbfa9500bfd6eee738cce64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperarture);
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", getTemperatureCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", getTemperatureFahrenheit);

let celsiusTemperature = null;

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatTime(now);

let formCity = document.querySelector("#form-enter-city");
formCity.addEventListener("submit", handleSubmit);

let CurrentCity = document.querySelector("#current-location-button");
CurrentCity.addEventListener("click", showCurrentCity);

search("Kyiv");
