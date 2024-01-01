const mainView = document.getElementsByClassName("container")[0];

const btn = document.querySelector("button");
const inputEle = document.querySelector("input");

let temp = document.querySelector("#temp");
let place = document.querySelector("#place");
let date = document.querySelector("#date");
let image = document.querySelector("#image");
let condition = document.querySelector("#condition");

let info = document.querySelector(".info");
let weather_detail = document.querySelector(".weather_detail");
let wind_speed = document.querySelector(".wind_speed");
let feels_like = document.querySelector(".feels_like");
let humidity = document.querySelector(".humidity");
let cloud = document.querySelector(".cloud");

fetchWeatherData("Jind"); // Default
btn.addEventListener("click", (event) => {
  if (inputEle.value.length > 0) {
    const cityName = inputEle.value;
    fetchWeatherData(cityName);
  } else {
    alert("Please enter city name");
  }
});

function fetchWeatherData(cityName) {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=13e228fadea544f2a28143117232912&q=${cityName}&aqi=no`
  )
    .then((resp) => resp.json())
    .then((data) => updateUI(data))
    .catch((e) => {
      console.log(e);
      window.alert("Something went wrong, Please try again later");
    });
}

function updateUI(data) {
  const current = data.current;
  if (current) {
    temp.innerText = current.temp_c;
    place.innerText = data.location.name + ", " + data.location.region;
    date.innerText = current.last_updated;
    wind_speed.innerText = `${current.wind_kph} kmph`;
    feels_like.innerText = `${current.feelslike_c} \xB0C`;
    humidity.innerText = `${current.humidity}%`;
    cloud.innerText = `${current.cloud}`;
    mainView.className = `container backgroundImage ${current.condition.text}`;
  }
  if (current.condition) {
    image.src = current.condition.icon;
    condition.innerText = current.condition.text;
  }
}
