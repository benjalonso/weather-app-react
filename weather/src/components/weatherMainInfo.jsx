import styles from "./weatherMainInfo.module.css";

const WeatherMainInfo = ({ weather }) => {
  return (
    <div className={styles.mainInfo}>
      <div className={styles.city}>{weather?.location.name}</div>
      <div className={styles.country}>{weather?.location.country}</div>
      <div className={styles.row}>
        <div>
          <img
            src={`http:${weather?.current.condition.icon}`}
            width="128"
            alt={weather?.current.condition.text}
          />
        </div>
        <div className={styles.weatherConditions}>
          <div className={styles.condition}>{weather?.current.condition.text}</div>
          <div className={styles.current}>{weather?.current.condition.temp_c}</div>
        </div>
      </div>
      <div>
        <iframe
          title="mapa"
          src={`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d753998.1030604208!2d${weather?.location.lon}1936!3d${weather?.location.lat}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondres%2C%20Reino%20Unido!5e0!3m2!1ses!2scl!4v1664826771409!5m2!1ses!2scl`}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default WeatherMainInfo;
