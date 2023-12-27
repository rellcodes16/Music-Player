import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'
import Vinyl1 from '../assets/vinyl1.png'
import Vinyl2 from '../assets/vinyl2.png'
import HeadPhone from '../assets/headphones.png'
import Speaker from '../assets/speaker.png'
import { IoMusicalNotes } from 'react-icons/io5'

const HomePage = () => {
  return (
    <div className={styles.homepage}>
        <div className={styles.right}>
            <img src={Vinyl1} alt="vinyl1" className={styles.vinyl1}/>
            <img src={Vinyl2} alt="vinyl2" className={styles.vinyl2}/>
            <img src={HeadPhone} alt="headphone" className={styles.headphone}/>
            <img src={Speaker} alt="speaker" className={styles.speaker}/>
        </div>
        <div className={styles.textContainer}> 
          <h1 className={styles.text}>Discover a world of melodies with our music player - where every beat finds it perfect play, and your favorite tunes
            await a click away. Unleash the rhythm of your soul and make every moment a symphony.
          </h1>
          <Link to='login' className={styles.btnLink}><IoMusicalNotes/>Start Listening</Link>
        </div>
    </div>
  )
}

export default HomePage