import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { Outlet, useLoaderData, useNavigate } from "react-router-dom"
import Cookies from "js-cookie";

const Postlist = () => {
    const posts = useLoaderData()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.user.value)

    if (!currentUser) return null

    return(
        <div className="flex-col w-full h-auto overflow-auto scrollbar-hide md:scrollbar-default">
            <div className="flex-row bg-cello m-10 p-5 rounded-lg">
                <Outlet />
                {
                    posts.map((post) => {
                        return (
                            <div key={post.id} className="w-auto h-auto my-8 p-5 rounded-lg bg-slate">
                                <div className="flex justify-between">
                                <p className="font-bold text-xl text-dianne text-left">{post.title}</p><br />
                                <p className="font-bold text-xl text-dianne text-left">{post.author}</p>
                                </div>
                                <div className="flex w-full justify-between">
                                    <p className="truncate">{post.content}</p><br />
                                <p className="font-bold">{post.created_at}</p>
                                </div>
                                <br />
                                <div className="flex w-full justify-between mt-3">
                                    <button 
                                        className="text-slate bg-dianne font-bold rounded-lg w-auto h-10 uppercase px-2 py-2 text-sm"
                                    type="button"
                                    onClick={()=> {navigate(`edit/${post.id}`)}}>Edit Post</button>
                                    <div className="text-right text-tamarillo">
                                        <p className="font-bold">last edited by {post.edits.at(-1).editor}</p>
                                        <p> at {post.edits.at(-1).updated_at}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export const postLoader = async () => {
    let req = await fetch(`http://127.0.0.1:3000/articles`)
    let res = await req.json()
    return res
}

export default Postlist