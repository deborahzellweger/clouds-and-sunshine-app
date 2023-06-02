function showTempAndCity(response) {
  console.log(response.data);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${Math.round(
    response.data.temperature.current
  )}°`;
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed} KM/H`;
}

let city = "Bern";
let apiKey = "fb48762bae7aac273c01t1cb80b143fo";
let unit = "metric";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;

axios.get(apiUrl).then(showTempAndCity);
