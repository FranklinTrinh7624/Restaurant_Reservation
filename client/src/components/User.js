import { Component } from "react"
import './styles/User.css'
import Profile from "./Profile"
import Login from "./Login"
import axios from "axios"
import Navbar from './Navbar'

class User extends Component {
    // react state to check whether user is logged in or not
    constructor (props){
        super(props)
        this.state = {
            isLoggedIn: false
        }
    }
    
    componentDidMount = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:5000/isAuth",
        }).then((res) => {
            if(res.data.error){
                //alert(res.data.error);
            }
            else {
                this.setState(prev => ({...prev, isLoggedIn: true}))
            }
        });
    }
    
    render () {
        return (
            <div className='User'>
                <Navbar loginState={this.state.isLoggedIn} transparentbg={true}/>
                {this.state.isLoggedIn ? <Profile logInState={d => {this.setState(prev => ({...prev, isLoggedIn: d}))}} /> : <Login logInState={d => {this.setState(prev => ({...prev, isLoggedIn: d}))}}/>}
            </div>
        )
    }
}

export default User