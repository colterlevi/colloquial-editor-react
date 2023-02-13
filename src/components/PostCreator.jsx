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
        content: `<p>Write something good...</p>`,
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
        <div className='rounded-lg p-10 h-full w-full'>
            <div className='bg-swirl text-dianne px-10 py-2 grid gap-2 grid-cols-12 grid-rows-2 justify-between items-center'>
                <Toolbar editor={editor} />
            </div>
            <input className="w-full p-3 bg-slate border-chateau text-left text-4xl font-bold placeholder:font-bold placeholder:text-4xl" type="text" name='title' onChange={(e) => setTitle(e.target.value)} placeholder='Enter a title...' /><br />
            <hr />
            <div className='w-full max-h-full flex bg-slate prose lg:prose-2xl p-5 max-w-none overflow-auto scrollbar-hide md:scrollbar-default'>
                <EditorContent editor={editor} />
            </div>
            <hr />
            <div className='flex w-full'>
                <input placeholder="Enter categories..." className='w-1/2 h-10 bg-slate outline-chateau'></input>
                <input placeholder="Enter tags..." className='w-1/2 h-10 bg-slate outline-chateau'></input>
            </div>
            <div className='bg-swirl flex justify-center items-center space-x-3 p-3'>
                <button className="bg-tamarillo text-slate rounded-lg p-3" onClick={(e) => handleSubmit(e)}>Submit</button>
                <button className="bg-tamarillo text-slate rounded-lg p-3" onClick={() => navigate(-1)}>Close</button>
            </div>
        </div>
    )
}

export default PostCreator