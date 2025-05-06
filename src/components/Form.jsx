import styles from "./Form.module.css";
import { useState,useEffect } from "react";
import {useUrlPosition} from '../hooks/useUrlPosition'
import BackButton from './BackButton';
import Button from "./Button";
import Message from './Message'
import Spinner from './Spinner'
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const {createCity,isLoading}=useCities()
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadinGeocoding, setIsLoadingGeocoding] = useState(false);
  const[emoji,setEmoji]=useState("")
  const [geocodingError, setGeocodingError] = useState()
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!lat && !lng) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true)
        setGeocodingError("")
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json()
        if(!data.countryCode)throw new Error('that does not seem to a city .click some where else :)')
        setCountry(data.countryName)
        setCityName(data.CityName || data.locality || "")
        setEmoji(convertToEmoji(data.countryCode))
      } catch (err) {
        console.log(err)
        setGeocodingError(err.message);    
      } finally {
        setIsLoadingGeocoding(false)
      }
    }
    fetchCityData()
  }, [lat,lng])


  async function handleSubmit(e) {
    e.preventDefault();
     if(!cityName || !date) return
    const newCity = {
      cityName,
      country,
      emoji,
      date,notes,position:{lat,lng }
    }
   await createCity(newCity)
    navigate('/app/cities')
  }

  if(isLoadinGeocoding) return <Spinner/>
  if(!lat && !lng) return <Message message="start by clicking some where on the Map"/>

if(geocodingError) return <Message message={geocodingError}/>

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={date} //instead of value={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
