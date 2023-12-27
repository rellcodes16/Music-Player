import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import styles from './Sidebar.module.css'

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
        <Nav />

        <Outlet />
    </div>
  )
}

export default Sidebar