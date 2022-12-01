import { Link } from "react-router-dom"
import './styles/Navbar.css'

const Navbar = ({ loginState, transparentbg }) => {

    return (
        <div className="Navbar" style={{background: transparentbg ? "#00000000" : "#000000"}}>
            <ul>
                <li id="logo"><img src={require("./assets/logo_bear.png")} alt="Bear Den logo" width="200" height="150" /></li>
                <Link to={'/'}><li>Home</li></Link>
                <Link to={'/reservation'}><li>Reservations</li></Link>
                {/* show username instead of login if the user is already logged in example: welcome, [username]*/}
                {/* use ternary operator with props */}
                <Link to={'/user'} ><li>{loginState ? 'Profile' : 'Login'}</li></Link>
            </ul>
        </div>
    )
}

export default Navbar
