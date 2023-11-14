import style from './NotFound.module.css'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    const navigate = useNavigate();

    function redirectToHome(e) {
        return navigate('/');
    }

    return (

        <div className={style.centered}>
        <h4>404! The page you are looking for does not exist!</h4>

        <button className={style.redirectButton} onClick={redirectToHome} type='button'>Redirect to Home Page</button>


        </div>

    )


}

export default NotFound;