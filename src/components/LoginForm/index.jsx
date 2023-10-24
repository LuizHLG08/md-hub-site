import { Link, useNavigate } from "react-router-dom"
import { Input } from "../formComponents/Input"
import styles from "./style.module.scss"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginFormSchema } from "./loginFormSchema"
import { useContext, useState } from "react"
import { UserContext } from "../../provider/UserContext"

export const LoginForm = () => {

    const { userLogin, loading } = useContext(UserContext)

    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        resolver: zodResolver(loginFormSchema),
        mode: "onChange"
    })

    const submit = async (formData) => {
        userLogin(formData)
    }
 
    return (
        <form className={`${styles.loginForm} form`} onSubmit={handleSubmit(submit)} >
            <h2 className="title1">Login</h2>
            <Input label="Email" type="text" placeholder="Digite aqui seu email" {...register("email")} error={errors.email} />
            <Input label="Senha" type="password" placeholder="Digite aqui sua senha" {...register("password")} error={errors.password} />
            <button className={`submitButton formButton text2 ${isValid ? 'submitButtonActive' : null}`} type="submit" disabled={loading}>Entrar</button>
            <p className="text3">Ainda não possui uma conta?</p>
            <Link className={`${styles.register} formButton registerButton text2`} to="/register">Cadastre-se</Link>
        </form>
    )
}