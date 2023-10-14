import { forwardRef } from "react"
import styles from "./style.module.scss"

export const Select = forwardRef(({label, error, options}, ref) => {
    return (
        <div className={styles.selectContainer}>
            <label className="text4">{label}</label>
            <select ref={ref} className={`text1 ${error ? 'inputError' : null}`}>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            {error ? <p className="errorMessage text4">{error.message}</p> : null}
        </div>
    )
})