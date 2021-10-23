import React, { useState, useEffect } from "react";
import Form from "./Form";
import ReactAnimatedWeather from "react-animated-weather";
import axios from "axios";

function formatHours(hour) {
  if (hour < 13) {
    return hour;
  } else {
    return hour - 12;
  }
}

function formatMin(min) {
  return min < 10 ? `0${min}` : min;
}

export default function App() {
  let [location, setLocation] = useState("New York");
  let [temperature, setTemperature] = useState("");
  let [humidity, setHumidity] = useState("");
  let [description, setDescription] = useState("");
  let [units, setUnits] = useState("imperial");
  let [wind, setWind] = useState("");
  let [icon, setIcon] = useState("");
  let [locationToShow, setLocationToShow] = useState("");
  let now = new Date();
  let hours = formatHours(now.getHours());
  let minutes = formatMin(now.getMinutes());
  let temperatureShow = temperature;
  if (temperature && units === "imperial") {
    temperatureShow = Math.ceil(temperature * 1.8 + 32);
  }

  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[now.getDay()];
  useEffect(() => {
    search();
  }, []);

  const defaults = {
    icon: icon,
    color: "rgb(255, 153, 0)",
    size: 100,
    animate: true,
  };

  function search() {
    if (location) {
      let apiKey = "8e4399f0d975e2878379c34ca4703cc5";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

      axios.get(apiUrl).then(showTemperature);
    }
  }

  function showTemperature(response) {
    console.log(response);
    let temperature = Math.round(response.data.main.temp);
    setTemperature(temperature);

    let description = response.data.weather[0].description;
    setDescription(description);

    let humidity = Math.round(response.data.main.humidity);
    setHumidity(humidity);

    let wind = Math.round(response.data.wind.speed);
    setWind(wind);

    let locationToShow = response.data.name;
    setLocationToShow(locationToShow);

    let iconCategory = response.data.weather[0].main;
    let icon = getWeatherIcon(iconCategory);
    setIcon(icon);
  }

  function getWeatherIcon(desc) {
    if (desc === "Clear") {
      return "CLEAR_DAY";
    }
    if (desc === "Clouds") {
      return "CLOUDY";
    }
    if (desc === "Rain" || desc === "Drizzle" || desc === "Thunderstorm") {
      return "RAIN";
    }
    if (desc === "Snow") {
      return "SNOW";
    }
    if (desc === "Atmosphere") {
      return "FOG";
    }
  }

  function handleUnitChange(unit) {
    setUnits(unit);
    search();
  }

  return (
    <div>
      <div className="container">
        <Form
          setLocation={setLocation}
          location={location}
          grabForecast={search}
        />

        <div className="row weather">
          <div className="col-6 placeinfo">
            <h4 id="city">
              <strong>{locationToShow} </strong>| {`${day} ${hours}:${minutes}`}{" "}
              | {description}
            </h4>

            <div className="degree d-flex justify-content-start">
              <h1>{temperatureShow}°</h1>
              <div className="units">
                <button
                  className={`units-button ${
                    units === "imperial" ? "active" : ""
                  }`}
                  onClick={() => handleUnitChange("imperial")}
                >
                  F
                </button>
                <span>|</span>
                <button
                  className={`units-button ${
                    units === "metric" ? "active" : ""
                  }`}
                  onClick={() => handleUnitChange("metric")}
                >
                  C
                </button>
              </div>
            </div>
          </div>
          <div className="col-6">
            <h4>
              <strong>Humidity</strong>{" "}
              <span id="city-humidity">{humidity}%</span>
            </h4>
            <h4>
              <strong>Wind</strong> <span id="city-wind"> {wind}mph</span>
            </h4>
            <br />
            <ReactAnimatedWeather
              icon={defaults.icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
          </div>
        </div>
      </div>
      <div className="container footer">
        <a
          href="https://github.com/annelisedomingz/my-app"
          className="gitLink"
          target="_blank"
          rel="noreferrer"
        >
          Open-source code by Annelise Dominguez
        </a>
      </div>
    </div>
  );
}
