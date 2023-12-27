import { Link } from 'react-router-dom'
import Player from '../Components/Player'
import Sidebar from '../Components/Sidebar'
import styles from './AppLayout.module.css'
import Logout from './Logout'



const AppLayout = () => {
  return (
    <div className={styles.appLayout}>
        
        <Sidebar/>
    </div>
  )
}

export default AppLayout