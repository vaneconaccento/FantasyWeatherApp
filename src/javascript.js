//Weather codes
const weatherCodes = {
  weatherCode: {
    0: "Unknown",
    1000: "Clear, Sunny",
    1100: "Mostly Clear",
    1101: "Partly Cloudy",
    1102: "Mostly Cloudy",
    1001: "Cloudy",
    2000: "Fog",
    2100: "Light Fog",
    4000: "Drizzle",
    4001: "Rain",
    4200: "Light Rain",
    4201: "Heavy Rain",
    5000: "Snow",
    5001: "Flurries",
    5100: "Light Snow",
    5101: "Heavy Snow",
    6000: "Freezing Drizzle",
    6001: "Freezing Rain",
    6200: "Light Freezing Rain",
    6201: "Heavy Freezing Rain",
    7000: "Ice Pellets",
    7101: "Heavy Ice Pellets",
    7102: "Light Ice Pellets",
    8000: "Thunderstorm",
  },
};

//mapped icons
const weatherIcons = {
  0: "https://cdn-icons-png.flaticon.com/128/1680/1680365.png", // Unknown
  1000: "https://cdn-icons-png.flaticon.com/128/1113/1113737.png", // Clear, Sunny
  1100: "https://cdn-icons-png.flaticon.com/128/1472/1472784.png", // Mostly Clear
  1101: "https://cdn-icons-png.flaticon.com/128/925/925573.png", // Partly Cloudy
  1102: "https://cdn-icons-png.flaticon.com/128/13723/13723618.png", // Mostly Cloudy
  1001: "https://cdn-icons-png.flaticon.com/128/13723/13723618.png", // Cloudy
  2000: "https://cdn-icons-png.flaticon.com/128/12780/12780889.png", // Fog
  2100: "https://www.flaticon.com/free-icon/mist_2910189", // Light Fog
  4000: "https://cdn-icons-png.flaticon.com/128/3076/3076129.png", // Drizzle
  4001: "https://cdn-icons-png.flaticon.com/128/13718/13718297.png", // Rain
  4200: "https://cdn-icons-png.flaticon.com/128/13718/13718341.png", // Light Rain
  4201: "https://cdn-icons-png.flaticon.com/128/13718/13718341.png", // Heavy Rain
  5000: "https://cdn-icons-png.flaticon.com/128/13723/13723555.png", // Snow
  5001: "https://cdn-icons-png.flaticon.com/128/13722/13722767.png", // Flurries
  5100: "https://cdn-icons-png.flaticon.com/128/10873/10873793.png", // Light Snow
  5101: "https://cdn-icons-png.flaticon.com/128/3677/3677574.png", // Heavy Snow
  6000: "https://cdn-icons-png.flaticon.com/128/9258/9258722.png", // Freezing Drizzle
  6001: "https://cdn-icons-png.flaticon.com/128/10344/10344411.png", // Freezing Rain
  6200: "https://cdn-icons-png.flaticon.com/128/10344/10344411.png", // Light Freezing Rain
  6201: "https://cdn-icons-png.flaticon.com/128/10344/10344411.png", // Heavy Freezing Rain
  7000: "https://cdn-icons-png.flaticon.com/128/1999/1999846.png", // Ice Pellets
  7101: "https://cdn-icons-png.flaticon.com/128/1999/1999846.png", // Heavy Ice Pellets
  7102: "https://cdn-icons-png.flaticon.com/128/1999/1999846.png", // Light Ice Pellets
  8000: "https://cdn-icons-png.flaticon.com/128/11250/11250254.png", // Thunderstorm
};

//************************************************************************ */

// Date and time update
function updateDatTime() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let date = now.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let year = now.getFullYear();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  //add 0 before min if under 10 min
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  document.querySelector(
    "#current-date"
  ).innerHTML = `${day}, ${month} ${date}, ${year}`;
  document.querySelector("#current-time").innerHTML = `${hour}:${minutes}`;
}

updateDatTime();
// Update every minute (60000 milliseconds)
setInterval(updateDatTime, 60000);

// Function to convert city to proper case
function toProperCase(str) {
  return str.replace(/\/\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Function to search a city
function searchClick(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search-input");

  cityInput = cityInput.value;
  cityInput = toProperCase(cityInput); // Capitalize city input

  // Tomorrow.io API Key & Geocode API Key
  const apiKey = "xXKqIdDpT0sRO3yOXcGtg5tFS8C7NQZ7";
  const geocoordKey = "67a86027a7d26583232989ydi590d06";
  const geocoordAPIurl = `https://geocode.maps.co/search?q=${cityInput}&api_key=${geocoordKey}`;

  // Call Geocode API to get coordinates
  axios
    .get(geocoordAPIurl)
    .then((response) => {
      if (response.data && response.data[0]) {
        const { lat, lon } = response.data[0]; // Get latitude and longitude

        if (!lat || !lon) {
          alert("Location not found. No weather data available.");
          return;
        }

        // Call Tomorrow.io API
        const apiUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${lat},${lon}&apikey=${apiKey}&fields=temperature,weatherCode,humidity,precipitation,weatherIcon,windspeed`;

        axios
          .get(apiUrl)
          .then((response) => {
            if (
              response.data &&
              response.data.data &&
              response.data.data.values
            ) {
              weatherUpdate(response, cityInput); // Pass cityInput to weatherUpdate
            } else {
              alert("No weather data found for this city.");
            }
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
            alert("Error fetching weather data. Please try again.");
          });
      } else {
        alert("City not found or invalid. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error fetching coordinates:", error);
      alert("Error fetching coordinates. Please try again.");
    });
}

// Function to update weather data
function weatherUpdate(response, cityInput) {
  console.log("API Response:", response.data);
  console.log("weatherCodes:", weatherCodes);

  let weatherTemp = document.querySelector("#temperature");
  let weatherUnit = document.querySelector("#metric");
  let weatherWindspeed = document.querySelector("#wind");
  let weatherHumidity = document.querySelector("#humidity");
  let weatherDescription = document.querySelector("#descriptor");
  let weatherIcon = document.querySelector(".icon");
  let weatherCity = document.querySelector("#city-result");

  if (response.data && response.data.data && response.data.data.values) {
    let values = response.data.data.values;

    // Update HTML with weather data
    weatherTemp.innerHTML = `${Math.round(values.temperature)}°`;
    weatherUnit.innerHTML = `C`;
    weatherWindspeed.innerHTML = `Windspeed: ${values.windSpeed} km/h`;
    weatherHumidity.innerHTML = `Humidity: ${values.humidity}%`;

    // Get weather description using weatherCode from weatherCodes object
    let description =
      weatherCodes.weatherCode[values.weatherCode] ||
      "No description available";
    weatherDescription.innerHTML = description;

    // Get weather icon using weatherCode from weatherIcons object
    const iconUrl = weatherIcons[values.weatherCode] || weatherIcons[0]; // Default to Unknown icon
    weatherIcon.innerHTML = `<img src="${iconUrl}" alt="Weather icon" />`;

    // Update city name
    weatherCity.innerHTML = cityInput;
  }
}

// Event listener for "GO" button click
document
  .querySelector(".search-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    searchClick(event);
  });
