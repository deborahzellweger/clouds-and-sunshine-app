function showTemp(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${Math.round(
    response.data.temperature.current
  )}°`;
}

let city = "London";
let apiKey = "fb48762bae7aac273c01t1cb80b143fo";
let unit = "metric";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;

axios.get(apiUrl).then(showTemp);
