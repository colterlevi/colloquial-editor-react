import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../features/user"
import Modal from "./Modal";
import Cookies from "js-cookie";

const Userlist = ({dispatch}) => {
    const currentUser = useSelector((state) => state.user.value)
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({})

    useEffect(() => {
        const requestUsers = async () => {
            let req = await fetch(`http://127.0.0.1:3000/authors`)
            let res = await req.json()
            setUsers(res)
            console.log(res)
        }
        requestUsers()
    }, [])

    const handleClick = (user) => {
        if (showModal === false){
            setSelectedUser(user)
        }
        else {
            return;
        }

    }

    console.log(selectedUser)

    if (!currentUser) return null

    return (
        <div className="flex-row bg-cello w-4/5 h-4/5 m-10 p-10 rounded-lg overflow-auto scrollbar-hide md:scrollbar-default">
            {
                users.map((user) => {
                    if (user.id === currentUser.id) return;
                    else {
                    return (
                        <div key={user.id} className="flex w-4/5 h-auto m-8 p-5 justify-evenly rounded-lg bg-swirl hover:bg-chateau hover:text-tamarillo"
                        onClick={() => {handleClick(user)}} 
                        >
                            <div>
                                <p className="font-bold text-xl text-dianne text-left">{user.username}</p>
                                <p className="font-bold text-dianne text-left">{user.first_name} {user.last_name}</p><br />
                            </div>
                            <div>
                                <Modal showModal={showModal} setShowModal={setShowModal} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
                            </div>
                        </div>
                    )
                    }
                })
            }
        </div>
    )


}

export default Userlist