interface WeatherData {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        description: string;
    }[];
}

const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const button = document.getElementById("btn") as HTMLButtonElement;
const output = document.getElementById("output") as HTMLDivElement;

const API_KEY = "0888fc9aeaf624690443fc281ba162c6"
function getWeather(city: string): void {

    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q="
        + city +
        "&units=metric&appid="
        + API_KEY
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data: WeatherData) {
            output.innerHTML =
                "<h3>" + data.name + "</h3>" +
                "<p>🌡 Temperature: " + data.main.temp + " °C</p>" +
                "<p>💧 Humidity: " + data.main.humidity + "%</p>" +
                "<p>☁ Condition: " + data.weather[0].description + "</p>";
        })
        .catch(function () {
            output.innerHTML = "City not found or network error";
        });
}

button.onclick = function () {
    if (cityInput.value === "") {
        output.innerHTML = "Please enter city name";
    } else {
        getWeather(cityInput.value);
    }
};
