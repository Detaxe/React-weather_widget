import './daysForecastCard.css'

interface ForecastCardData {
  day: string;
  temp: string;
  icon: string;
}

export default function DaysForecastCard({day, temp, icon}: ForecastCardData) {
  
  return (
    <>
      <div className="forecast-item">

        <div className="day">{day}</div>
        <div className={'ico-temp'}>
          <i className={`fas ${icon}`}></i>
          <div className="temp">{temp + '°C'}</div>
        </div>
      </div>
    </>
  )
}
