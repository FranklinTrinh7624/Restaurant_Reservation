import { useState } from 'react'
import './styles/Register.css'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [mailaddress, setMailaddress] = useState('')
    const [billaddress, setBilladdress] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault();
        // fetch authentication
        alert(`Username: ${username}\nPassword: ${password}`)
    }
    return (
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

            <label>Name:
                <input
                    autoComplete='off'
                    type='text'
                    value={name}
                    onChange={(event) => {setName(event.target.value)}}
                    placeholder='Name'/>
            </label>
            <button type='submit'>Register</button>
        </form>
    )
}

export default Register
