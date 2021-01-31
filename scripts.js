// Variable to track if error was shown
let errorShown = false;

// Event listener of the search button and selecting the input
let searchButton = document.getElementById("searchbutton");
let searchInput = document.getElementById("searchinput");
searchButton.addEventListener("click", () => {
  getWeatherData(searchInput.value);
});

// Fetch the weather data and turn it into a JSON string
function getWeatherData(location) {
  let url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=25990e6ab787d143911d15e7f640d6cf";
  fetch(url, {
    mode: "cors",
  }).then(async function (response) {
    let json = await response.json();
    if (!json.message) {
      console.log(json);
      processData(json);
    } else {
      createError(json.message);
    }
  });
}

// Take the JSON string and return the data you need as an object
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

// Display an error below the searchbar
function createError(message) {
  let search = document.getElementById("search");
  let paragraph = document.createElement("p");
  paragraph.id = "error";
  paragraph.textContent = "Oops, an error occured: " + message;
  search.appendChild(paragraph);
  setTimeout(() => {
    search.removeChild(paragraph);
  }, 2000);
}
