import styles from './FavoriteSong.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { IoClose } from 'react-icons/io5'
import { SlControlPlay } from 'react-icons/sl'
import { useSongs } from './context/SongsContext'

const FavoriteSong = ({ song }) => {
    const { handleRemoveFromFavorite, handleSongClick, selectedSong } = useSongs();
    const navigate = useNavigate()

    const handleRemoveFavorite = (e) => {
        e.preventDefault()
        handleRemoveFromFavorite(song.songID);
    };

    const handleClickNav = (e) => {
        e.preventDefault()
        navigate('/player')
        handleSongClick(song)
      }
  return (
    <li className={`${styles.favoriteSong} ${selectedSong.songID === song.songID ? styles['favoriteSong--active'] : ''}`} >
        <Link className={styles.songLink} onClick={handleClickNav}>
            <div>
                <IoClose className={styles.remove} onClick={handleRemoveFavorite}/>
                <span className={styles.coverSong}>
                    <img src={song.songCover} alt="cover" className={styles.cover}/>
                </span>
            </div>
            <div className={styles.songInfo}>
                <h3 className={styles.songName}>
                    {song.songName}
                </h3>
                <p className={styles.songArtist}>{song.songArtist}</p>
            </div>
        </Link>
    </li>
  )
}

export default FavoriteSong