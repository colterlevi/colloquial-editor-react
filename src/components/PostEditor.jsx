// Import React dependencies.
import React, { useState, useEffect } from 'react'
// Import the Slate editor factory.
import { createEditor } from 'slate'
import { login } from "../features/user"
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
]

const PostEditor = ({dispatch}) => {
    // Create a Slate editor object that won't change across renders.
    const [editor] = useState(() => withReact(createEditor()))

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

    return (
        <Slate editor={editor} value={initialValue}>
            <Editable />
        </Slate>
    )

}

export default PostEditor