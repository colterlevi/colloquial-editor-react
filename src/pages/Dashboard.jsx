import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, Outlet } from "react-router-dom"
import { login } from "../features/user"
import Logout from "../components/Logout";
import Navbar from "../components/Navbar";

const Dashboard = ({ dispatch }) => {
    const currentUser = useSelector((state) => state.user.value)
    const navigate = useNavigate()
    
    useEffect(() => {
        const requestUser = async () => {
            let req = await fetch('http://127.0.0.1:3000/who_am_i', {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`,
                }
            }
            )
            let res = await req.json()
            if (req.ok) {
                dispatch(login(res))
            } else {
                navigate('/login')
                console.log("No user logged in")
            }
        }
        requestUser()
    }, [])

    if (!currentUser) return null

    return(
        <div className='flex bg-dianne w-screen h-screen'>
            <div className="flex-col w-2/12 bg-chateau mr-20 text-center space-y-96 justify-end">
                <Navbar />
                <Logout dispatch={dispatch} navigate={navigate} />
            </div>
            <Outlet />
        </div>
    )
}

export default Dashboard