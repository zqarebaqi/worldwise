import SideBar from '../components/SideBar.jsx';
import styles from './AppLayout.module.css'
import Map from '../components/Map.jsx';
const AppLayout = () => {
    return (
        <div className={styles.app}>
            <SideBar />
            <Map/>
        </div>
    );
}

export default AppLayout;

