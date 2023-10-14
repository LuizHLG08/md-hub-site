import { Input } from "../formComponents/Input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "../../services/api"
import styles from "./style.module.scss"
import { registerFormSchema } from "./registerFormSchema"
import { toast } from "react-toastify"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerFormSchema)
    })
    const [isFormValid, setIsFormValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleInputChange = () => {
        const nameValue = document.querySelector('input[name="name"]').value;
        const emailValue = document.querySelector('input[name="email"]').value;
        const passwordValue = document.querySelector('input[name="password"]').value;
        const confirm_passwordValue = document.querySelector('input[name="confirm_password"]').value;
        const bioValue = document.querySelector('input[name="bio"]').value;
        const contactValue = document.querySelector('input[name="contact"]').value;
        const course_moduleValue = document.querySelector('select[name="course_module"]').value;

        setIsFormValid(nameValue && emailValue && passwordValue && confirm_passwordValue && bioValue && contactValue && course_moduleValue);
    }

    const submit = async (formData) => {
        try {
            setLoading(true)
            await api.post("/users", formData)
            toast.success("Usuário cadastrado com sucesso!")
            setTimeout(() => navigate("/"), 2000)
        } catch (error) {
            console.log(error)
            if(error.response.data.message === "Email already exists") {
                toast.error("Email já cadastrado!")
            } else {
                toast.error("Ops! Algo deu errado")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className={`${styles.registerForm} form`} onSubmit={handleSubmit(submit)}>
            <h2 className="title1">Crie sua conta</h2>
            <p className="text4">Rapido e gratis, vamos nessa</p>
            <Input label="Nome" type="text" placeholder="Digite aqui seu nome" {...register("name")} error={errors.name} onChange={handleInputChange}/>
            <Input label="Email" type="text" placeholder="Digite aqui seu email" {...register("email")} error={errors.email} onChange={handleInputChange}/>
            <Input label="Senha" type="password" placeholder="Digite aqui sua senha" {...register("password")} error={errors.password} onChange={handleInputChange}/>
            <Input label="Confirmar Senha" type="text" placeholder="Digite novamente sua senha" {...register("confirm_password")} error={errors.confirm_password} onChange={handleInputChange}/>
            <Input label="Bio" type="text" placeholder="Fale sobre você" {...register("bio")} error={errors.bio} />
            <Input label="Contato" type="text" placeholder="Opção de contato" {...register("contact")} error={errors.contact} onChange={handleInputChange}/>
            <div className={styles.selectContainer}>
                <label className="text4">Selecionar Módulo</label>
                <select className={`text1 ${errors.course_module ? 'inputError' : null}`} {...register("course_module")} onChange={handleInputChange}>
                    <option value="Primeiro Módulo (Introdução ao Frontend)">Primeiro Módulo</option>
                    <option value="Segundo Módulo (Frontend Avançado)">Segundo Módulo</option>
                    <option value="Terceiro Módulo (Introdução ao Backend)">Terceiro Módulo</option>
                    <option value="Quarto Módulo (Backend Avançado)">Quarto Módulo</option>
                </select>
                {errors.course_module ? <p className="errorMessage text4">{errors.course_module.message}</p> : null}
            </div>
            <button className={`submitButton formButton text2 ${isFormValid ? 'submitButtonActive' : null}`} disabled={loading}>Cadastrar</button>
        </form>
    )
}