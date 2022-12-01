import { Component } from 'react'
import Register from './Register'
import Input from './Input'
import axios from 'axios'

class Login extends Component {
    constructor (props) {
        super(props)
        this.state = {
            registerState: false,
            loginState: false,
            logUsername: '',
            logPassword: '',
            authorizedStatus: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        // fetch authentication
        axios({
            method: "POST",
            data: {logUsername: this.state.logUsername, logPassword: this.state.logPassword},
            withCredentials: true,
            url: "http://localhost:5000/api/login"
        }).then((res) => {
            if(res.data.error){
                //alert(res.data.error);
                this.setState(prev => ({...prev, authorizedStatus: false}))
            }
            //else do something about session(token stuff?)
            else {
                //alert(res.data.msg);
                this.setState(prev => ({...prev, loginState: true, authorizedStatus: true}), this.logInState)
            }
        });
        //console.log(logUsername);console.log(logPassword)
    }

    logInState = () => {
        this.props.logInState(this.state.loginState)
    }

    render() {
        return (
            <div className='Login'>
                <div className='container'>
                    <h1>{this.state.registerState ? 'Register' : this.state.loginState ? '' : 'You are not logged in.'}</h1>
                    {this.state.registerState ? <Register /> :
                    <>
                    <div className='alert-text'>{this.state.authorizedStatus ? '' : 'In unauthorized state, please login'}</div>
                    <form onSubmit={this.handleSubmit}>
                        <Input label={'Username'} type={'text'} placeholder={'Username'} data={d => this.setState(prev => ({...prev, logUsername: d}))}/>
                        <Input label={'Password'} type={'password'} placeholder={'Password'} data={d => this.setState(prev => ({...prev, logPassword: d}))}/>
                        <button type='submit' className='btn1'>Sign In</button>
                    </form>
                    </>
                    }
                    <button className='btn2' onClick={() => this.setState(prev => ({...prev, registerState: !prev.registerState}))}>{this.state.registerState ? 'Back to log in' : 'New user? Register here!'}</button>
                </div>
            </div>
        )
    }
}

export default Login
