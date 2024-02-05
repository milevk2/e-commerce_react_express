import { useState, useContext } from "react";
import styles from './RegisterComponent.module.css'
import { create } from '../../services/userService.js'
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../LanguageContext.jsx";

const RegisterComponent = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');
    const [passCharError, setPassCharError] = useState(false);
    const [equalError, setEqualError] = useState(false);
    const [success, setSuccess] = useState(false);
    const {isEnglish} = useContext(LanguageContext);
    const navigate = useNavigate();


    async function onUserSubmit(e) {

        e.preventDefault();

        if (passCharError || equalError) return;
        if (userName == '' || email == '' || password == '' || repass == '') return  window.alert('All fields are required!');

        const data = { userName, email, password }

        try {

            const response = await create(data);

            response.ok ? setSuccess(true) : setSuccess(false)

        }
        catch (err) {

            console.log(err);

        }

    }

    function inputHandler(e) {

        if (e.target.name == 'userName') {
            setUserName(e.target.value)

        }
        else if (e.target.name == 'email') {

            setEmail(e.target.value)

        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
        else {
            setRepass(e.target.value)
        }
    }

    function passwordValidator(e) {

        const passwordRegex = /^(?=.*\d)(?=.*[$%&^#@!]).*$/;
        const isValidPassword = passwordRegex.test(password);

        if (e.target.name == 'password') {

            if (!isValidPassword) {

                setPassCharError(true);
                return;
            }
            setPassCharError(false);
            return;
        }

        if (password !== repass) {

            if (!passCharError){
                setEqualError(true);
            }
            
        }
        else {
            setEqualError(false);
        }
    }

    function redirectToLoginPage (){

        navigate('/Login');
    }
    
    return (

        <>
            {success ? <div className={styles.layout}>

                <div className={styles.success}>
                    <h2 className={styles.registered}>{isEnglish ? 'You have been registered successfully!' : 'Вие се регистрирахте успешно!'}</h2>
                    <h3 className={styles.registered} onClick={redirectToLoginPage } style={{ cursor: 'pointer' }}>
                    {isEnglish ? 'Click here to redirect to the login page!' : 'Натиснете тук, за да влезете в проила си!'}
                    </h3>
                </div>

            </div> : ''}
            <form className={styles.registerPanel} onSubmit={onUserSubmit}>
                <label htmlFor="username">{isEnglish? 'Username:' : 'Потребителско име:'}:</label>
                <input type="text" id="username" name="userName" className={styles.rounded} onChange={inputHandler} value={userName} />

                <label htmlFor="email">{isEnglish? 'Email:' : 'Имейл:'}</label>
                <input type="text" id="email" name="email" className={styles.rounded} onChange={inputHandler} value={email} />

                <label htmlFor="password">{isEnglish? 'Password:' : 'Парола:'}</label>

                <div>
                    <input type="password" id="password" name="password" className={styles.rounded} onChange={inputHandler} value={password} onBlur={passwordValidator} />
                    <div className={passCharError ? styles.error : styles.hidden} >{isEnglish? 'Password must contain at least one special character $%&^#@! and at least one digit!' : 'Паролата трябва да съдържа поне един специален символ $%&^#@! и поне едно число!'} </div>
                </div>
                <label htmlFor="repassword">{isEnglish? 'Re-enter Password:': 'Повторете паролата си:'}</label>

                <div>
                    <input type="password" id="repassword" name="repassword" className={styles.rounded} onChange={inputHandler} value={repass} onBlur={passwordValidator} />
                    <div className={equalError ? styles.error : styles.hidden} >{isEnglish ? 'Passwords do not match!': 'Паролите не съвпадат!'}</div>
                </div>
                <button type="submit" className={styles.submitButton}>{isEnglish? 'Register': 'Регистрация'}</button>
            </form>
        </>
    )
}

export default RegisterComponent;