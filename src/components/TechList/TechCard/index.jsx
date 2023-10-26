import styles from "./style.module.scss"
import { HiOutlinePencil } from "react-icons/hi"
import { BsTrash } from "react-icons/bs"
import { useContext } from "react"
import { TechContext } from "../../../provider/TechContext"

export const TechCard = ({tech}) => {

    const { setEditingTech, setDeletingTech } = useContext(TechContext)

    return (
        <li className={styles.techCard}>
            <h2 className="title1">{tech.title}</h2>
            <div className={styles.techInfo}>
                <p className="text4">{tech.status}</p>
                <div className={styles.buttonsContainer}>
                    <button onClick={() => setEditingTech(tech)}>
                        <HiOutlinePencil className={styles.buttonIcon} />
                    </button>
                    <button onClick={() => setDeletingTech(tech.id)}>
                        <BsTrash className={styles.buttonIcon} />
                    </button>
                </div>
            </div>
        </li>
    )
}