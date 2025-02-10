//*****REQUIREMENTS*****//
// function for click event that searches using tomorrow.io weather API
//     Note:
//           * convert search input to proper case
//           * API requires lat and long so need geocoord api to convert cities to geocoord
//           * tomorrow.io api does not have icons so need to map weather codes to custom icons
// function replaces the following id items when submit button is clicked:
//           * searching-city
//           * city-result
//           * current-date
//           * weekday
//           * month, day, year
//           * hour, min
//           * temperature, windspeed, humidity, description,icon
//*******************************************************************/

//******CLASSES + IDSs******//
//    .search-form  #search-field   .search-input//
//    #searching   .search-button   .temp
//    #temperature    .icon   .info   #wind
//    #humidity   #descriptor   .time    #hour
//    #min    .city   #city-result  .date
//    #weekday   #month   #day   #year
/*******************************************************************/

//function to update date and time
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

  //for minutes less than 10 display a 0 in front
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  document.querySelector("#weekday").innerHTML = day;
  document.querySelector("#month").innerHTML = month;
  document.querySelector("#day").innerHTML = date;
  document.querySelector("#year").innerHTML = year;
  document.querySelector("#hour").innerHTML = hour;
  document.querySelector("#min").innerHTML = minutes;
}

setInterval(updateDatTime, 60000); // Update every minute

//function to convert city to propercase
function toProperCase(str) {
  return str.replace(/\/\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

//function to search a city
function searchClick(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search-input");

  // update placeholder text when searching'
  let searchPlaceholdertext = cityInput.getAttribute("placeholder");
  cityInput.setAttribute("placeholder", "Searching...");

  cityInput = cityInput.value;
  cityInput = toProperCase(cityInput);

  //tomorrow.io apikey/url
  const apiKey = "xXKqIdDpT0sRO3yOXcGtg5tFS8C7NQZ7";

  //Geocode.maps api/key
  const geocoordKey = "67a86027a7d26583232989ydi590d06";
  const geocoordAPIurl = `https://geocode.maps.co/search?q=${cityInput}&api_key=${geocoordKey}`;

  //call Geocode.maps api to get coords
  axios
    .get(geocoordAPIurl)
    .then((response) => {
      if (response.data && response.data[0]) {
        const { lat, lon } = response.data[0]; //gets the lat and long

        if (!lat || !lon) {
          alert("Location shrouded in darkness. No weather data available.");
          citySearch.style.display = "none";
          return;
        }

        //Tomorrow.io API
        const apiUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${lat},${lon}&apikey=${apiKey}&fields=temperature,weatherCode,humidity,precipitation,weatherIcon,windspeed`;

        updateSearchPlaceholder(cityInput);
        updateCity(cityInput);

        //function to toggle search message on
        let citySearch = document.querySelector("#searching-city");
        citySearch.style.display = "block";

        // tomorrow.io API Call and resets form placeholder text upon search completion
        axios
          .get(apiUrl)
          .then((response) => {
            // Check if response contains valid weather data
            if (
              response.data &&
              response.data.data &&
              response.data.data.values
            ) {
              weatherUpdate(response); // Updates weather data
            } else {
              alert("City not found or invalid. Please try again.");
            }
            cityInput.setAttribute("placeholder", searchPlaceholdertext);
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
            alert("Something went wrong. Please try again later.");
            cityInput.setAttribute("placeholder", searchPlaceholdertext);
          });
      } else {
        alert("City not found or invalid. Please try again.");
        cityInput.setAttribute("placeholder", searchPlaceholdertext);
      }
    })
    .catch((error) => {
      console.error("Error fetching coordinates:", error);
      alert("Something went wrong with the geocode request.");
      cityInput.setAttribute("placeholder", searchPlaceholdertext);
    });
}

//function to update weather data
function weatherUpdate(response) {
  console.log("API Response:", response.data);

  let weatherTemp = document.querySelector("#temperature");
  let weatherWindspeed = document.querySelector("#wind");
  let weatherHumidity = document.querySelector("#humidity");
  let weatherDescription = document.querySelector("#description");
  let weatherIcon = document.querySelector(".icon");

  //this section checks for weathercode and maps the description and icon
  if (response.data && response.data.data && response.data.data.values) {
    let values = response.data.data.values;
    console.log("Weather values:", values); // logs weather values

    // Checks if weatherCode exists in the response
    console.log("Weather code:", values.weatherCode);

    // Update HTML
    weatherTemp.innerHTML = `${Math.round(values.temperature)}°C`;
    weatherWindspeed.innerHTML = `${values.windSpeed}`;
    weatherHumidity.innerHTML = `${values.humidity}`;

    // Get code and update description
    function getDescription(code) {
      if (!code) {
        console.warn("Weathercode is missing.");
        return "missing weathercode!";
      }
      return weatherCodes.weatherCode[code] || "No data";
    }

    // Get weather description using the function
    let description = getDescription(values.weatherCode);
    weatherDescription.innerHTML = description;

    // Maps weather icon to code
    const iconUrl = weatherIcons[values.weatherCode] || weatherIcons[0];

    // Updates weather icon
    if (iconUrl) {
      weatherIcon.innerHTML = `<img src="${iconUrl}" alt="weather icon" />`;
    } else {
      weatherIcon.innerHTML = `<img src="path/to/default/icon.png" alt="default weather icon" />`;
    }
  }
}

// Event listener ("GO" click)
document
  .querySelector(".search-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    searchClick(event);
  });
