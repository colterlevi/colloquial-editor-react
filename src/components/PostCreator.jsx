import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Toolbar from '../plugins/toolbar'
import Cookies from 'js-cookie'


const PostCreator = () => {
    const [title, setTitle] = useState('')
    const navigate = useNavigate()

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: `<h2>Write something good...</h2>`,
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const content = editor.getHTML()
        console.log(content)
        let req = await fetch('http://127.0.0.1:3000/articles', {
            method: "POST",
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
            localStorage.removeItem("content")
            navigate('/')
        } else {
            console.log("POST CREATION FAILED")
        }
    }

    return (
        <div className='rounded-lg p-10 h-4/5 fixed z-50 inset-x-1/4 inset-y-5 focus:outline-none focus:ring focus:border-cello'>
            <div className='bg-swirl text-dianne flex justify-between'>
                <Toolbar editor={editor} />
            </div>
            <input className="w-full p-3 bg-slate border-chateau text-left text-4xl font-bold placeholder:font-bold placeholder:text-4xl" type="text" name='title' onChange={(e) => setTitle(e.target.value)} placeholder='Enter a title...' /><br />
            <div className='w-full max-h-full mb-10 flex bg-slate prose lg:prose-2xl p-5 max-w-none overflow-auto scrollbar-hide md:scrollbar-default'>
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

export default PostCreator