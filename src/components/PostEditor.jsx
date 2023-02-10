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
        <div className='w-4/5 rounded-lg p-10 h-auto overflow-auto fixed z-50 inset-0'>
            <div className='bg-swirl text-dianne flex justify-between'>
                <Toolbar editor={editor} />
            </div>
            <input className="h-auto w-3/5 p-3 rounded-md text-left text-4xl font-bold placeholder:font-bold placeholder:text-4xl" type="text" name='title' onChange={(e) => setTitle(e.target.value)} placeholder={title} /><br />
            <div className='bg-slate prose lg:prose-2xl p-5 max-w-none overflow-auto'>
                <EditorContent editor={editor} />
            </div>
            <div className='bg-swirl p-3'>
                <button className="bg-tamarillo text-slate rounded-lg p-3" onClick={(e) => handleSubmit(e)}>Submit</button>
                <button className="bg-tamarillo text-slate rounded-lg p-3" onClick={() => navigate(-1)}>Close</button>
                <button className="bg-tamarillo text-slate rounded-lg p-3" onClick={(e) => handleDelete(e)}>Delete</button>
            </div>
        </div>
    )
}

export default PostEditor