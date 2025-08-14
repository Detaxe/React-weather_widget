import './mainSection.css'
import DaysForecastCard from "../daysForecastCard/daysForecastCard.tsx";
import type {WeatherData} from "../../types/types.ts";

export default function MainSection( { result, city }: WeatherData) {
  const weather = result;

  //get day of weak from date
  function formateDate(date:string) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    date =  date.slice(0, 10);
    const [year, month, day] = date.split("-").map(Number);
     const fullDate = new Date(year, month - 1, day);
    date = days[fullDate.getDay()]
    return (
      date
    )
  }

  const getWeatherIcon = (condition:string) => {
    const conditionLower = (condition || 'clouds').toLowerCase();

    if (conditionLower.includes('clear')) return 'fa-sun';
    if (conditionLower.includes('cloud')) return 'fa-cloud';
    if (conditionLower.includes('rain')) return 'fa-cloud-rain';
    if (conditionLower.includes('snow')) return 'fa-snowflake';
    if (conditionLower.includes('thunder')) return 'fa-bolt';
    if (conditionLower.includes('mist') || conditionLower.includes('fog')) return 'fa-smog';

    return 'fa-cloud-sun';
  };

  function multipleRenderCard(){
    const items = [1, 2, 3, 4];
    return (
      <>
        {items.map((item, index) => (
          <DaysForecastCard key={index} day={formateDate(weather[item][0].dt_txt)} temp={(weather[item][0].main.temp - 273.15).toFixed(0)}
                            icon={getWeatherIcon(weather[item][0].weather[0].main)} />
        ))}
      </>
    );
  }

  return (
    <div className="container">
      <header>
        <h1>Weather Forecast</h1>
      </header>
      <main>
        <div className="weather-card">
          <div className="weather-info">
            <h2 id="city-name">
              <i className="fas fa-map-marker-alt"></i>
              {city}
            </h2>
            <div className="temp" id="temperature">
              {(weather[0][0].main.temp - 273.15).toFixed(0) + '°C'}
            </div>
            <div className="description" id="weather-description">
              {weather[0][0].weather[0].main}
            </div>
            <div className="feels-like">
              Feels like {(weather[0][0].main.feels_like - 273.15).toFixed(0) + '°C'}
            </div>
          </div>
          <div className="weather-icon">
            <i className={'fas ' + getWeatherIcon(weather[0][0].weather[0].main)}></i>
          </div>
        </div>
        <div className="forecast">
          {
            multipleRenderCard()
          }
        </div>
      </main>

      <footer>
        <p>© 2025 Weather App</p>
      </footer>
    </div>
  )
}
