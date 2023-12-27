import styles from './LibrarySong.module.css'
import { Link } from 'react-router-dom'
import { SlHeart } from 'react-icons/sl'
import { SlControlPlay } from 'react-icons/sl'
import { SlControlPause } from 'react-icons/sl'
import { IoHeart } from 'react-icons/io5'
import { useSongs } from './context/SongsContext'

const LibrarySong = ({ song, navigate }) => {
  const { favorites, handleAddToFavorite, handleSongClick, selectedSong, } = useSongs();

  const isFavorite = favorites.includes(song.songID);

  const handleToggleFavorite = (e) => {
    e.preventDefault()
    handleAddToFavorite(song.songID, !isFavorite);
  };

  const handleClickNav = (e) => {
    e.preventDefault()
    navigate('/player')
    handleSongClick(song)
  }
    
  return (
    <li className={`${styles.librarySong} ${selectedSong.songID === song.songID ? styles['librarySong--active'] : ''}`} >
        <Link to='/player' className={`${styles.songLink} `} onClick={handleClickNav} >
            <div>
            { isFavorite ?
                <IoHeart className={styles.filledHeart} onClick={handleToggleFavorite}/>
            : <SlHeart className={styles.heart} onClick={handleToggleFavorite}/>
            }
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

export default LibrarySong
