import {useState, useEffect} from "react";
import './App.css'
import getWeather from './services/weather/getWeatherByIP.ts'
import MainSection from "./components/mainSection/mainSection.tsx";
import type {WeatherData} from "./types/types.ts";

function App() {



  const [weather, setWeather] = useState<WeatherData | null>(null);

  //rerender after getting promise
  useEffect(() => {
    async function changeWeather() {
      const weatherData = await getWeather();
      setWeather(weatherData)
    }
    changeWeather();
  }, []);


  return (
    <>
      {weather == null ?
        <div>Download...</div> : <MainSection result={weather.result} city={weather.city} />
      }

    </>
  )
}

export default App
