import { forwardRef } from "react"
import styles from "./style.module.scss"

export const Input = forwardRef(({label, error, ...rest}, ref) => {
    return (
        <div className={styles.inputContainer}>
            <label className="text4">
                {label}
                <input className={`text1 ${error ? 'inputError' : null}`} {...rest} ref={ref}/>
                {error ? <p className="errorMessage">{error.message}</p> : null}
            </label>
        </div>
    )
})