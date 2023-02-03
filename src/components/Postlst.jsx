import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../features/user"

const Postlist = ({dispatch}) => {
    const [posts, setPosts] = useState([])
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
        const requestPosts = async () => {
            let req = await fetch(`http://127.0.0.1:3000/articles`)
            let res = await req.json()
            setPosts(res)
            console.log(res)
        }
        requestUser()
        requestPosts()
    }, [])

    if (!currentUser) return null

    return(
        <div className="flex-row bg-cello w-3/5 p-10 rounded-lg align-middle overflow-auto scrollbar-hide md:scrollbar-default">
            <h2 className="text-4xl text-slate uppercase bg-tamarillo rounded-lg p-3 w-3/5 text-center">{currentUser.username}'s DASHBOARD</h2>
            {
                posts.map((post) => {
                    return (
                        <div key={post.id} className="w-4/5 h-auto m-8 p-5 rounded-lg bg-swirl hover:bg-chateau hover:text-tamarillo" onClick={() => { alert(`You clicked article no. ${post.id}`) }}>
                            <p className="font-bold text-xl text-dianne text-left">{post.author}</p>
                            <p className="font-bold text-dianne text-right flow-right">{post.created_at}</p>
                            <p>{post.content}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Postlist