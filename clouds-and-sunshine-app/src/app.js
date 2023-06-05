function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showTempAndCity(response) {
  console.log(response.data);
  let currentTemperature = document.querySelector("#current-temperature");
  let city = document.querySelector("#city");
  let cityBackground = document.querySelector("#city-background");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind");
  let currentDate = document.querySelector("#current-date");
  let mainWeatherIcon = document.querySelector("#main-weather-icon");

  currentTemperature.innerHTML = `${Math.round(
    response.data.temperature.current
  )}°`;
  city.innerHTML = response.data.city;
  cityBackground.innerHTML = response.data.city;
  currentHumidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  currentWindSpeed.innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} KM/H`;
  currentDate.innerHTML = formatDate(response.data.time * 1000);
  mainWeatherIcon.setAttribute("src", `${response.data.condition.icon_url}`);
}

function showSearchInput(city) {
  let apiKey = "fb48762bae7aac273c01t1cb80b143fo";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTempAndCity);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  showSearchInput(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
