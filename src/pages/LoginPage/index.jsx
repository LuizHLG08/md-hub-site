import  logo  from "../../assets/kenzie-hub-logo.svg"
import { LoginForm } from "../../components/LoginForm"
import styles from "./style.module.scss"

export const LoginPage = ({setUser}) => {

    

    return (
        <>
            <img className={styles.logo} src={logo} alt="kenzie hub logo" />
            <LoginForm setUser={setUser} />
        </>
    )
}