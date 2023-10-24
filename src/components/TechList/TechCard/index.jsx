import styles from "./style.module.scss"

export const TechCard = ({tech}) => {
    return (
        <li className={styles.techCard}>
            <h2 className="title1">{tech.title}</h2>
            <div>
                <p className="text4">{tech.status}</p>
            </div>
        </li>
    )
}