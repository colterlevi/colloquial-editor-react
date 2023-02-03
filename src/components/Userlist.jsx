import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../features/user"

const Userlist = ({dispatch}) => {
    const currentUser = useSelector((state) => state.user.value)
    const navigate = useNavigate()
    const [users, setUsers] = useState([])

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
        const requestUsers = async () => {
            let req = await fetch(`http://127.0.0.1:3000/authors`)
            let res = await req.json()
            setUsers(res)
            console.log(res)
        }
        requestUser()
        requestUsers()
    }, [])

    if (!currentUser) return null

    return (
        <div className="flex-row bg-cello w-full m-10 p-10 rounded-lg align-middle overflow-auto scrollbar-hide md:scrollbar-default">
            <h2 className="text-4xl text-slate uppercase bg-tamarillo rounded-lg p-3 w-3/5 text-center">Active Authors</h2>
            {
                users.map((user) => {
                    if (user.id === currentUser.id) return;
                    else {
                    return (
                        <div key={user.id} className="w-4/5 h-auto m-8 p-5 rounded-lg bg-swirl hover:bg-chateau hover:text-tamarillo" onClick={() => { alert(`You clicked ${user.username}`) }}>
                            <p className="font-bold text-xl text-dianne text-left">{user.username}</p>
                            <p className="font-bold text-dianne text-left">{user.first_name} {user.last_name}</p>
                        </div>
                    )
                    }
                })
            }
        </div>
    )


}

export default Userlist