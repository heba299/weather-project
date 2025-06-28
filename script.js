let searchBtn = document.getElementById("searchBtn");
let searchInput = document.getElementById("searchInput");
let weatherCards = document.getElementById("weatherCards");

let apiKey = "5aa3affedb3f4e6b8a6164250252806"; 

function getDayName(dateString) {
  let date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

function getLocalIcon(index) {
  if (index === 0) return "images/imgi_2_113.png";
  if (index === 1) return "images/imgi_6_113.png";
  return "images/imgi_2_113.png";
}

function displayWeather(data) {

  weatherCards.innerHTML = "";


  data.forecast.forecastday.forEach(function(day, index) {
    let date = new Date(day.date);

    let card = document.createElement("div");
    card.className = "weather-card";


    card.innerHTML = `
      <div class="card-header">
        <span>${getDayName(day.date)}</span>
        <span>${date.getDate()} ${date.toLocaleString("en-US", { month: "long" })}</span>
      </div>
      <div class="card-body">
        ${index === 0 ? `<h3>${data.location.name}</h3>` : ""}
        <div class="temp">${day.day.avgtemp_c}°C</div>
        ${index !== 0 ? `<div class="min-temp">${day.day.mintemp_c}°</div>` : ""}
        <img src="${getLocalIcon(index)}" alt="weather icon">
        <p class="desc">${day.day.condition.text}</p>
        ${index === 0 ? `
        <div class="details">
          <span><img src="images/imgi_3_icon-umberella.png"> ${day.day.daily_chance_of_rain}%</span>
          <span><img src="images/imgi_4_icon-wind.png"> ${day.day.maxwind_kph}km/h</span>
          <span><img src="images/imgi_5_icon-compass.png"> East</span>
        </div>` : ""}
      </div>
    `;

   weatherCards.appendChild(card);
  });
}

function fetchWeather(city) {

 API
  let url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;

  
  fetch(url)
    .then(function(response) {
      return response.json(); 
    })
    .then(function(data) {
      displayWeather(data); 
    })
    .catch(function(error) {
      weatherCards.innerHTML = "<p style='color:red;'>City not found</p>";
    });
}

searchBtn.addEventListener("click", function() {
  let city = searchInput.value.trim(); 
  if (city !== "") {
    fetchWeather(city); 
  }
});
