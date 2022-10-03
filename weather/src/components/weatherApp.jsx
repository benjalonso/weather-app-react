import { useEffect, useState } from "react";
import WeatherForm from "./weatherForm.jsx";
import WeatherMainInfo from "./weatherMainInfo.jsx";
import Loading from "./loading.jsx";
import styles from './weatherApp.module.css';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  console.log(weather);
  useEffect(() => {
    loadInfo();
  }, []);

  useEffect(() => {
    document.title = `Weather  ${weather?.location.name ?? ""}`;
  }, [weather]);
  async function loadInfo(city = "london") {
    try {
      const request = await fetch(
        `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
      );

      const json = await request.json();
      setWeather(json);
    } catch (error) {}
  }

  const handleChangeCity = (city) => {
    setWeather(null);
    loadInfo(city);
  };

  return (
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleChangeCity} />
{weather ?  <WeatherMainInfo weather={weather} /> :  <Loading/>}
     
    </div>
  );
};
export default WeatherApp;
