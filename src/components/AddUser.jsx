import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const AddUser = () => {
    const currentUser = useSelector((state) => state.user.value)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        username: '',
        admin: 0,
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let req = await fetch('http://127.0.0.1:3000/authors', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                first_name: formData.first_name,
                last_name: formData.last_name,
                username: formData.username,
                admin: Number(formData.admin),
            })

        })
        let res = await req.json()
        if (req.ok) {
            console.log(res)

        } else {
            console.log("USER CREATION FAILED")
        }
    }

    if (currentUser.admin !== true) useEffect(() => navigate('/'))

    return (
        <div className="flex bg-dianne w-auto p-10 justify-center items-center">
            <div className="rounded-lg w-3/5 p-10 bg-chateau bg-opacity-75">
                <div className="flex-row justify-center items-center">
                    <img src="ColloquialHeader5.png" className="p-3" />
                    <h2 className="font-semibold text-3xl text-center text-slate">ADD USER</h2><br />
                    <form className="flex-row justify-center items-center text-center space-y-3">
                        <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="text" value={formData.first_name} name='first_name' onChange={e => handleChange(e)} placeholder="FIRST NAME" /><br />
                        <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="text" value={formData.last_name} name='last_name' onChange={e => handleChange(e)} placeholder="LAST NAME" /><br />
                        <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="text" value={formData.username} name='username' onChange={e => handleChange(e)} placeholder="USERNAME" /><br />
                        <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="email" value={formData.email} name='email' onChange={e => handleChange(e)} placeholder="EMAIL" /><br />
                        <input className="w-4/5 h-10 pl-3 rounded-md text-left" type="password" value={formData.password} name='password' onChange={e => handleChange(e)} placeholder="PASSWORD" /><br />
                        <div className="flex space-x-3 justify-center items-center">
                        <label className="uppercase text-slate text-2xl">Admin?</label>
                        <input className="w-5 h-5" type="checkbox" value={1} name='admin' onChange={e => handleChange(e)} placeholder="ADMIN" />
                        </div><br />
                        <input type="submit" className="mt-5 p-2 bg-cello hover:bg-tamarillo text-slate uppercase rounded-md" onClick={e => handleSubmit(e)} value="ADD USER" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser