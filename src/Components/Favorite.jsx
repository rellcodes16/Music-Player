import FavoriteSong from "./FavoriteSong"
import Spinner from "./Spinner";
import { useSongs } from "./context/SongsContext"
import { IoMusicalNotes } from "react-icons/io5";
import styles from './Favorite.module.css'

const Favorite = () => {
  const { favoriteSongs, isLoading } = useSongs();

  if(isLoading) return <Spinner />
  
  if(!favoriteSongs.length) return(
  <>
    <p style={{textAlign:'center', color: 'pink'}}>Songs added to your playlist will be displayed here <IoMusicalNotes style={{color: 'palevioletred'}}/></p>
    <span></span>
  </>
  )
  return (
    <ul className={styles.favorite}>
      {favoriteSongs.map((song) => (
        <FavoriteSong key={song.songID} song={song} />
      ))}

    </ul>
  )
}

export default Favorite