import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"

export default function UserModal({}) {
    const user = useLoaderData()
    const currentUser = useSelector((state) => state.user.value)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    bio: user.bio,
    image: user.image,
    admin: 0,
    })
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setIsChecked(user.admin)
        console.log(isChecked)
    },[])
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let req = await fetch(`http://127.0.0.1:3000/authors/${user.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email,
                first_name: formData.first_name,
                last_name: formData.last_name,
                username: formData.username,
                bio: formData.bio,
                image: formData.image,
                admin: Number(formData.admin),
            })

        })
        let res = await req.json()
        if (req.ok) {
            navigate(-1)
        } else {
            alert("FAILED TO SAVE USER INFO")
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        let req = await fetch(`http://127.0.0.1:3000/authors/${user.id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`,
            },
        })
        let res = await req.json()
        if (req.ok) {
            console.log(res)

        } else {
            console.log("USER DELETION FAILED")
        }
    }

    

    const handleClick = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    if (!user) return null

    if (currentUser.admin === true){
    return (
      
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-chateau rounded-t">
                                </div>
                                {/*body*/}
                                <div className="flex-row justify-center items-center">
                                    <img src="../ColloquialHeader5.png" className="p-3 w-96" />
                                    <h2 className="font-semibold text-3xl text-center text-dianne">EDIT USER</h2><br />
                                    <form className="flex-row justify-center items-center text-center space-y-3">
                                        <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="text" value={formData.first_name} name='first_name' onChange={e => handleChange(e)} placeholder={user.first_name} /><br />
                                        <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="text" value={formData.last_name} name='last_name' onChange={e => handleChange(e)} placeholder={user.last_name} /><br />
                                        <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="text" value={formData.username} name='username' onChange={e => handleChange(e)} placeholder={user.username} /><br />
                                        <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="email" value={formData.email} name='email' onChange={e => handleChange(e)} placeholder={user.email} /><br />
                                        <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="text" value={formData.bio} name='bio' onChange={e => handleChange(e)} placeholder={user.bio === '' ? 'bio' : user.bio} /><br />
                                        <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="text" value={formData.image} name='image' onChange={e => handleChange(e)} placeholder={user.image === '' ? 'image' : user.image} /><br />
                                        <div className="flex space-x-2 justify-center items-center">
                                            <label className="uppercase text-dianne text-2xl">Admin?</label>
                                            <input className="w-5 h-5" type="checkbox" checked={isChecked} value={1} name='admin' onChange={(e) => {setIsChecked(!isChecked); handleChange(e)}} />
                                        </div><br />
                                        <input type="submit" className="p-2 bg-cello hover:bg-tamarillo text-slate uppercase rounded-md" onClick={e => handleSubmit(e)} value="SAVE" />
                                    </form><br />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-chateau rounded-b">
                                    <button
                                        className="text-slate bg-tamarillo font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={(e) => handleClick(e)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="text-slate bg-tamarillo font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={(e) => handleDelete(e)}
                                    >
                                        delete user
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
    );
} else {
        return (
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-chateau rounded-t">
                        </div>
                        {/*body*/}
                        <div className="flex-row justify-center items-center">
                            <img src="../ColloquialHeader5.png" className="p-3 w-96" />
                            <h2 className="font-semibold text-3xl text-center text-dianne">EDIT USER</h2><br />
                            <form className="flex-row justify-center items-center text-center space-y-3">
                                <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="text" value={formData.first_name} name='first_name' onChange={e => handleChange(e)} placeholder={user.first_name} /><br />
                                <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="text" value={formData.last_name} name='last_name' onChange={e => handleChange(e)} placeholder={user.last_name} /><br />
                                <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="text" value={formData.username} name='username' onChange={e => handleChange(e)} placeholder={user.username} /><br />
                                <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="email" value={formData.email} name='email' onChange={e => handleChange(e)} placeholder={user.email} /><br />
                                <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="text" value={formData.bio} name='bio' onChange={e => handleChange(e)} placeholder={user.bio === '' ? 'bio' : user.bio} /><br />
                                <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="text" value={formData.image} name='image' onChange={e => handleChange(e)} placeholder={user.image === '' ? 'image' : user.image} /><br />
                                <input type="submit" className="p-2 bg-cello hover:bg-tamarillo text-slate uppercase rounded-md" onClick={e => handleSubmit(e)} value="SAVE" />
                            </form><br />
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-chateau rounded-b">
                            <button
                                className="text-slate bg-tamarillo font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={(e) => handleClick(e)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );

}
}