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

today()

function citySearch(event) {
    event.preventDefault();
    let currentCity = document.querySelector("#current-city");
    let searchLocation = document.querySelector("#search-location");
    currentCity.innerHTML = `${searchLocation.value}`;
    
    let apiKey = "85ad33b3f2d949047f19cf1a73113630";
    let unit = "imperial";
    let city = searchLocation.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showTemp);
}

    function showTemp(response) {
        let temp = response.data.main.temp;
        let currentTemp = document.querySelector("#current-temp");
        currentTemp.innerHTML = `${Math.round(temp)}° F`;

        document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;

        let icon = document.querySelector("#icon");
        icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
        icon.setAttribute("alt", response.data.weather[0].main);
    }

    function getCurrentLocation(event){
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(searchLocation);
        let currentCity = document.querySelector("#current-city");
        currentCity.innerHTML = `${searchLocation.value}`;

    }

function searchLocation(position) {

    let apiKey = "85ad33b3f2d949047f19cf1a73113630";
    let unit = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showTemp);
}

    let form = document.querySelector("form");
    form.addEventListener("submit", citySearch);

    let currentLocationButton = document.querySelector("#current-location");
    currentLocationButton.addEventListener("click", getCurrentLocation);


