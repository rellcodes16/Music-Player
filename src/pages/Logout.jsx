import { useAuth } from "../Components/context/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import styles from './Logout.module.css'

const Logout = () => {
    const { user, Logout , isAuthenticated} = useAuth()
    const navigate = useNavigate()

    console.log(user)
    
    function handleClick() {
      Logout();
      navigate('/')
    }
  
    return (
      <div className={styles.user}>
        <span>Welcome, {user.name}</span>
        <button onClick={handleClick}>Logout</button>
      </div>
    );
}

export default Logout