import styles from "./style.module.scss"
import logo from "../../assets/kenzie-hub-logo.svg"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


export const DashboardPage = ({ user, setUser }) => {
    const localToken = localStorage.getItem("@loginToken")
    const navigate = useNavigate()

    useEffect(() => {
        const verifyUser = () => {
            !localToken ? navigate("/") : null 
        }
        verifyUser()
    }, [])


    const logOut = () => {
        localStorage.removeItem("@loginToken")
        localStorage.removeItem("@userData")
        setUser({})
        navigate("/")
    }

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <img src={logo} alt="kenzie hub logo" />
                    <button className={`backButton text3 ${styles.logoutButton}`} onClick={logOut}>Sair</button>
                </div>
            </header>
            <main className={styles.main}>
                <section className={styles.userSection}>
                    <div>
                        <h2 className="title1">Olá, {user.name}</h2>
                        <p className="text4">{user.course_module}</p>
                    </div>
                </section>
                <section className={styles.contentSection}>
                    <div>
                        <h2 className="title1">Que pena! Estamos em desenvolvimento :(</h2>
                        <p className="text1">Nossa aplicação está em desenvolvimento, em breve teremos novidades</p>
                    </div>
                </section>
            </main>
        </>
    )
}