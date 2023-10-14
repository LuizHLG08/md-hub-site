import { useEffect, useState } from "react"
import { RoutesMain } from "./routes/RoutesMain"
import "./styles/index.scss"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom"

function App() {
  const localUser = localStorage.getItem("@userData")
  const navigate = useNavigate()

  const [user, setUser] = useState(localUser ? JSON.parse(localUser) : {})

  useEffect(() => {
    const verifyUser = () => {
      user ? navigate("/dashboard") : null
    }
    verifyUser()
  }, [])

  return (
    <>
      <ToastContainer autoClose={2000} />
      <RoutesMain user={user} setUser={setUser} />
    </>
  )
}

export default App
