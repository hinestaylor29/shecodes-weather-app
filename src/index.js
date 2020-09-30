let now = new Date();
function today () {
    let todaysDate = document.querySelector("#todays-date");
    let date = now.getDate();    
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let months = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    let month = months[now.getMonth()];
    let day = days[now.getDay()];
    let hour = now.getHours();
    let minutes = now.getMinutes();

todaysDate.innerHTML = `Last updated: ${day}, ${month} ${date}, ${hour}:${minutes}`;

}

today();

function formatTime(timestamp){
    let date = new Date(timestamp);
    let hour = date.getHours();
    let minutes = date.getMinutes();
    if (minutes <= 10){
        minutes = `0${minutes}`;
    }

    return `${hour}:${minutes}`;
}


function displayForecast(response){
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML= null;
let forecast = null;

for (let index = 0; index < 6; index++) {
forecast = response.data.list[index];

    forecastElement.innerHTML += 
       `<div class="col-md-2">
            <div class="card">
                <div class="card-body">
                    <p>
                       ${formatTime(forecast.dt * 1000)}
                    </p>
                    <img class="forecast-icon" src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
                    <p>
                        ${Math.round(forecast.main.temp_max)}° | ${Math.round(forecast.main.temp_min)}° F
                    </p>
                </div>
            </div>
        </div>`;
}

}

function showTemp(response) {
        let temp = response.data.main.temp;
        let currentTemp = document.querySelector("#current-temp");
        currentTemp.innerHTML = `${Math.round(temp)}° F`;
        
        let currentCity = document.querySelector("#current-city");
        currentCity.innerHTML = response.data.name; 
        
        document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;

        let icon = document.querySelector("#icon");
        icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
        icon.setAttribute("alt", response.data.weather[0].main);

    let humidityElement = document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);

    }

function citySearch(city){
    let apiKey = "85ad33b3f2d949047f19cf1a73113630";
    let unit = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showTemp);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
    event.preventDefault();
    let currentCity = document.querySelector("#current-city");
    let searchLocation = document.querySelector("#search-location");
    currentCity.innerHTML = `${searchLocation.value}`;
    citySearch(searchLocation.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);


function getCurrentLocation(event){
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(searchLocation);
        let currentCity = document.querySelector("#current-city");
        currentCity.innerHTML = `${searchLocation.value}`;        
        
        if(currentCity.innerHTML = "undefined"){
            currentCity.innerHTML = "Sorry, cannot display city name";
        }
    }

function searchLocation(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let apiKey = "85ad33b3f2d949047f19cf1a73113630";
        let unit = "imperial";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
        axios.get(apiUrl).then(showTemp);
       
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
        axios.get(apiUrl).then(displayForecast);
} 

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

citySearch("San Francisco");
