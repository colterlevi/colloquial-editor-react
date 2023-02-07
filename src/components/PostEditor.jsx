// Import React dependencies.
import React, { useState, useEffect, useMemo } from 'react'
// Import the Slate editor factory.
import { createEditor } from 'slate'
import { useSelector } from "react-redux"
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import Cookies from 'js-cookie'


const PostEditor = () => {
    // Create a Slate editor object that won't change across renders.
    const [editor] = useState(() => withReact(createEditor()))
    const currentUser = useSelector((state) => state.user.value)
    const [title, setTitle] = useState('')

    const initialValue = useMemo(
        () =>
            JSON.parse(localStorage.getItem('content')) || [
                {
                    type: 'paragraph',
                    children: [{ text: 'A line of text in a paragraph.' }],
                },
            ],
        []
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        const content = JSON.parse(localStorage.getItem('content'))
        console.log(content[0].children[0].text)
        let req = await fetch('http://127.0.0.1:3000/articles', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author_id: currentUser.id,
                content: content[0].children[0].text,
                title: title,
            })

        })
        let res = await req.json()
        if (req.ok) {
            console.log(res)
            localStorage.removeItem("content")

        } else {
            console.log("POST CREATION FAILED")
        }
    }

    if (!currentUser) return null

    return (
        <div className='w-4/5 h-auto'>
            <input className="h-10 w-full p-3 rounded-md text-left" type="text" name='first_name' onChange={(e) => setTitle(e.target.value)} placeholder="Title" /><br />
            <div className='bg-slate my-3 p-3 w-full h-96 rounded-lg overflow-auto scrollbar-hide md:scrollbar-default'>
                <Slate editor={editor}
                value={initialValue}
                onChange={value => {
                    const isAstChange = editor.operations.some(
                        op => 'set_selection' !== op.type
                    )
                    if (isAstChange) {
                        // Save the value to Local Storage.
                        const content = JSON.stringify(value)
                        localStorage.setItem('content', content)
                    }
                }}
                >
                    <Editable 
                        onKeyDown={event => {
                            console.log(event.key)
                        }}
                        />
                </Slate>
            </div>
                <button 
                onClick={(e) => handleSubmit(e)}
                    className="text-slate bg-tamarillo font-bold uppercase px-6 py-2 text-sm rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Add Post</button>
        </div>
    )
    

}

export default PostEditor