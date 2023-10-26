import { useEffect, useRef } from "react"

export const useKeyDown = (key, callback) => {
    const ref = useRef(null)

    useEffect(() => {
        const handleKeydowm = (e) => {
            if(e.key === key) {
                if(callback) callback(ref.current)
            }
        }
        window.addEventListener("keydown", handleKeydowm)

        return () => {
            window.removeEventListener("keydown", handleKeydowm)
        }
    })
    return ref
}