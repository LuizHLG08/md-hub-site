import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";


export const TechContext = createContext({})

export const TechProvider = ({ children }) => {

    const [techList, setTechList] = useState([])
    const [isCreateOpen, setIsCreateOpen] = useState(false)

    useEffect(() => {
        const getTechs = async () => {
            try {
                const token = localStorage.getItem("@loginToken")
                const { data } = await api.get("/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                setTechList(data.techs)
            } catch (error) {
                toast.error("Ops! Algo deu errado")
            }
        }
        getTechs()
    }, [])
    
    const createTech = async (formData) => {
        try {
            const token = localStorage.getItem("@loginToken")
            const { data } = await api.post("/users/techs",formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setTechList([...techList, data])
            toast.success("Technologia criada com sucesso!")
            setIsCreateOpen(false)
        } catch (error) {
            toast.error("Ops! Algo deu errado")
        }
    }

    return (
        <TechContext.Provider value={{techList, createTech, isCreateOpen, setIsCreateOpen}}>
            {children}
        </TechContext.Provider>
    )
}