import { useState } from 'react'
import Register from './Register'
import Input from './Input'
import axios from 'axios'

const Login = () => {
    //this is to switch to register form
    const [registerState, setRegisterState] = useState(false)

    const [logUsername, setLogUsername] = useState('')
    const [logPassword, setLogPassword] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault();
        // fetch authentication
        axios({
            method: "POST",
            data: {logUsername, logPassword},
            withCredentials: true,
            url: "http://localhost:5000/api/login"
        }).then((res) => {
            if(res.data.error){
                alert(res.data.error);
            }
            //else do something about session(token stuff?)
            else {
                alert(res.data.msg);
            }
        });
        //alert(`Username: ${logUsername}\nPassword: ${logPassword}`)
    }
    return (
        <div className='Login'>
            <div className='container'>
                <h1>You are not logged in.</h1>
                {registerState ? <Register /> :
                <form onSubmit={handleSubmit}>
                    <Input Label={'Username'} Type={'text'} passData={(d) => {setLogUsername(d)}}/>
                    <Input Label={'Password'} Type={'password'} passData={(d) => {setLogPassword(d)}}/>
                    <button type='submit' className='btn1'>Sign In</button>
                </form>
                }
                <button className='btn2' onClick={() => setRegisterState(!registerState)}>{registerState ? 'Back to log in' : 'New user? Register here!'}</button>
            </div>
        </div>
    )
}

export default Login
