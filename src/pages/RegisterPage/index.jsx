import { Link } from "react-router-dom"
import { RegisterForm } from "../../components/RegisterForm"
import styles from "./style.module.scss"

export const RegisterPage = () => {
    return (
        <>
            <header className={styles.header}>
                <h2 className={styles.title}>MD Hub</h2>
                <Link to={"/"} className="backButton text3">Voltar</Link>
            </header>
            <RegisterForm />
        </>
    )
}