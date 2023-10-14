import { Link } from "react-router-dom"
import logo from "../../assets/kenzie-hub-logo.svg"
import { RegisterForm } from "../../components/RegisterForm"
import styles from "./style.module.scss"

export const RegisterPage = () => {
    return (
        <>
            <header className={styles.header}>
                <img src={logo} alt="kenzie hub logo" />
                <Link to={"/"} className="backButton text3">Voltar</Link>
            </header>
            <RegisterForm />
        </>
    )
}