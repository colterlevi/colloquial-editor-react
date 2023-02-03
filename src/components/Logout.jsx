import { logout } from "../features/user"

const Logout = ({dispatch, navigate}) => {

    const handleClick = async () => {
        let req = await fetch('http://127.0.0.1:3000/logout', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.token}`,
            }
        }
        )
        let res = await req.json()
        if (req.ok) {
            dispatch(logout())
            console.log(res)
            navigate('/login')
        }
        else {
            console.log("LOGOUT FAILED")
        }
    }

    return(
        <div>
            <button className="rounded-lg p-3 text-slate font-bold bg-tamarillo hover:bg-chateau" onClick={() => {handleClick()}}>LOGOUT</button>
        </div>
    )


}

export default Logout