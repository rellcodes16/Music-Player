import styles from './Nav.module.css'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
        <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to='library'>Library</NavLink>
        </li>
        <li>
          <NavLink to='favorite'>Favorite</NavLink>
        </li>
      </ul>
    </nav>
    </div>
  )
}

export default Nav