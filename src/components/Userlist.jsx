import { useSelector } from "react-redux"
import { Outlet, useLoaderData, useNavigate } from "react-router-dom"
import { FaCrown } from "react-icons/fa"

const Userlist = () => {
    const currentUser = useSelector((state) => state.user.value)
    const navigate = useNavigate()
    const users = useLoaderData()

    if (!currentUser) return null

    return (
        <div className="flex-row bg-cello w-4/5 h-4/5 m-10 p-10 rounded-lg overflow-auto scrollbar-hide md:scrollbar-default">
            {
                users.map((user) => {
                    if (user.id === currentUser.id) return;
                    else {
                    return (
                        <>
                        <Outlet />
                        <div key={user.id} className="flex justify-between w-auto h-auto m-8 p-5 rounded-lg font-bold text-dianne bg-swirl hover:bg-chateau hover:text-tamarillo"
                        onClick={() => {navigate(`${user.id}`)}} 
                        >
                            <div className="flex space-x-2 justify-center items-center">
                                <p className="text-xl">{user.username}</p>
                                    {
                                        user.admin === true ? <FaCrown /> : null
                                    }
                                <br />
                            </div>
                            <div className="text-right">
                                <p className="text-md">{user.first_name} {user.last_name}</p>
                                <p className="underline">{user.email}</p>
                            </div>
                        </div>
                        </>
                    )
                    }
                })
            }
        </div>
    )
}

export const requestUsers = async () => {
    let req = await fetch(`http://127.0.0.1:3000/authors`)
    let res = await req.json()
    return res
}

export default Userlist