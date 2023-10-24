import styles from "./style.module.scss"
import logo from "../../assets/kenzie-hub-logo.svg"
import plus from "../../assets/plus.svg"
import { useContext, useState } from "react"
import { UserContext } from "../../provider/UserContext"
import { TechList } from "../../components/TechList"
import { CreateTechModal } from "../../components/CreateTechModal"


export const DashboardPage = () => {
    
    const { user, logOut } = useContext(UserContext)
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    
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
                    <div className={styles.addTechContainer}>
                        <h2 className="title1">Tecnologias</h2>
                        <button className="backButton" onClick={() => setIsCreateOpen(true)} ><img src={plus} alt="" /></button>
                    </div>
                    <TechList />
                </section>
                {isCreateOpen ? <CreateTechModal setIsCreateOpen={setIsCreateOpen}/> : null}
            </main>
        </>
    )
}