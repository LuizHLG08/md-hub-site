import { useContext } from "react"
import { TechContext } from "../../provider/TechContext"
import { TechCard } from "./TechCard"
import styles from "./style.module.scss"

export const TechList = () => {

    const { techList } = useContext(TechContext)

    return (
        <ul className={styles.list}>
            {techList.map(tech => (
                <TechCard key={tech.id} tech={tech} /> 
            ))}
        </ul>
    )
}