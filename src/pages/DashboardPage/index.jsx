import styles from "./style.module.scss"
import plus from "../../assets/plus.svg"
import { useContext, useState } from "react"
import { UserContext } from "../../provider/UserContext"
import { TechList } from "../../components/TechList"
import { CreateTechModal } from "../../components/CreateTechModal"
import { TechContext } from "../../provider/TechContext"
import { EditTechModal } from "../../components/EditTechModal"
import { DeleteTechModal } from "../../components/DeleteTechModal"


export const DashboardPage = () => {
    
    const { user, logOut } = useContext(UserContext)
    const { isCreateOpen, setIsCreateOpen, editingTech, deletingTech } = useContext(TechContext)
    
    
    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <h2>MD Hub</h2>
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
                {isCreateOpen ? <CreateTechModal /> : null}
                {editingTech ? <EditTechModal /> : null}
                {deletingTech ? <DeleteTechModal /> : null}
            </main>
        </>
    )
}