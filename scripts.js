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
  searchButton.disabled = true;
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
    temp: Math.round(json.main.temp) - 273 + "°C",
    feels_like: Math.round(json.main.feels_like) - 273 + "°C",
    humidity: json.main.humidity + "%",
    wind_speed: Math.round(json.wind.speed) + "MPH",
    description: json.weather[0].description,
    icon: json.weather[0].icon,
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
    paragraph.classList.toggle("fade");
  }, 2000);
  setTimeout(() => {
    search.removeChild(paragraph);
  }, 2200);
  searchButton.disabled = false;
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
    let datadiv = document.createElement("div");
    datadiv.id = "data";
    let description = document.createElement("p");
    description.textContent =
      search.description.charAt(0).toUpperCase() + search.description.slice(1);
    description.id = "description";
    datadiv.appendChild(description);
    let temp = document.createElement("p");
    temp.textContent = "Temperature: " + search.temp;
    temp.id = "temp";
    datadiv.appendChild(temp);
    let feels_like = document.createElement("p");
    feels_like.textContent = "Feels like: " + search.feels_like;
    feels_like.id = "feels_like";
    datadiv.appendChild(feels_like);
    let humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + search.humidity;
    humidity.id = "humidity";
    datadiv.appendChild(humidity);
    let wind_speed = document.createElement("p");
    wind_speed.textContent = "Wind speed: " + search.wind_speed;
    wind_speed.id = "wind_speed";
    datadiv.appendChild(wind_speed);
    main.appendChild(datadiv);
    let icon = document.createElement("img");
    icon.src = "http://openweathermap.org/img/wn/" + search.icon + "@2x.png";
    icon.id = "icon";
    main.appendChild(icon);
    container.appendChild(main);
    main.classList.toggle("fade");
    setTimeout(() => {
      main.classList.toggle("fade");
    }, 200);
  });
  searchButton.disabled = false;
}

// Get a gif by searching for the description on GIPHY
async function getGif(url) {
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  return data.data.images.original.url;
}
