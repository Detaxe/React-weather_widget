async function getWeather() {

  const apiKey = import.meta.env.VITE_API_KEY;

  async function getCityByIP() {
    try {
      const res = await fetch('http://ip-api.com/json/?fields=city');
      const data = await res.json();
      return data.city;
    } catch (err) {
      console.error('Ошибка определения города:', err);
      return null;
    }
  }

  const getWeather = async (lat: number, lon: number) => {
    const request = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    const data = await request.json()

    return (
      data
    )
  }

  const getXY = async () => {

    const city = await getCityByIP()
    const apiUrl = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${5}&appid=${apiKey}`)
    const data = await apiUrl.json()

    const lat = data[0].lat
    const lon = data[0].lon
    const result = await getWeather(lat, lon)

    return (
      [result, city]
    )
  }
  const [weather, city] = await getXY()
  const result = [];
  for (let i = 0; i < weather.list.length; i += 8) {
    result.push(weather.list.slice(i, i + 8));
  }

  return {result, city}
}

export default getWeather;

