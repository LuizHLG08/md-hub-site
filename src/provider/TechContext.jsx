import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";


export const TechContext = createContext({})

export const TechProvider = ({ children }) => {

    const [techList, setTechList] = useState([])
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [editingTech, setEditingTech] = useState(null)

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
            const { data } = await api.post("/users/techs", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            setTechList([...techList, data])
            toast.success("Technologia criada com sucesso!")
            setIsCreateOpen(false)
        } catch (error) {
            if (error.response.data.message === "User Already have this technology created you can only update it") {
                toast.error("Está tecnologia já foi adicionada!")
            }
            toast.error("Ops! Algo deu errado")
        }
    }

    const editTech = async (formData) => {
        try {
            const token = localStorage.getItem("@loginToken")
            const { data } = await api.put(`/users/techs/${editingTech.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <TechContext.Provider value={{ techList, createTech, isCreateOpen, setIsCreateOpen, editingTech, setEditingTech, editTech }}>
            {children}
        </TechContext.Provider>
    )
}