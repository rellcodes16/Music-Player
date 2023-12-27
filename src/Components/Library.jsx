import LibrarySong from "./LibrarySong"
import styles from './Library.module.css'
import { useSongs } from "./context/SongsContext"
import Spinner from "./Spinner"
import { useNavigate } from "react-router-dom"

const Library = () => {
  const { songs, isLoading } = useSongs()
  const navigate = useNavigate()

  if(isLoading) return <Spinner />
  return (
    <ul className={styles.library}>
        {songs.map(song => <LibrarySong song={song} key={song.songID} navigate={navigate}/>)}
    </ul>
  )
}

export default Library