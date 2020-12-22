function formatDate(timestamp) {
    let date = new Date(timestamp);
   

    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let day = days[date.getDay()];

    let datum = date.getDate();

    let months = ['January','February','March','April','May','June','July','August','Septemeber','October','November','December'];
    let month = months[date.getMonth()];

    return `${formatHours(timestamp)}, ${day} ${datum} ${month}`;
}

function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
}

function displayTemperature(response) {
    
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let feelsElement = document.querySelector("#feels");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let descriptionElement = document.querySelector("#description");
    let datetimeElement = document.querySelector("#datetime");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    feelsTemperature = response.data.main.feels_like;
    feelsElement.innerHTML = Math.round(feelsTemperature);
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    descriptionElement.innerHTML = response.data.weather[0].description;
    datetimeElement.innerHTML = formatDate(response.data.dt*1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    for (let i = 0; i<6; i++) {
        forecast = response.data.list[i];
        forecastElement.innerHTML +=
        `<div class="col-2">
                  <h4>
                    ${formatHours(forecast.dt*1000)}
                  </h4>
                  <img
                    src="${`http://openweathermap.org/img/wn/${response.data.list[i].weather[0].icon}@2x.png`}"
                    alt="${response.data.list[i].weather[0].description}"
                  />
                  <div class="weather-forecast-temperature">
                    <strong class="max-forecast-temp">
                    ${Math.round(response.data.list[i].main.temp_max)}°
                    </strong> 
                    ${Math.round(response.data.list[i].main.temp_min)}°
                  </div>
                </div>`
    }
}

function search(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function showPosition(position) {
    latitude = position.coords.latitude;
   longitude = position.coords.longitude;

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
   
axios.get(apiUrl).then(displayTemperature);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function getLocal(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}

function displayFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature = (celsiusTemperature * 9)/ 5 + 32;  
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
}

function displayCelsiusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
}

function displayFahrenheitTempSmall(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#feels");
    let fahrenheitTemperature = (feelsTemperature * 9)/ 5 + 32;  
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    smallCelsiusLink.classList.remove("active");
    smallFahrenheitLink.classList.add("active");
}

function displayCelsiusTempSmall(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#feels");
    temperatureElement.innerHTML = Math.round(feelsTemperature);
    smallFahrenheitLink.classList.remove("active");
    smallCelsiusLink.classList.add("active");
}

let apiKey = "0eb6de8e155714745cc3ba77875938d2";

let celsiusTemperature = null;
let feelsTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let locationElement = document.querySelector("#location-btn");
locationElement.addEventListener("click", getLocal);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let smallFahrenheitLink = document.querySelector("#small-fahrenheit-link");
smallFahrenheitLink.addEventListener("click", displayFahrenheitTempSmall);

let smallCelsiusLink = document.querySelector("#small-celsius-link");
smallCelsiusLink.addEventListener("click", displayCelsiusTempSmall);

search("Amsterdam");