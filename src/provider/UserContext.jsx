import { createContext, useEffect, useState } from "react"
import { api } from "../services/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export const UserContext = createContext({})

export const UserProvider = ({children}) => {

    
    
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("@loginToken")
            if(token) {
                try {
                    setLoading(true)
                    const { data } = await api.get("/profile", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    setUser(data)
                    navigate("/dashboard")
                } catch (error) {
                    localStorage.removeItem("@loginToken")
                    localStorage.removeItem("@userId")
                } finally {
                    setLoading(false)
                }
            }
        }
        loadUser()
    }, [])


    const userRegister = async (formData) => {
        try {
            setLoading(true)
            await api.post("/users", formData)
            toast.success("Usuário cadastrado com sucesso!")
            setTimeout(() => navigate("/"), 2000)
        } catch (error) {
            if(error.response.data.message === "Email already exists") {
                toast.error("Email já cadastrado!")
            } else {
                toast.error("Ops! Algo deu errado")
            }
        } finally {
            setLoading(false)
        }
    }


    const userLogin = async (formData) => {
        try {
            setLoading(true)
            const { data } = await api.post("/sessions", formData)
            localStorage.setItem("@loginToken", data.token)
            localStorage.setItem("@userId", data.user.id)
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

    const logOut = () => {
        localStorage.removeItem("@loginToken")
        localStorage.removeItem("@userId")
        setUser(null)
        navigate("/")
    }


    return (
        <UserContext.Provider value={{user, setUser, loading, setLoading, userRegister, userLogin, logOut }}>
            {children}
        </UserContext.Provider>
    )
}