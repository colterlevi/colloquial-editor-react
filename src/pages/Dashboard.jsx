import { useSelector } from "react-redux"

const Dashboard = () => {
    const currentUser = useSelector((state) => state.user.value)
    console.log(currentUser)
    console.log(localStorage.token)

    return(
        <div className='flex bg-dianne w-screen h-screen gap-x-96 justify-center items-center'>
            <div className="w-96 h-52">
                <h2 className="text-4xl text-slate">{currentUser.username}'s DASHBOARD</h2>
            </div>
        </div>
    )
}

export default Dashboard