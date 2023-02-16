import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, Outlet } from "react-router-dom"
import { login } from "../features/user"
import Logout from "../components/Logout";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";

const Dashboard = ({ dispatch }) => {
    const currentUser = useSelector((state) => state.user.value)
    const navigate = useNavigate()
    
    useEffect(() => {
        const requestUser = async () => {
            let req = await fetch('http://127.0.0.1:3000/who_am_i', {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
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
        <div className='flex bg-dianne w-screen h-screen overflow-auto scrollbar-hide md:scrollbar-default'>
            <div className="flex-col w-1/5 h-full bg-chateau justify-center space-y-10 pt-10">
                <div className="flex w-full justify-center items-center text-center">
                 <div onClick={() => navigate(`users/${currentUser.id}`)} className="flex justify-center items-center rounded-full w-28 h-28 bg-tamarillo">
                        <img className="rounded-full h-20 w-20" src={currentUser.image} />
                    {/* <h2 className="text-sm text-slate uppercase bg-cello m-14 rounded-lg p-3 w-auto">{currentUser.username}'s DASHBOARD</h2> */}
                    </div>
                </div>
                <div className="flex justify-center items-center text-center">
                    <Navbar currentUser={currentUser}/>
                </div>
                <div className="flex justify-center items-center text-center">
                    <Logout dispatch={dispatch} navigate={navigate} />
                </div>
            </div>
            <div className="flex w-4/5 justify-center items-center overflow-auto scrollbar-hide md:scrollbar-default">
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard