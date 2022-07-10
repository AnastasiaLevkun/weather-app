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
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatTime(now);

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");

  let currentCity = document.querySelector("h1");
  if (cityInput.value) {
    currentCity.innerHTML = cityInput.value;
  } else {
    currentCity.innerHTML = null;
    alert("Please, type a city...");
  }
  let city = cityInput.value;
  let apiKey = "7eda9a879fbfa9500bfd6eee738cce64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperarture);
}

let formCity = document.querySelector("#form-enter-city");
formCity.addEventListener("submit", searchCity);

function showTemperarture(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = temperature;

  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", getTemperatureCelsius);

  function getTemperatureCelsius(event) {
    event.preventDefault();
    let temperatureCelsius = document.querySelector("#current-temperature");
    temperatureCelsius.innerHTML = temperature;
  }
  function getTemperatureFahrenheit(event) {
    event.preventDefault();
    let currentTemperatureFahrenheit = Math.floor((9 * temperature + 160) / 5);
    let temperatureFahrenheit = document.querySelector("#current-temperature");
    temperatureFahrenheit.innerHTML = currentTemperatureFahrenheit;
  }
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.addEventListener("click", getTemperatureFahrenheit);
}
function currentTemperarture(response) {
  function showCurrentCity(event) {
    event.preventDefault();
    console.log(response.data);
    let currentCityName = response.data.name;
    let currentTemperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#current-temperature");
    temperatureElement.innerHTML = currentTemperature;
    let cityElement = document.querySelector("h1");
    cityElement.innerHTML = currentCityName;

    function getTemperatureCelsius(event) {
      event.preventDefault();
      let temperatureCelsiusNow = document.querySelector(
        "#current-temperature"
      );
      temperatureCelsiusNow.innerHTML = currentTemperature;
    }

    let celsiusNow = document.querySelector("#celsius");
    celsiusNow.addEventListener("click", getTemperatureCelsius);
    function getTemperatureFahrenheit(event) {
      event.preventDefault();
      let currentTemperatureFahrenheitNow = Math.floor(
        (9 * currentTemperature + 160) / 5
      );
      let temperatureFahrenheitNow = document.querySelector(
        "#current-temperature"
      );
      temperatureFahrenheitNow.innerHTML = currentTemperatureFahrenheitNow;
    }
    let fahrenheitNow = document.querySelector("#fahrenheit");
    fahrenheitNow.addEventListener("click", getTemperatureFahrenheit);
  }

  let CurrentCity = document.querySelector("#current-location-button");
  CurrentCity.addEventListener("click", showCurrentCity);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "7eda9a879fbfa9500bfd6eee738cce64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(currentTemperarture);
}

navigator.geolocation.getCurrentPosition(handlePosition);
