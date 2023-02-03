import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { login } from "../features/user"


const AddUser = ({dispatch}) => {
    const navigate = useNavigate()

    useEffect(() => {
        const request = async () => {
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
        request()
    }, [])

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

    return (
        <div className="flex bg-dianne w-3/5 p-10 justify-center items-center">
            <div className="rounded-lg w-2/5 p-10 bg-chateau bg-opacity-75">
                <div className="flex-row justify-center items-center">
                    <img src="ColloquialHeader5.png" className="p-3" />
                    <h2 className="font-semibold text-3xl text-center text-slate">ADD USER</h2><br />
                    <form className="flex-row justify-center items-center text-center">
                        <input className="h-10 w-4/5 rounded-md text-center" type="text" value={formData.first_name} name='first_name' onChange={e => handleChange(e)} placeholder="FIRST NAME" /><br />
                        <input className="h-10 w-4/5 rounded-md text-center" type="text" value={formData.last_name} name='last_name' onChange={e => handleChange(e)} placeholder="LAST NAME" /><br />
                        <input className="h-10 w-4/5 rounded-md text-center" type="text" value={formData.username} name='username' onChange={e => handleChange(e)} placeholder="USERNAME" /><br />
                        <input className="h-10 w-4/5 rounded-md text-center" type="email" value={formData.email} name='email' onChange={e => handleChange(e)} placeholder="EMAIL" /><br />
                        <input className="mt-3 w-4/5 h-10 rounded-md text-center" type="password" value={formData.password} name='password' onChange={e => handleChange(e)} placeholder="PASSWORD" /><br />
                        <input className="mt-3 w-4/5 h-10 rounded-md text-center" type="checkbox" value={1} name='admin' onChange={e => handleChange(e)} placeholder="ADMIN" /><br />
                        <input type="button" className="mt-5 p-2 bg-cello hover:bg-tamarillo text-slate uppercase rounded-md" onClick={e => handleSubmit(e)} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser