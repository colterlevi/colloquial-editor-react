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
        content: `
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
      <pre><code class="language-css">body {
  display: none;
}</code></pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>
    `,
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
        <div className='w-4/5 rounded-lg p-10'>
        <div className='bg-swirl text-dianne flex justify-between'>
            <Toolbar editor={editor} />
        </div>
            <input className="h-auto w-3/5 p-3 rounded-md text-left text-4xl font-bold placeholder:font-bold placeholder:text-4xl" type="text" name='title' onChange={(e) => setTitle(e.target.value)} placeholder='Enter a title...' /><br />
            <div className='bg-slate prose lg:prose-2xl p-5 max-w-none overflow-auto'>
            <EditorContent editor={editor} />
        </div>
        <div className='bg-swirl p-3'>
            <button className="bg-tamarillo text-slate rounded-lg p-3" onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
    </div>
    )
}

export default PostCreator