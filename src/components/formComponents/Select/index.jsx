import { forwardRef, useState } from "react"
import styles from "./style.module.scss"

export const Select = forwardRef(({ label, error, options, onChange, ...rest }, ref) => {

    const [selectedValue, setSelectedValue] = useState('');

    const handleSelectChange = (e) => {
        const selectedOption = e.target.value;
        setSelectedValue(e.target.value);
        onChange(selectedOption)
    }

    return (
        <div className={styles.selectContainer}>
            <label className="text4">{label}</label>
            <select ref={ref} className={`text1 ${error ? 'inputError' : null}`} value={selectedValue} onChange={handleSelectChange} {...rest}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {error ? <p className="errorMessage text4">{error.message}</p> : null}
        </div>
    )
})