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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-3 g-0">
                <span class="weekday">${day}</span>
                <div class="d-flex">
                  <span class="max-temp"> 66 </span>
                  <span class="min-temp">
                    18 <br />
                    <img
                      class="weekday-1-icon"
                      src="src/weather-icons/weather-app-icons_few-clouds-day.png"
                      alt=""
                    />
                  </span>
                </div>
              </div>`;
  });
  forecastHTML = forecastHTML + `<div/>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTempAndCity(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let city = document.querySelector("#city");
  let cityBackground = document.querySelector("#city-background");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind");
  let currentDate = document.querySelector("#current-date");
  let mainWeatherIcon = document.querySelector("#main-weather-icon");

  displayForecast();

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
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  showSearchInput(cityInput.value);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

showSearchInput("London");
