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

function showTemperarture(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = temperature;
  let iconElement = document.querySelector("#icon");
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-type").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#min-temperature").innerHTML = Math.round(
    response.data.main.temp_min
  );
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

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

let formCity = document.querySelector("#form-enter-city");
formCity.addEventListener("submit", handleSubmit);

function showCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let CurrentCity = document.querySelector("#current-location-button");
CurrentCity.addEventListener("click", showCurrentCity);

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "7eda9a879fbfa9500bfd6eee738cce64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperarture);
}

search("Kyiv");
