import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SongsContext = createContext()

const BASE_URL = 'http://localhost:8000'

function SongsProvider({ children }){
    const[songs, setSongs] = useState([])
    const[isLoading, setIsLoading] = useState(false)
    const[error, setError] = useState('')
    const [favorites, setFavorites] = useState([]);
    const[selectedSong, setSelectedSong] = useState({})
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = (e) => {
    
    setCurrentTime(e.target.currentTime);
  };

  const handleSeekBarDrag = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  useEffect(() => {
    const audio = audioRef.current

    if(audio){
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    return () => {
      if (audio) {
        audio.pause();
      }
    }
  }, [isPlaying, audioRef]);
    

    const handleAddToFavorite = (songId, addToFavorite) => {
        if (addToFavorite) {
            setFavorites([...favorites, songId]);
        } else {
        const updatedFavorites = favorites.filter((id) => id !== songId);
        setFavorites(updatedFavorites);
        }
    };   

    const handleSongClick = (song) => {
      setSelectedSong(song)
      if (song.songID !== selectedSong.songID) {
        audioRef.current.src = song.songPath;
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        handlePlayPause();
      }
        // console.log(`${song.songName} ${song.songPath} ${song.songArtist} ${song.songID}`)
    }

    const handleNext = () => {
      const currentIndex = songs.findIndex((song) => song.songID === selectedSong.songID);
      const nextIndex = (currentIndex + 1) % songs.length; 
      setSelectedSong(songs[nextIndex]);
      setCurrentTime(0); 
      setIsPlaying(true); 
    };
  
    const handlePrevious = () => {
      const currentIndex = songs.findIndex((song) => song.songID === selectedSong.songID);
      const previousIndex = (currentIndex - 1 + songs.length) % songs.length; 
      setSelectedSong(songs[previousIndex]);
      setCurrentTime(0);
      setIsPlaying(true); 
    };

    const favoriteSongs = songs.filter((song) => favorites.includes(song.songID));

    const handleRemoveFromFavorite = (id) => {
        setFavorites(favorites.filter((favorite) => favorite !== id));
    };
   

    useEffect(function(){
        async function fetchSongs(){
            setIsLoading(true)
            setError('')
            try{
                const res = await fetch(`${BASE_URL}/songs`);
                const data = await res.json()
                console.log(data)
                setSongs(data)
                setSelectedSong(data[0])
                setError('')
            }
            catch{
                console.error('Error')
            }
            finally{
              setIsLoading(false)
            }
        }
    fetchSongs()
  }, [])

  return(
    <SongsContext.Provider value={{
        songs,
        error,
        isLoading,
        isPlaying,
        favorites,
        favoriteSongs,
        selectedSong,
        currentTime,
        audioRef,
        setSelectedSong,
        setCurrentTime,
        formatTime,
        handleSongClick,
        handleAddToFavorite,
        handleRemoveFromFavorite,
        handlePlayPause,
        handleSeekBarDrag,
        handleTimeUpdate,
        handleNext,
        handlePrevious
    }}>
        {children}
    </SongsContext.Provider>
  )

}

function useSongs(){
    const context = useContext(SongsContext)
    if(context === undefined) throw new Error('SongsContext is being called outside the Song Provider');
    return context;
}

export {SongsProvider, useSongs}
