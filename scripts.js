// Array with all searches
let searches = [];

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
    temp: Math.round(json.main.temp) - 273 + " ℃",
    feels_like: Math.round(json.main.feels_like) - 273 + " ℃",
    humidity: json.main.humidity + "%",
    wind_speed: Math.round(json.wind.speed) + "MPH",
    description: json.weather[0].description,
  };
  searches = [data, ...searches];
  render();
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

// Render all data from the searches array
function render() {
  let container = document.getElementById("history");
  container.textContent = "";
  searches.forEach((search) => {
    let main = document.createElement("div");
    main.id = "historicsearch";
    let location = document.createElement("h4");
    location.textContent = search.location;
    location.id = "location";
    main.appendChild(location);
    let description = document.createElement("description");
    description.textContent = search.description;
    description.id = "description";
    main.appendChild(description);
    let temp = document.createElement("p");
    temp.textContent = search.temp;
    temp.id = "temp";
    main.appendChild(temp);
    let feels_like = document.createElement("p");
    feels_like.textContent = "Feels like: " + search.feels_like;
    feels_like.id = "feels_like";
    main.appendChild(feels_like);
    let humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + search.humidity;
    humidity.id = "humidity";
    main.appendChild(humidity);
    let wind_speed = document.createElement("p");
    wind_speed.textContent = "Wind speed: " + search.wind_speed;
    wind_speed.id = "wind_speed";
    main.appendChild(wind_speed);
    container.appendChild(main);
  });
}
