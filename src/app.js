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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  let day = days[date.getDay()];
  return `${day}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastDetails = response.data.daily;

  let forecastHTML = `<div class="row">`;
  forecastDetails.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-sm-3 g-0">
                <span class="weekday"> ${formatForecastDay(
                  forecastDay.time
                )}</span>
                <div class="d-flex">
                  <span class="max-temp"> ${Math.round(
                    forecastDay.temperature.maximum
                  )} </span>
                  <span class="min-temp">
                    ${Math.round(forecastDay.temperature.minimum)}  <br />
                    <img
                      class="weekday-1-icon"
                      src="src/weather-icons/weather-app-icons_few-clouds-day.png"
                      alt=""
                    />
                  </span>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `<div/>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let apiKey = "fb48762bae7aac273c01t1cb80b143fo";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayForecast);
}

function showTempAndCity(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let city = document.querySelector("#city");
  let cityBackground = document.querySelector("#city-background");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind");
  let currentDate = document.querySelector("#current-date");
  let mainWeatherIcon = document.querySelector("#main-weather-icon");

  celsiusTemperature = response.data.temperature.current;

  currentTemperature.innerHTML = `${Math.round(celsiusTemperature)}`;
  city.innerHTML = response.data.city;
  cityBackground.innerHTML = response.data.city;
  currentHumidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  currentWindSpeed.innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} KM/H`;
  currentDate.innerHTML = formatDate(response.data.time * 1000);
  mainWeatherIcon.setAttribute(
    "src",
    `src/weather-icons/weather-app-icons_clear-sky-day.png`
  );
}

function showSearchInput(city) {
  let apiKey = "fb48762bae7aac273c01t1cb80b143fo";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTempAndCity);

  getForecast(city);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  showSearchInput(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

showSearchInput("London");
