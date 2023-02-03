import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../features/user"

const Dashboard = ({ dispatch }) => {
    const currentUser = useSelector((state) => state.user.value)
    const [posts, setPosts] = useState([])
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
                navigate('/')
                console.log("No user logged in")
            }
        }
        const requestPosts = async () => {
            let req = await fetch(`http://127.0.0.1:3000/articles`)
            let res = await req.json()
            setPosts(res)
        }
        requestUser()
        requestPosts()
    }, [])

    if (!currentUser) return null

    return(
        <div className='flex bg-dianne w-screen h-screen justify-center items-center'>
            <div className="flex-row bg-cello p-10 rounded-lg justify-center items-center">
                <h2 className="text-4xl text-slate uppercase bg-tamarillo rounded-lg p-3 w-3/5 text-center">{currentUser.username}'s DASHBOARD</h2>
                {
                    posts.map((post) => {
                        return(
                            <div key={post.id} className="w-4/5 h-auto m-10 p-5 rounded-lg bg-swirl hover:bg-chateau hover:text-tamarillo" onClick={() => {alert(`You clicked article no. ${post.id}`)}}>
                                <p>{post.status}</p>
                                <p>{post.content}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Dashboard