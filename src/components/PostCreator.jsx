import { useEditor, EditorContent } from '@tiptap/react'
import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
import { useState, useRef, useCallback } from 'react'
import { useNavigate } from "react-router-dom"
import Toolbar from '../plugins/toolbar'
import Cookies from 'js-cookie'
import { FaImage } from 'react-icons/fa'


const PostCreator = () => {
    const editor = useEditor({
        extensions: [
            StarterKit, Image
        ],
        content: `<p>Write something good...</p>`,
    })
    const title = useRef('')
    const tags = useRef('')
    const categories = useRef('')
    const image = useRef('')
    const slug = useRef('')
    const navigate = useNavigate()

    const [selectedValue, setSelectedValue] = useState("draft");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

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
                title: title.current.value,
                categories: categories.current.value,
                tags: tags.current.value,
                status: selectedValue,
                image: image.current.value,
                slug: slug.current.value,
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

    const addImage = useCallback(() => {
        const url = image.current.value

        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }, [editor])

    if (!editor) {
        return null
    }

    return (
        <div className='rounded-lg p-10 h-full w-full'>
            <div className='bg-slate text-dianne px-10 py-2 grid gap-2 grid-cols-12 justify-between items-center text-center'>
                <Toolbar editor={editor} />
                <button className="toolbar" onClick={addImage}><FaImage /></button>
            </div>
            <hr />
            <div className='flex w-full bg-slate item-center'>
            <input ref={title} className="w-4/5 p-3 border-chateau bg-slate text-left text-4xl font-bold placeholder:font-bold placeholder:text-4xl" type="text" name='title' placeholder='Enter a title...' /><br />
            <div className='w-auto p-3 flex justify-end items-center text-right outline-2 outline-dianne roundede-lg'>
                    <label htmlFor="select-status">Publication status:</label>
                    <select id="select-status" value={selectedValue} onChange={handleChange}>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
            </div>
            </div>
            <hr />
            <div className='w-full h-3/5 flex bg-slate prose lg:prose-2xl p-5 max-w-none overflow-auto scrollbar-hide md:scrollbar-default'>
                <EditorContent editor={editor} />
            </div>
            <hr />
            <div className='inline-grid gap-2 grid-cols-2 w-full'>
                <input ref={categories} placeholder="Enter categories..." className='w-full pl-2 h-10 bg-slate outline-chateau'></input>
                <input ref={tags} placeholder="Enter tags..." className='w-full pl-2 h-10 bg-slate outline-chateau'></input>
                <input ref={slug} placeholder="Enter slug..." className='w-full pl-2 h-10 bg-slate outline-chateau'></input>
                <input ref={image} placeholder="Enter image..." className='w-full pl-2 h-10 bg-slate outline-chateau'></input>
            </div>
            
            <div className='bg-chateau flex justify-center items-center space-x-3 p-3'>
                <button className="bg-tamarillo text-slate rounded-lg p-3" onClick={(e) => handleSubmit(e)}>Submit</button>
                <button className="bg-tamarillo text-slate rounded-lg p-3" onClick={() => navigate(-1)}>Close</button>
            </div>
        </div>
    )
}

export default PostCreator