"use strict";
$(document).ready(function () {
  const burger = $(".burger");
  burger.click(() => {
    const ul = $("nav ul");
    const afterContent = $(".after-content");
    if (ul.css("display") === "none") {
      afterContent.css("transform", "translateY(350px)");
    } else {
      afterContent.css("transform", "translateY(0px)");
    }
    ul.slideToggle(600);
  });
});

const input = document.querySelector(".search-city");
const findBtn = document.querySelector(".find");
const form = document.querySelector("form");

input.addEventListener("input", function (e) {
  getWeatherData(e.target.value);
});

findBtn.addEventListener("click", function () {
  let inputVal = input.value;
  getWeatherData(inputVal);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let inputVal = input.value;
  getWeatherData(inputVal);
});

async function getWeatherData(location) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=d5b7dac60fa6448187e215438210710&q=${location}&days=3`
  );
  let finalResult = await response.json();
  if (finalResult?.error?.message) {
    return;
  }
  displayData(finalResult);
}

function displayData({ location, current, forecast }) {
  const locationElem = document.querySelector(".location");
  const fdTempElem = document.querySelector(".fd-temp");
  const fdCondElem = document.querySelector(".fd-cond");
  const humidityElem = document.querySelector(".humidity");
  const windElem = document.querySelector(".wind-speed");
  const countryElem = document.querySelector(".country");
  const monthElem = document.querySelector(".month-name");
  const fdDayElem = document.querySelector(".fd-day");
  const fdImgElem = document.querySelector(".fd-img");
  const sdDayElem = document.querySelector(".sd-day");
  const sdTempMaxElem = document.querySelector(".sd-temp-max");
  const sdTempMinElem = document.querySelector(".sd-temp-min");
  const sdCondElem = document.querySelector(".sd-cond");
  const sdImgElem = document.querySelector(".sd-img");
  const tdDayElem = document.querySelector(".td-day");
  const tdTempMaxElem = document.querySelector(".td-temp-max");
  const tdTempMinElem = document.querySelector(".td-temp-min");
  const tdCondElem = document.querySelector(".td-cond");
  const tdImgElem = document.querySelector(".td-img");
  const months = [
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
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const now = new Date();
  let dayOfWeek = now.getDay();

  locationElem.innerHTML = location.name;
  fdTempElem.innerHTML = current.temp_c + `<sup>o</sup>c`;
  fdCondElem.innerHTML = current.condition.text;
  humidityElem.innerHTML = current.humidity + "%";
  windElem.innerHTML = current.wind_kph + "km/hr";
  countryElem.innerHTML = location.country;
  monthElem.innerHTML = now.getDate() + " " + months[now.getMonth()];
  fdDayElem.innerHTML = days[dayOfWeek];
  fdImgElem.setAttribute("src", current.condition.icon);
  if (dayOfWeek === 6) {
    dayOfWeek = -1;
  }
  sdDayElem.innerHTML = days[dayOfWeek + 1];
  sdTempMaxElem.innerHTML =
    forecast.forecastday[1].day.maxtemp_c + `<sup>o</sup>c`;
  sdTempMinElem.innerHTML =
    forecast.forecastday[1].day.mintemp_c + `<sup>o</sup>c`;
  sdCondElem.innerHTML = forecast.forecastday[1].day.condition.text;
  sdImgElem.setAttribute("src", forecast.forecastday[1].day.condition.icon);
  if (dayOfWeek === 5) {
    dayOfWeek = -2;
  }
  tdDayElem.innerHTML = days[dayOfWeek + 2];
  tdTempMaxElem.innerHTML =
    forecast.forecastday[2].day.maxtemp_c + `<sup>o</sup>c`;
  tdTempMinElem.innerHTML =
    forecast.forecastday[2].day.mintemp_c + `<sup>o</sup>c`;
  tdCondElem.innerHTML = forecast.forecastday[2].day.condition.text;
  tdImgElem.setAttribute("src", forecast.forecastday[2].day.condition.icon);
}

getWeatherData("alex");
