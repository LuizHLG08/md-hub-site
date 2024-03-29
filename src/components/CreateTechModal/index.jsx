import { useContext, useState } from "react"
import { Input } from "../formComponents/Input"
import { Select } from "../formComponents/Select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createTechSchema } from "./createTechSchema"
import styles from "./style.module.scss"
import { TechContext } from "../../provider/TechContext"
import { AiOutlineClose } from "react-icons/ai"
import { useOutClick } from "../hooks/useOutClick"
import { useKeyDown } from "../hooks/useKeydown"

export const CreateTechModal = () => {
    const { createTech, setIsCreateOpen } = useContext(TechContext)
    const [selectedOption, setSelectedOption] = useState('')
    
    const handleSelectChange = (selectedValue) => {
        setSelectedOption(selectedValue);
    }

    const {register, handleSubmit, formState: {errors, isValid} } = useForm({
        resolver: zodResolver(createTechSchema),
        mode: "onChange"
    })

    const submit = (formData) => {
        createTech(formData)
    }

    const modalRef = useOutClick(() => setIsCreateOpen(false))
    const buttonRef = useKeyDown("Escape", (element) => element.click())


    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer} ref={modalRef}>
                <div className={styles.modalHeader}>
                    <h2>Cadastrar Tecnologia</h2>
                    <button className="closeModalButton" onClick={() => setIsCreateOpen(false)} ref={buttonRef}><AiOutlineClose className="icon" /></button>
                </div>
                <form className={styles.createTechForm} onSubmit={handleSubmit(submit)}>
                    <Input label="Nome" type="text" placeholder="Digite uma tecnologia..." {...register("title")} error={errors.title} />
                    <Select label="Selecionar status" name="status" onChange={handleSelectChange} {...register("status")} error={errors.status} options={[
                        {value: "Iniciante", label: "Iniciante"},
                        {value: "Intermediário", label: "Intermediário"},
                        {value: "Avançado", label: "Avançado"},
                    ]} />
                    <button className={`submitButton formButton text2 ${isValid ? 'submitButtonActive' : null}`} type="submit">Cadastrar Tecnologia</button>
                </form>
            </div>
        </div>
    )
}