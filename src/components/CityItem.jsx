import React from 'react';
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom';
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const CityItem = ({ city }) => {
  const { cityName, emoji, date, id, position } = city;
  const {currentCity}=useCities()

  return (
    <li >
      <Link className={`${styles.cityItem} ${id===currentCity.id ? styles["cityItem--active"] : ''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <item className={styles.date}>{formatDate(date)}</item>
      <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}



export default CityItem;
