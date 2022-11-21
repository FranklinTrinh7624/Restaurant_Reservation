import { Link } from "react-router-dom"
import './styles/Navbar.css'

const Navbar = (props) => {
    return (
        <div className="Navbar">
            <ul>
                <li id="logo"><img src={require("./assets/logo_bear.png")} alt="Bear Den logo" width="200" height="150" /></li>
                <Link to={'/'}><li>Home</li></Link>
                {/* show username instead of login if the user is already logged in example: welcome, [username]*/}
                {/* use ternary operator with props */}
                <Link to={'/user'} ><li>Login</li></Link>
            </ul>
        </div>
    )
}

export default Navbar
