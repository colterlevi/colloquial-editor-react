import { useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from '../plugins/toolbar'
import { useSelector } from "react-redux"
import Cookies from 'js-cookie'


const PostEditor = () => {
    // Create a Slate editor object that won't change across renders.
    const post = useLoaderData()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.user.value)
    const [title, setTitle] = useState(post.title)
    const [tags, setTags] = useState(post.tags)
    const [categories, setCategories] = useState(post.categories)

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: post.content
    })


    const handleSubmit = async (e) => {
        e.preventDefault()
        const content = editor.getHTML()
        console.log(content)
        let req = await fetch(`http://127.0.0.1:3000/articles/${post.id}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content,
                title: title,
            })

        })
        let res = await req.json()
        if (req.ok) {
            console.log(res)
            navigate('/')
        } else {
            console.log("POST CREATION FAILED")
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        let req = await fetch(`http://127.0.0.1:3000/articles/${post.id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
        })
        let res = await req.json()
        if (req.ok) {
            console.log(res)
            navigate(-1)
        } else {
            console.log("POST DELETION FAILED")
        }
    }

    if (!currentUser) return null

    return (
        <div className='rounded-lg p-10 h-full w-full'>
            <div className='bg-slate text-dianne px-10 py-2 grid gap-2 grid-cols-12 grid-rows-1 justify-between items-center text-center'>
                <Toolbar editor={editor} />
            </div>
            <hr />
            <input className="w-full p-3 bg-slate border-chateau text-left text-4xl font-bold placeholder:font-bold placeholder:text-4xl" type="text" name='title' onChange={(e) => setTitle(e.target.value)} placeholder={title} /><br />
            <hr />
            <div className='w-full h-3/4 flex bg-slate prose lg:prose-2xl p-5 max-w-none overflow-auto scrollbar-hide md:scrollbar-default'>
                <EditorContent editor={editor} />
            </div>
            <hr />
            <div className='flex w-full'>
                <input placeholder="Enter categories..." className='w-1/2 h-10 bg-slate outline-chateau' onChange={(e) => setCategories([...categories, e.target.value])}></input>
                <input placeholder="Enter tags..." className='w-1/2 h-10 bg-slate outline-chateau' onChange={(e) => setTags([...tags, e.target.value])}></input>
            </div>
            <div className='bg-chateau flex justify-center items-center space-x-3 p-3'>
                <button className="bg-tamarillo text-slate rounded-lg p-3" onClick={(e) => handleSubmit(e)}>Submit</button>
                <button className="bg-tamarillo text-slate rounded-lg p-3" onClick={() => navigate(-1)}>Close</button>
                <button className="bg-tamarillo text-slate rounded-lg p-3" onClick={(e) => handleDelete(e)}>Delete</button>
            </div>
        </div>
    )
}

export default PostEditor