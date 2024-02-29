import { LoginForm } from "../../components/LoginForm"
import styles from "./style.module.scss"

export const LoginPage = () => {

    return (
        <>
            <h2 className={styles.title}>MD Hub</h2>
            <LoginForm />
        </>
    )
}