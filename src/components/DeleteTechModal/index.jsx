import { AiOutlineClose } from "react-icons/ai"
import styles from "./style.module.scss"
import { useContext } from "react"
import { TechContext } from "../../provider/TechContext"

export const DeleteTechModal = () => {

    const { setDeletingTech, deleteTech } = useContext(TechContext)

    return (
        <div className="modalOverlay">
        <div className={`${styles.deleteModal} modalContainer`}>
            <button className={`${styles.close} closeModalButton`} onClick={() => setDeletingTech(null)}><AiOutlineClose className="icon" /></button>
            <h2 className="title1">Tem certeza que deseja remover a tecnologia?</h2>
            <button className={`submitButton formButton text2 submitButtonActive`} onClick={() => deleteTech()}>Remover</button>
        </div>
    </div>
    )
}