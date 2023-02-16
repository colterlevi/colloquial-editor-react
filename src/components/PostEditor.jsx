import { useState, useRef, useCallback } from 'react'
import { useLoaderData, useNavigate } from "react-router-dom"
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Toolbar from '../plugins/toolbar'
import { useSelector } from "react-redux"
import Cookies from 'js-cookie'
import { FaImage } from 'react-icons/fa'


const PostEditor = () => {
    // Create a Slate editor object that won't change across renders.
    const post = useLoaderData()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.user.value)
    const title = useRef()
    const tags = useRef()
    const categories = useRef()
    const image = useRef()
    const slug = useRef()

    const editor = useEditor({
        extensions: [
            StarterKit, Image
        ],
        content: post.content
    })

    const [selectedValue, setSelectedValue] = useState(post.status);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(currentUser.id)
        console.log(post.author_id)
        if (currentUser.admin === false && currentUser.id !== post.author_id) {
            alert("You lack the required permissions for that.")
            return;
        } else {
        const newContent = editor.getHTML()
        let req = await fetch(`http://127.0.0.1:3000/articles/${post.id}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: newContent,
                title: title.current.value,
                categories: categories.current.value,
                tags: tags.current.value,
                slug: slug.current.value,
                image: image.current.value,
            })

        })
        let res = await req.json()
        if (req.ok) {
            console.log(res)
            navigate('/')
        } else {
            console.log("POST PATCH FAILED")
        }
    }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        if (currentUser.admin === false) {
            alert("You lack the required permissions for that.")
            return;
        } else {
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
    }

    const addImage = useCallback(() => {
        const url = image.current.value

        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }, [editor])

    if (!editor) {
        return null
    }

    if (!currentUser) return null

    return (
        <div className='rounded-lg p-10 h-full w-full'>
            <div className='bg-slate text-dianne px-10 py-2 grid gap-2 grid-cols-12 grid-rows-1 justify-between items-center text-center'>
                <Toolbar editor={editor} />
                <button className="toolbar" onClick={addImage}><FaImage /></button>
            </div>
            <hr />
            <div className='flex w-full bg-slate justify-evenly'>
            <input ref={title} defaultValue={post.title} className="w-1/2 p-3 bg-slate border-chateau text-left text-4xl font-bold placeholder:font-bold placeholder:text-4xl" type="text" name='title'/><br />
            <div className='w-1/5 p-3 flex justify-end items-center text-right'>
                <label htmlFor="select-status">Publication status:</label>
                <select id="select-status" value={selectedValue} onChange={handleChange}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>
            </div>
            <hr />
            <div className='w-full h-3/4 flex bg-slate prose lg:prose-2xl p-5 max-w-none overflow-auto scrollbar-hide md:scrollbar-default'>
                <EditorContent editor={editor} />
            </div>
            <hr />
            <div className='inline-grid gap-2 grid-cols-2 w-full'>
                <input ref={categories} placeholder={post.categories} defaultValue={"uncategorized"} className='w-full pl-2 h-10 bg-slate outline-chateau'></input>
                <input id="tags" ref={tags} placeholder={post.tags} defaultValue={"untagged"} className='w-full pl-2 h-10 bg-slate outline-chateau'></input>
                <input ref={slug} placeholder="Enter slug..." defaultValue={post.slug} className='w-full pl-2 h-10 bg-slate outline-chateau'></input>
                <input ref={image} placeholder="Enter image..." defaultValue={post.image} className='w-full pl-2 h-10 bg-slate outline-chateau'></input>
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