import { NavLink } from "react-router-dom";

function Navbar ({currentUser}) {
    let activeClassName = "bg-tamarillo p-3 rounded-lg";
    
    if (currentUser.admin === true) {
    return (
        <nav>
            <ul className="text-slate font-bold p-10">
                <li className="my-8">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? activeClassName : "bg-swirl p-3 rounded-lg"
                        }
                    >
                    DASHBOARD    
                    </NavLink>
                </li>
                <li className="my-8">
                    <NavLink
                        to="/add-post"
                        className={({ isActive }) =>
                            isActive ? activeClassName : "bg-swirl p-3 rounded-lg"
                        }
                    >
                        NEW POST
                    </NavLink>
                </li>
                {/* <li className="my-8">
                    <NavLink
                        to="/posts"
                        className={({ isActive }) =>
                            isActive ? activeClassName : "bg-swirl p-3 rounded-lg"
                        }
                    >
                        ALL POSTS
                    </NavLink>
                </li> */}
                <li className="my-8">
                    <NavLink
                        to="/users"
                        className={({ isActive }) =>
                            isActive ? activeClassName : "bg-swirl p-3 rounded-lg"
                        }
                    >
                        USERS
                    </NavLink>
                </li>
                <li className="my-8">
                    <NavLink to="/add-user">
                        {({ isActive }) => (
                            <span
                                className={
                                    isActive ? activeClassName : "bg-swirl p-3 rounded-lg"
                                }
                            >
                            ADD USER
                            </span>
                        )}
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
} else {
    return(
        <nav>
            <ul className="text-slate font-bold p-10">
                <li className="my-8">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? activeClassName : "bg-swirl p-3 rounded-lg"
                        }
                    >
                        DASHBOARD
                    </NavLink>
                </li>
                <li className="my-8">
                    <NavLink
                        to="/add-post"
                        className={({ isActive }) =>
                            isActive ? activeClassName : "bg-swirl p-3 rounded-lg"
                        }
                    >
                        NEW POST
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
}

export default Navbar;