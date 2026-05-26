import { useEffect } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"



const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const {user} = useSelector(store=>store.auth)
    useEffect(()=>{
        if(user === null || user.role !== "employer"){
            navigate("/")
        }
    })
  return (
    <>
    {children}
    </>
  )
}

export default ProtectedRoute;