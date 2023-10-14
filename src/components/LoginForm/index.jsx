import { Link, useNavigate } from "react-router-dom"
import { Input } from "../formComponents/Input"
import styles from "./style.module.scss"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "../../services/api"
import { loginFormSchema } from "./loginFormSchema"
import { useState } from "react"
import { toast } from "react-toastify"

export const LoginForm = ({setUser}) => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(loginFormSchema)
    })
    
    const [isFormValid, setIsFormValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleInputChange = () => {
        const emailValue = document.querySelector('input[name="email"]').value;
        const passwordValue = document.querySelector('input[name="password"]').value;
        setIsFormValid(emailValue && passwordValue);
    }

    const submit = async (formData) => {
        try {
            setLoading(true)
            const { data } = await api.post("/sessions", formData)
            localStorage.setItem("@loginToken", data.token)
            localStorage.setItem("@userData", JSON.stringify(data.user))
            setUser(data.user)
            toast.success("Login realizado com sucesso!")
            setTimeout(() => navigate("/dashboard"), 1000);
        } catch (error) {
            if(error.response.data.message === "Incorrect email / password combination") {
                toast.error("Email ou senha incorretos!")
            } else {
                toast.error("Ops! Algo deu errado")
            }
        } finally {
            setLoading(false)
        }
    }
 
    return (
        <form className={`${styles.loginForm} form`} onSubmit={handleSubmit(submit)} >
            <h2 className="title1">Login</h2>
            <Input label="Email" type="text" placeholder="Digite aqui seu email" {...register("email")} error={errors.email} onChange={handleInputChange} />
            <Input label="Senha" type="password" placeholder="Digite aqui sua senha" {...register("password")} error={errors.password} onChange={handleInputChange} />
            <button className={`submitButton formButton text2 ${isFormValid ? 'submitButtonActive' : null}`} type="submit" disabled={loading}>Entrar</button>
            <p className="text3">Ainda não possui uma conta?</p>
            <Link className={`${styles.register} formButton registerButton text2`} to="/register">Cadastre-se</Link>
        </form>
    )
}