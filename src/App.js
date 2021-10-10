import Form from "./Form";
import ReactAnimatedWeather from "react-animated-weather";

const defaults = {
  icon: "CLOUDY",
  color: "rgb(255, 153, 0)",
  size: 100,
  animate: true,
};

export default function App() {
  return (
    <div className="container">
      <Form />

      <div className="row weather">
        <div className="col-6 placeinfo">
          <h4 id="city">
            <strong>Florida </strong>| Sat 10:00 | clouds
          </h4>

          <div className="degree d-flex justify-content-start">
            <h1>
              <h1>80°</h1>
            </h1>
            <div className="units">
              <p id="fahrenheit">F</p>
            </div>
          </div>
        </div>
        <div className="col-6">
          <h4>
            <strong>Humidity</strong> <span id="city-humidity">0%</span>
          </h4>
          <h4>
            <strong>Wind</strong> <span id="city-wind"> 0mph</span>
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
  );
}
