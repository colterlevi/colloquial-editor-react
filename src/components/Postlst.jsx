import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { login } from "../features/user"

const Postlist = ({dispatch}) => {
    const [posts, setPosts] = useState([])
    const [selectedArticle, setSelectedArticle] = useState({})
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

    const handleDelete = async (e) => {
        e.preventDefault()
        let req = await fetch(`http://127.0.0.1:3000/articles/${selectedArticle.id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
            },
        })
        let res = await req.json()
        if (req.ok) {
            console.log(res)

        } else {
            console.log("POST DELETION FAILED")
        }
    }

    console.log(selectedArticle)

    if (!currentUser) return null

    return(
        <div className="flex-col h-auto overflow-auto scrollbar-hide md:scrollbar-default">
            <div className="flex-row bg-cello m-10 p-5 rounded-lg">
                {
                    posts.map((post) => {
                        return (
                            <div key={post.id} className="w-auto h-auto my-8 p-5 rounded-lg bg-swirl hover:bg-chateau hover:text-tamarillo" onClick={(e) => {setSelectedArticle(post)}}>
                                <p className="font-bold text-xl text-dianne text-left">{post.author}</p>
                                <p className="font-bold text-dianne text-right flow-right">{post.created_at}</p>
                                <p className="truncate">{post.content}</p>
                                <button 
                                className="text-slate bg-tamarillo font-bold rounded-full w-10 h-10 uppercase px-2 py-2 text-sm float-right"
                                type="button"
                                onClick={(e)=> {handleDelete(e)}}>X</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Postlist