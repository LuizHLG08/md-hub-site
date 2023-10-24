import { Input } from "../formComponents/Input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import styles from "./style.module.scss"
import { registerFormSchema } from "./registerFormSchema"
import { useContext, useState } from "react"
import { UserContext } from "../../provider/UserContext"
import { Select } from "../formComponents/Select"

export const RegisterForm = () => {

    const { userRegister, loading } = useContext(UserContext)
    const [selectedOption, setSelectedOption] = useState('')

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(registerFormSchema),
        mode: "onChange",
    })

    const handleSelectChange = (selectedValue) => {
        setSelectedOption(selectedValue);
      }

    const submit = async (formData) => {
        userRegister(formData)
    }

    return (
        <form className={`${styles.registerForm} form`} onSubmit={handleSubmit(submit)}>
            <h2 className="title1">Crie sua conta</h2>
            <p className="text4">Rapido e gratis, vamos nessa</p>
            <Input label="Nome" type="text" placeholder="Digite aqui seu nome" {...register("name")} error={errors.name} />
            <Input label="Email" type="text" placeholder="Digite aqui seu email" {...register("email")} error={errors.email} />
            <Input label="Senha" type="password" placeholder="Digite aqui sua senha" {...register("password")} error={errors.password} />
            <Input label="Confirmar Senha" type="text" placeholder="Digite novamente sua senha" {...register("confirm_password")} error={errors.confirm_password} />
            <Input label="Bio" type="text" placeholder="Fale sobre você" {...register("bio")} error={errors.bio} />
            <Input label="Contato" type="text" placeholder="Opção de contato" {...register("contact")} error={errors.contact} />

            <Select label="Selecionar Modulo" {...register("course_module")} error={errors.course_module} onChange={handleSelectChange} options={[
                { value: "Primeiro Módulo (Introdução ao Frontend)", label: "Primeiro Módulo" },
                { value: "Segundo Módulo (Frontend Avançado)", label: "Segundo Módulo"},
                { value: "Terceiro Módulo (Introdução ao Backend)", label: "Terceiro Módulo" },
                { value: "Quarto Módulo (Backend Avançado)", label: "Quarto Módulo" },
            ]} />
            <button className={`submitButton formButton text2 ${isValid ? 'submitButtonActive' : null}`} disabled={loading}>Cadastrar</button>
        </form>
    )
}