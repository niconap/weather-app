function getWeatherData(location) {
  let url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=25990e6ab787d143911d15e7f640d6cf";
  fetch(url, {
    mode: "cors",
  }).then(async function (response) {
    let json = await response.json();
    console.log(json);
    processData(json);
  });
}

function processData(json) {
  let data = {
    location: json.name + ", " + json.sys.country,
    temp: Math.round(json.main.temp) - 273,
    feels_like: Math.round(json.main.feels_like) - 273,
    humidity: json.main.humidity + "%",
    wind_speed: Math.round(json.wind.speed) + "MPH",
    description: json.weather[0].description,
  };
  console.log(data);
}
