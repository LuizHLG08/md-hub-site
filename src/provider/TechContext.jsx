import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";


export const TechContext = createContext({})

export const TechProvider = ({ children }) => {

    const [techList, setTechList] = useState([])

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

    return (
        <TechContext.Provider value={{techList}}>
            {children}
        </TechContext.Provider>
    )
}