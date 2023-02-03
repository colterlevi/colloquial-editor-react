import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../features/user"

const Login = ({dispatch}) => {
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
                console.log(res)
                navigate('/')
            } else { 
                navigate('/login')
                console.log("No user logged in") }
        }
        request()
    }, [])
  
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let req = await fetch('http://127.0.0.1:3000/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            })

        })
        let res = await req.json()
        if (req.ok) {
            dispatch(login(res.author))
            localStorage.setItem("token", res.token)
            navigate('/')

        } else {
            alert("LOGIN FAILED")
        }
    }

    return (
        <div className="flex bg-dianne w-screen h-screen gap-x-96 justify-center items-center">
            <div className="rounded-lg w-2/5 p-10 bg-chateau bg-opacity-75">
                <div className="flex-row justify-center items-center">
                <img src="ColloquialHeader5.png" className="p-3"/>
                <h2 className="font-semibold text-3xl text-center text-slate">LOG IN</h2><br />
                    <form className="flex-row justify-center items-center text-center">
                    <input className="h-10 w-4/5 rounded-md text-center" type="email" value={formData.email} name='email' onChange={e => handleChange(e)} placeholder="EMAIL" /><br />
                    <input className="mt-3 w-4/5 h-10 rounded-md text-center" type="password" value={formData.password} name='password' onChange={e => handleChange(e)} placeholder="PASSWORD" /><br />
                    <input type="button" className="mt-5 p-2 bg-cello hover:bg-tamarillo text-slate uppercase rounded-md" onClick={e => handleSubmit(e)} />
                </form>
            </div>
        </div>
        </div>
    )
}

export default Login