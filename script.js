// ربط الأزرار وحقول الإدخال في الصفحة
let searchBtn = document.getElementById("searchBtn");
let searchInput = document.getElementById("searchInput");
let weatherCards = document.getElementById("weatherCards");

// مفتاح الـ API الخاص بموقع weatherapi.com
let apiKey = "5aa3affedb3f4e6b8a6164250252806"; // ← استبدليه بمفتاحك الحقيقي

// دالة لتحويل التاريخ ليوم (مثلاً Monday)
function getDayName(dateString) {
  let date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

// دالة لإرجاع صورة حسب الطقس
function getLocalIcon(index) {
  if (index === 0) return "images/imgi_2_113.png";
  if (index === 1) return "images/imgi_6_113.png";
  return "images/imgi_2_113.png";
}

// دالة لعرض بيانات الطقس على الشاشة
function displayWeather(data) {
  // نفرّغ الكروت القديمة
  weatherCards.innerHTML = "";

  // نمرّ على كل يوم من الأيام الثلاثة
  data.forecast.forecastday.forEach(function(day, index) {
    let date = new Date(day.date);

    // ننشئ كارت جديد
    let card = document.createElement("div");
    card.className = "weather-card";

    // نضيف البيانات داخل الكارت
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

    // نضيف الكارت إلى الصفحة
    weatherCards.appendChild(card);
  });
}

// دالة تجلب بيانات الطقس من الموقع
function fetchWeather(city) {
  // رابط الـ API
  let url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;

  // نستخدم fetch لجلب البيانات
  fetch(url)
    .then(function(response) {
      return response.json(); // نحول البيانات لصيغة JSON
    })
    .then(function(data) {
      displayWeather(data); // نعرض البيانات
    })
    .catch(function(error) {
      weatherCards.innerHTML = "<p style='color:red;'>City not found</p>";
    });
}

// عند الضغط على زر Find
searchBtn.addEventListener("click", function() {
  let city = searchInput.value.trim(); // نحصل على اسم المدينة
  if (city !== "") {
    fetchWeather(city); // نبدأ بجلب البيانات
  }
});
