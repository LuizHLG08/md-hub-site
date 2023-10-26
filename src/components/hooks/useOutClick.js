import { useEffect } from "react"
import { useRef } from "react"


export const useOutClick = (callback) => {
    const ref = useRef(null)

    useEffect(() => {
        const handleOutClick = (e) => {
            if(!ref.current.contains(e.target)) {
                if(callback) callback()
            }
        }

        window.addEventListener("mousedown", handleOutClick)

        return () => {
            window.removeEventListener("mousedown", handleOutClick)
        }

    })

    return ref
}