import { useContext, useState } from "react"
import styles from "./style.module.scss" 
import { TechContext } from "../../provider/TechContext"
import { useForm } from "react-hook-form"
import { Input } from "../formComponents/Input"
import { Select } from "../formComponents/Select"
import { zodResolver } from "@hookform/resolvers/zod"
import { editTechSchema } from "./editTechSchema"

export const EditTechModal = () => {

    const [selectedOption, setSelectedOption] = useState('')
    const { setEditingTech, editingTech, editTech } = useContext(TechContext)
    
    const handleSelectChange = (selectedValue) => {
        setSelectedOption(selectedValue);
    }

    const { register, handleSubmit, formState: { isDirty, errors } } = useForm({
        resolver: zodResolver(editTechSchema),
        values: {
            title: editingTech.title,
            status: editingTech.status,
        }
    })


    const submit = (formData) => {
        editTech(formData)
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h2>Tecnologia Detalhes</h2>
                    <button onClick={() => setEditingTech(null)}>X</button>
                </div>
                <form className={styles.editTechForm} onSubmit={handleSubmit(submit)}>
                    <Input label="Nome" type="text" placeholder="Digite uma tecnologia..." {...register("title")} error={errors.title} disabled />
                    <Select label="Selecionar status" name="status" onChange={handleSelectChange} {...register("status")} error={errors.status} options={[
                        {value: "Iniciante", label: "Iniciante"},
                        {value: "Intermediário", label: "Intermediário"},
                        {value: "Avançado", label: "Avançado"},
                    ]} />
                    <button className={`submitButton formButton text2 ${isDirty ? 'submitButtonActive' : null}`} type="submit">Salvar alterações</button>
                </form>
            </div>
        </div>
    )
}