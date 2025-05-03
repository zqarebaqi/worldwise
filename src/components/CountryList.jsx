import styles from './countryList.module.css'
import CountryItem from './CountryItem'
import Spinner from './Spinner';
import Message from './Message'
import { useCities } from '../contexts/CitiesContext';
const CountryList = () => {
        const { cities, isLoading } = useCities();

        const countries = cities.reduce((arr, city) => {
        if (!arr.map(el => el.city).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }];
        else return arr;
    }, [])
    
    if (isLoading) return <Spinner />
    if (!countries.length) return <Message message='Add your first city by clicking on a city on the map '/>
    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (<CountryItem country={country} key={ country.id} />))}
        </ul>
    );
}

export default CountryList;
 