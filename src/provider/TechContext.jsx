import { createContext, useEffect, useState } from "react"
import { api } from "../services/api"
import { toast } from "react-toastify"


export const TechContext = createContext({})

export const TechProvider = ({ children }) => {

    const [techList, setTechList] = useState([])
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [editingTech, setEditingTech] = useState(null)
    const [deletingTech, setDeletingTech] = useState(null)

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
            const newTechList = techList.map(tech => {
                if(tech.id === editingTech.id) {
                    return data 
                } else {
                    return tech
                }
            })
            setTechList(newTechList)
            setEditingTech(null)
            toast.success("Tecnologia editada com sucesso!")
        } catch (error) {
            toast.error("Ops! Algo deu errado")
        }

    }

    const deleteTech = async () => {
        try {
            const token = localStorage.getItem("@loginToken")
            await api.delete(`/users/techs/${deletingTech}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success("Tecnologia removida com sucesso!")
            const newTechList = techList.filter(tech => tech.id !== deletingTech)
            setTechList(newTechList)
            setDeletingTech(null)
        } catch (error) {
            toast.error("Não foi possível remover a tecnologia!")
        }
    }

    return (
        <TechContext.Provider value={{ techList, createTech, isCreateOpen, setIsCreateOpen, editingTech, setEditingTech, editTech, deletingTech, setDeletingTech, deleteTech }}>
            {children}
        </TechContext.Provider>
    )
}