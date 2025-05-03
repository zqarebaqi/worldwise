import { NavLink } from 'react-router-dom';
import styles from './AppNav.module.css'


const AppNav = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li><NavLink to="countries">Contries</NavLink></li>
                <li><NavLink to="cities">Cities</NavLink></li>
            </ul>
        </nav>
    );
}

export default AppNav;
