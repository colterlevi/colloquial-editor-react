// Import React dependencies.
import React, { useState, useEffect, useMemo } from 'react'
// Import the Slate editor factory.
import { createEditor } from 'slate'
import { login } from "../features/user"
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'


const PostEditor = ({dispatch}) => {
    // Create a Slate editor object that won't change across renders.
    const [editor] = useState(() => withReact(createEditor()))

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
        requestUser()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const content = JSON.parse(localStorage.getItem('content'))
        console.log(content[0].children[0].text)
    }

    return (
        <div className='bg-slate m-20 p-3 w-4/5 h-4/5 rounded-lg overflow-auto scrollbar-hide md:scrollbar-default'>
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
            <button 
            onClick={(e) => handleSubmit(e)}
                className="text-slate bg-tamarillo font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Add Post</button>
        </div>
    )
    

}

export default PostEditor