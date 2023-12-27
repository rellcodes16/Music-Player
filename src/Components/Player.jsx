import styles from './Player.module.css'
import Circle from '../assets/Pepsi.png'
import { SlControlStart } from 'react-icons/sl'
import { SlControlPlay } from 'react-icons/sl'
import { SlControlPause } from 'react-icons/sl'
import { SlControlEnd } from 'react-icons/sl'
import { useSongs } from './context/SongsContext'
import { IoReorderThreeOutline } from 'react-icons/io5'
import Spinner from './Spinner'
import Logout from '../pages/Logout'
import { Link } from 'react-router-dom'

const Player = () => {
    const {
      isLoading,
      selectedSong, 
      audioRef, 
      handleSeekBarDrag, 
      currentTime, 
      formatTime, 
      handleTimeUpdate, 
      setCurrentTime, 
      isPlaying, 
      handlePlayPause,
      handlePrevious,
      handleNext
    } = useSongs()

    if(isLoading) return <Spinner />
  return (
    selectedSong && (<div className={styles.playerContainer}>
      <Logout />
      <Link to='/app'><IoReorderThreeOutline className={styles.expand}/></Link>
        <div className={styles.coverContainer}>
            <div className={styles.cover}>
                <img src={selectedSong.songCover} alt="circle" className={`${styles.pic} ${isPlaying ? styles['spin'] : ''}`}/>
            </div>
            <div>
                
            </div>
        </div>
        <div className={styles.songInfo}>
            <h1 className={styles.songName}>{selectedSong.songName}</h1>
            <h3 className={styles.songArtist}>{selectedSong.songArtist}</h3>
        </div>
        <input 
            type="range"
            min={0}
            className={styles.audioBar} 
            value={currentTime}
            max={audioRef.current ? audioRef.current.duration : 0}
            onChange={handleSeekBarDrag}
        />
        <div className={styles.duration}>
            <p>{formatTime(audioRef.current ? audioRef.current.duration : 0)}</p>
        </div>
        <div className={styles.control}>
            
        <SlControlStart className={styles.prev} onClick={handlePrevious}/>
          {isPlaying ? (
            <SlControlPause className={styles.pause} onClick={handlePlayPause}/>
          ) : (
            <SlControlPlay className={styles.play} onClick={handlePlayPause}/>
          )}
          <SlControlEnd className={styles.next} onClick={handleNext}/>
        </div>
        <audio
          ref={audioRef}
          src={selectedSong.songPath}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={(e) =>
            setCurrentTime(e.target.currentTime)
          }
        ></audio>
    </div>)
  )
}

export default Player
