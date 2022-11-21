import { useState } from 'react'
import Input from './Input'

const Register = () => {
    const [data, setData] = useState({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        mailaddress: '',
        billaddress: ''
    })
    const handleSubmit = (event) => {
        event.preventDefault();
        // fetch authentication
        alert(`Username: ${data.username}\nPassword: ${data.password}\nFirstname: ${data.firstname}\nLastname: ${data.lastname}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input Label={'Username'} Type={'text'} passData={(d) => {setData(prevData => ({...prevData, username: d}))}}/>
            <Input Label={'Password'} Type={'password'} passData={(d) => {setData(prevData => ({...prevData, password: d}))}}/>
            <Input Label={'First Name'} Type={'text'} passData={(d) => {setData(prevData => ({...prevData, firstname: d}))}}/>
            <Input Label={'Last Name'} Type={'password'} passData={(d) => {setData(prevData => ({...prevData, lastname: d}))}}/>
            
            <button type='submit' className='btn1'>Register</button>
        </form>
    )
}

export default Register
