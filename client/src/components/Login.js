import { useState } from 'react'
import Register from './Register'
import Input from './Input'

const Login = () => {
    //this is to switch to register form
    const [registerState, setRegisterState] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault();
        // fetch authentication
        alert(`Username: ${username}\nPassword: ${password}`)
    }
    return (
        <div className='Login'>
            <div className='container'>
                <h1>You are not logged in.</h1>
                {registerState ? <Register /> :
                <form onSubmit={handleSubmit}>
                    <Input Label={'Username'} Type={'text'} passData={(d) => {setUsername(d)}}/>
                    <Input Label={'Password'} Type={'password'} passData={(d) => {setPassword(d)}}/>
                    <button type='submit' className='btn1'>Sign In</button>
                </form>
                }
                <button className='btn2' onClick={() => setRegisterState(!registerState)}>{registerState ? 'Back to log in' : 'New user? Register here!'}</button>
            </div>
        </div>
    )
}

export default Login
