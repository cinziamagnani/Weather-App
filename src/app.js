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

    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let day = days[date.getDay()];

    let datum = date.getDate();

    let months = ['January','February','March','April','May','June','July','August','Septemeber','October','November','December'];
    let month = months[date.getMonth()];

    return `${hours}:${minutes}, ${day} ${datum} ${month}`;
}

function displayTemperature(response) {
    console.log(response.data);
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let feelsElement = document.querySelector("#feels");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let descriptionElement = document.querySelector("#description");
    let datetimeElement = document.querySelector("#datetime");
    let iconElement = document.querySelector("#icon");

    cityElement.innerHTML = response.data.name;
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    feelsElement.innerHTML = Math.round(response.data.main.feels_like);
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    descriptionElement.innerHTML = response.data.weather[0].description;
    datetimeElement.innerHTML = formatDate(response.data.dt*1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

let city = "Amsterdam";
let apiKey = "0eb6de8e155714745cc3ba77875938d2";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature);