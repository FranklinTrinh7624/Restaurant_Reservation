import { useState } from 'react'
import './styles/Login.css'
import Register from './Register'

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
                    <label>Username:
                        <input
                            autoComplete='off'
                            type='text'
                            value={username} 
                            onChange={(event) => {setUsername(event.target.value)}}
                            placeholder='Username'/>
                    </label>

                    <label>Password:
                        <input
                            autoComplete='off'
                            type='password'
                            value={password}
                            onChange={(event) => {setPassword(event.target.value)}}
                            placeholder='Password'/>
                    </label>
                    <button type='submit'>Sign In</button>
                </form>
                }
                <button onClick={() => setRegisterState(!registerState)}>{registerState ? 'Back to log in' : 'New user? Register here!'}</button>
            </div>
        </div>
    )
}

export default Login
