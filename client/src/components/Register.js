import { Component } from 'react'
import Options from './jsons/Options.json'
import Input from './Input'
import axios from 'axios'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: {
                username: '',
                password: '',
                firstname: '',
                lastname: '',
                mailaddress: '',
                billaddress: '',
                numOfPeople: '',
                paymentChoice: ''
            },
            tempMailAdd: {
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: '',
                country: ''
            },
            tempBillAdd: {
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: '',
                country: ''
            },
            billSameAsMail: true
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const mailAddressStr = `${this.state.tempMailAdd.address1}, ${this.state.tempMailAdd.address2}, ${this.state.tempMailAdd.city}, ${this.state.tempMailAdd.state}, ${this.state.tempMailAdd.zip}, ${this.state.tempMailAdd.country}`
        const billAddressStr = this.state.billSameAsMail ? mailAddressStr : `${this.state.tempBillAdd.address1}, ${this.state.tempBillAdd.address2}, ${this.state.tempBillAdd.city}, ${this.state.tempBillAdd.state}, ${this.state.tempBillAdd.zip}, ${this.state.tempBillAdd.country}`
        this.setState(prev => ({...prev, formData: {...prev.formData, mailaddress: mailAddressStr, billaddress: billAddressStr}}), this.axiosRequest)
    }

    axiosRequest = () => {
        console.log(this.state.formData)    // this console log is just for testing
        // use this.state.formData
        // so username would be this.state.formData.username and so on

    }

    countryOptionList = Options.countryOptions.map((opt, key) => (
        <option key={key} values={`${opt.code}`}>{opt.name}</option>
    ))

    paymentOptionList = Options.paymentOptions.map((opt, key) => (
        <option key={key} values={`${opt.code}`}>{opt.type}</option>
    ))

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <Input label={'Username'} type={'text'} placeholder={'Username'} data={d => this.setState(prev => ({...prev, formData: {...prev.formData, username: d}}))}/>
                <Input label={'Password'} type={'password'} placeholder={'Password'} data={d => this.setState(prev => ({...prev, formData: {...prev.formData, password: d}}))}/>
                <Input label={'First Name'} type={'text'} placeholder={'First name'} data={d => this.setState(prev => ({...prev, formData: {...prev.formData, firstname: d}}))}/>
                <Input label={'Last Name'} type={'text'} placeholder={'Last name'} data={d => this.setState(prev => ({...prev, formData: {...prev.formData, lastname: d}}))}/>

                <label className='form-section'><br /><i>Mailing Address</i><br /></label>
                <Input label={'Address Line 1'} type={'text'} placeholder={'Street address, P.O. box, company name, c/o'} data={d => this.setState(prev => ({...prev, tempMailAdd: {...prev.tempMailAdd, address1: d}}))}/>
                <Input req={false} label={'Address Line 2'} type={'text'} placeholder={'Appartment, suite, unit, building, floor, etc.'} data={d => this.setState(prev => ({...prev, tempMailAdd: {...prev.tempMailAdd, address2: d}}))}/>
                <Input label={'City'} type={'text'} placeholder={'City'} data={d => this.setState(prev => ({...prev, tempMailAdd: {...prev.tempMailAdd, city: d}}))}/>
                <Input label={'State/Province/Region'} type={'text'} placeholder={'State/Province/Region'} data={d => this.setState(prev => ({...prev, tempMailAdd: {...prev.tempMailAdd, state: d}}))}/>
                <Input label={'ZIP/Postal Code'} type={'number'} placeholder={'ZIP/Postal code'} data={d => this.setState(prev => ({...prev, tempMailAdd: {...prev.tempMailAdd, zip: d}}))}/>
                <label>Country<br />
                    <select
                        required
                        value={this.state.tempMailAdd.country}
                        onChange={(e)=>this.setState(prev => ({...prev, tempMailAdd: {...prev.tempMailAdd, country: e.target.value}}))}>
                            <option value="" disabled>Select A Country</option>
                            {this.countryOptionList}
                    </select>
                </label>

                <label className='form-section'><br /><i>Billing Address</i><br /></label>
                <label>
                    <input
                        type='checkbox'
                        checked={this.state.billSameAsMail}
                        onChange={e => {this.setState(prev => ({billSameAsMail: !prev.billSameAsMail}))}}/>
                        Save mailing address as billing address<br />
                </label>
                {this.state.billSameAsMail ? <></> :
                    <>
                        <Input label={'Address Line 1'} type={'text'} placeholder={'Street address, P.O. box, company name, c/o'} data={d => this.setState(prev => ({...prev, tempBillAdd: {...prev.tempBillAdd, address1: d}}))}/>
                        <Input req={false} label={'Address Line 2'} type={'text'} placeholder={'Appartment, suite, unit, building, floor, etc.'} data={d => this.setState(prev => ({...prev, tempBillAdd: {...prev.tempBillAdd, address2: d}}))}/>
                        <Input label={'City'} type={'text'} placeholder={'City'} data={d => this.setState(prev => ({...prev, tempBillAdd: {...prev.tempBillAdd, city: d}}))}/>
                        <Input label={'State/Province/Region'} type={'text'} placeholder={'State/Province/Region'} data={d => this.setState(prev => ({...prev, tempBillAdd: {...prev.tempBillAdd, state: d}}))}/>
                        <Input label={'ZIP/Postal Code'} type={'number'} placeholder={'ZIP/Postal code'} data={d => this.setState(prev => ({...prev, tempBillAdd: {...prev.tempBillAdd, zip: d}}))}/>
                        <label>Country<br />
                            <select
                                required
                                value={this.state.tempBillAdd.country}
                                onChange={(e)=>this.setState(prev => ({...prev, tempBillAdd: {...prev.tempBillAdd, country: e.target.value}}))}>
                                    <option value="" disabled>Select A Country</option>
                                    {this.countryOptionList}
                            </select>
                        </label>
                    </>
                }

                <label>Choose Your Preferred Payment Method:<br />
                    <select
                        required
                        value={this.state.formData.paymentChoice}
                        onChange={(e)=>this.setState(prev => ({...prev, formData: {...prev.formData, paymentChoice: e.target.value}}))}>
                            <option value="" disabled>Select A Payment Method</option>
                            {this.paymentOptionList}
                    </select>
                </label>

                <button type='submit' className='btn1' id='register-button'>Register</button>
            </form>
        )
    }
}

export default Register
