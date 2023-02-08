// Import React dependencies.
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useLoaderData, useNavigate } from "react-router-dom"
// Import the Slate editor factory.
import { createEditor, Editor, Transforms, Text } from 'slate'
import { useSelector } from "react-redux"
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import Cookies from 'js-cookie'


const PostEditor = () => {
    // Create a Slate editor object that won't change across renders.
    const post = useLoaderData()
    const navigate = useNavigate()
    const [editor] = useState(() => withReact(createEditor()))
    const currentUser = useSelector((state) => state.user.value)
    const [title, setTitle] = useState(post.title)

    const initialValue = useMemo(
        () =>   
            [
                {
                    type: 'paragraph',
                    children: [{ text: post?.content }],
                }
            ] || [
                
                {
                    type: 'paragraph',
                    children: [{ text: 'A line of text in a paragraph.' }],
                },
            ],
        []
    )

    const DefaultElement = props => {
        return <p {...props.attributes}>{props.children}</p>
    }

    const CodeElement = props => {
        return (
            <pre {...props.attributes}>
                <code>{props.children}</code>
            </pre>
        )
    }

    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const content = JSON.parse(localStorage.getItem(`content ${post.id}`))
        console.log(content[0].children[0].text)
        let req = await fetch(`http://127.0.0.1:3000/articles/${post.id}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content[0].children[0].text,
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
        <div className='flex-row justify-center items-center w-3/5 h-4/5 ml-96 mt-20 bg-swirl rounded-lg p-5 fixed z-50 inset-0'>
            <input className="h-auto w-3/5 p-3 rounded-md text-left text-4xl font-bold placeholder:font-bold placeholder:text-4xl" type="text" name='title' onChange={(e) => setTitle(e.target.value)} placeholder={post.title} /><br />
            <div className='bg-slate my-3 p-3 w-full h-4/5 rounded-lg overflow-auto scrollbar-hide md:scrollbar-default'>
                <Slate editor={editor}
                    value={initialValue}
                    onChange={value => {
                        const isAstChange = editor.operations.some(
                            op => 'set_selection' !== op.type
                        )
                        if (isAstChange) {
                            // Save the value to Local Storage.
                            const content = JSON.stringify(value)
                            localStorage.setItem(`content ${post.id}`, content)
                        }
                    }}
                >
                    <Editable
                        renderElement={renderElement}
                        onKeyDown={event => {
                            if (!event.ctrlKey) {
                                return
                            }

                            switch (event.key) {
                                // When "`" is pressed, keep our existing code block logic.
                                case '`': {
                                    event.preventDefault()
                                    const [match] = Editor.nodes(editor, {
                                        match: n => n.type === 'code',
                                    })
                                    Transforms.setNodes(
                                        editor,
                                        { type: match ? 'paragraph' : 'code' },
                                        { match: n => Editor.isBlock(editor, n) }
                                    )
                                    break
                                }

                                // When "B" is pressed, bold the text in the selection.
                                case 'b': {
                                    event.preventDefault()
                                    Transforms.setNodes(
                                        editor,
                                        { bold: true },
                                        // Apply it to text nodes, and split the text node up if the
                                        // selection is overlapping only part of it.
                                        { match: n => Text.isText(n), split: true }
                                    )
                                    break
                                }
                            }
                        }}
                    />
                </Slate>
            </div>
            <div className='flex w-full space-x-10 mt-5'>
                <button
                onClick={(e) => handleSubmit(e)}
                className="text-slate bg-chateau hover:bg-tamarillo font-bold uppercase px-6 py-2 text-sm rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Save</button><br />
                <button
                onClick={() => {navigate(-1)}}
                className="text-slate bg-chateau hover:bg-tamarillo font-bold uppercase px-6 py-2 text-sm rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Close</button><br />
                <button
                    className="text-slate bg-tamarillo font-bold uppercase px-6 py-2 text-sm rounded-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={(e) => { handleDelete(e) }}>delete post</button>
            </div>
        </div>
    )


}

export default PostEditor