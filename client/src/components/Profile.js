import { Component } from 'react'
import Input from './Input'
import axios from 'axios'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: {
                firstname: 'filler data',
                lastname: 'filler data',
                mailingAddress: 'filler data',
                billingAddress: 'filler data',
                preferredDiner: 69,
                points: 69,
                paymentMethod: 'filler data'
            },
            watchMode: true
        }
    }

    componentDidMount = () => {
        //fetch axios here
        //then assign them to this.state, I'll do the assignment - Lewis
        axios({
            method: "get",
            withCredentials: true,
            url: "http://localhost:5000/isAuth",
        }).then((res) => {
            if(res.data.error){
                alert(res.data.error);
            }
            else {
                this.setState(prev => ({...prev, profile: {...prev.profile}}))
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        // axios to edit profile here
        // use this.state.profile
    }

    logoutRequest = () => {
        axios({
            method: "post",
            withCredentials: true,
            url: "http://localhost:5000/logout",
        }).then((res) => {
            if(res.data.error){
                alert(res.data.error);
            }
            else {
                this.setState(prev => ({...prev, profile: {...prev.profile}}))
            }
        });
    }

    render() {
        return (
            <div className='Profile'>
                <div className='container'>
                    <h1>Profile</h1>
                    <form onSubmit={this.handleSubmit}>
                        <Input editmode={true} disabled={this.state.watchMode} profilevalue={this.state.profile.firstname} label={'First Name'} type={'text'} placeholder={'First name'} data={d => this.setState(prev => ({...prev, profile: {...prev.profile, firstname: d}}))}/>
                        <Input editmode={true} disabled={this.state.watchMode} profilevalue={this.state.profile.lastname} label={'Last Name'} type={'text'} placeholder={'Last name'} data={d => this.setState(prev => ({...prev, profile: {...prev.profile, lastname: d}}))}/>
                        <Input editmode={true} disabled={this.state.watchMode} profilevalue={this.state.profile.mailingAddress} label={'Mailing Address'} type={'text'} placeholder={'Mailing address'} data={d => this.setState(prev => ({...prev, profile: {...prev.profile, mailingAddress: d}}))}/>
                        <Input editmode={true} disabled={this.state.watchMode} profilevalue={this.state.profile.billingAddress} label={'Billing Address'} type={'text'} placeholder={'Billing address'} data={d => this.setState(prev => ({...prev, profile: {...prev.profile, billingAddress: d}}))}/>
                        <Input editmode={true} disabled={this.state.watchMode} profilevalue={this.state.profile.preferredDiner} label={'Preferred Number of Diners'} type={'number'} placeholder={'Preferred number of diners'} data={d => this.setState(prev => ({...prev, profile: {...prev.profile, preferredDiner: d}}))}/>
                        <Input editmode={true} disabled={true} profilevalue={this.state.profile.points} label={'Points'} type={'number'} placeholder={''} data={d => this.setState(prev => ({...prev, profile: {...prev.profile, points: d}}))}/>
                        <Input editmode={true} disabled={this.state.watchMode} profilevalue={this.state.profile.paymentMethod} label={'Payment Method'} type={'text'} placeholder={'Payment method'} data={d => this.setState(prev => ({...prev, profile: {...prev.profile, paymentMethod: d}}))}/>
                        <button className='btn1' type='submit' disabled={this.state.watchMode}>Save Changes</button>
                    </form>
                    <>
                        <button className='btn2' onClick={() => {this.setState(prev => ({...prev, watchMode: !prev.watchMode}))}}>{this.state.watchMode ? 'Edit Profile' : 'Cancel Edit'}</button>
                        <button className='btn2' onClick={this.logoutRequest}>Log Out</button>
                    </>
                </div>
            </div>
        )
    }
}

export default Profile
