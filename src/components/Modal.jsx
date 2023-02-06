import { useState } from "react";

export default function Modal({ showModal, setShowModal, selectedUser, setSelectedUser }) {

    if (selectedUser) {
        const [formData, setFormData] = useState({
        email: selectedUser.email,
        first_name: selectedUser.first_name,
        last_name: selectedUser.last_name,
        username: selectedUser.username,
        bio: selectedUser.bio,
        admin: selectedUser.admin,
    })
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let req = await fetch(`http://127.0.0.1:3000/authors/${selectedUser.id}`, {
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
                admin: Number(formData.admin),
            })

        })
        let res = await req.json()
        if (req.ok) {
            console.log(res)

        } else {
            console.log("USER PATCH FAILED")
        }
    }

    const handleClick = () => {
        setSelectedUser({})
        setShowModal(false)
    }

    if (selectedUser) console.log(formData)


    return (
        <>
            <button
                className="bg-dianne text-slate font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {setShowModal(true)}}
            >
                Edit User
            </button>
            {showModal ? (
                <>
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
                                    <img src="ColloquialHeader5.png" className="p-3" />
                                    <h2 className="font-semibold text-3xl text-center text-dianne">EDIT USER</h2><br />
                                    <form className="flex-row justify-center items-center text-center space-y-3">
                                        <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="text" value={formData.first_name} name='first_name' onChange={e => handleChange(e)} placeholder={selectedUser.first_name} /><br />
                                        <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="text" value={formData.last_name} name='last_name' onChange={e => handleChange(e)} placeholder={selectedUser.last_name} /><br />
                                        <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="text" value={formData.username} name='username' onChange={e => handleChange(e)} placeholder={selectedUser.username} /><br />
                                        <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="email" value={formData.email} name='email' onChange={e => handleChange(e)} placeholder={selectedUser.email} /><br />
                                        <input className="h-10 w-4/5 pl-3 rounded-md text-left" type="text" value={formData.bio} name='bio' onChange={e => handleChange(e)} placeholder={selectedUser.bio === '' ? 'bio' : selectedUser.bio} /><br />
                                        <div className="flex space-x-2 justify-center items-center">
                                            <label className="uppercase text-dianne text-2xl">Admin?</label>
                                            <input className="w-5 h-5" type="checkbox" value={1} name='admin' onChange={e => handleChange(e)} placeholder="ADMIN" />
                                        </div><br />
                                        <input type="submit" className="p-2 bg-cello hover:bg-tamarillo text-slate uppercase rounded-md" onClick={e => handleSubmit(e)} value="ADD USER" />
                                    </form><br />
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-chateau rounded-b">
                                    <button
                                        className="text-slate bg-tamarillo font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => handleClick()}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-dianne"></div>
                </>
            ) : null}
        </>
    );
    }
}