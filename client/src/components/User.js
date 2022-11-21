import { useState } from "react"
import './styles/User.css'
import Profile from "./Profile"
import Login from "./Login"

const User = (props) => {
    // react state to check whether user is logged in or not
    const [isLoggedIn, setLogInStatus] = useState(false)

    // fetch

    return (
        <div className='User'>
            {isLoggedIn ? <Profile /> : <Login />}
        </div>
    )
}

export default User