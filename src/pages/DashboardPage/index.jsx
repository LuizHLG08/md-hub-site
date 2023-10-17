import styles from "./style.module.scss"
import logo from "../../assets/kenzie-hub-logo.svg"
import { useContext } from "react"
import { UserContext } from "../../provider/userContext"


export const DashboardPage = () => {
    
    const { user, logOut } = useContext(UserContext)
    
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
                        <h2 className="title1">Olá, {user?.name}</h2>
                        <p className="text4">{user?.course_module}</p>
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