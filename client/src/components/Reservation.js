import React, { Component } from 'react'
import Navbar from './Navbar'
import './styles/Reservation.css'
import axios from 'axios'
import Input from './Input'
import Table from './Table'
import { Link } from 'react-router-dom'
import Options from './jsons/Options.json'

class Reservation extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            tables: [
                {id: "1", seats: "4"},
                {id: "2", seats: "2"},
                {id: "3", seats: "6"},
                {id: "4", seats: "4"},
                {id: "5", seats: "4"},
                {id: "6", seats: "2"},
                {id: "7", seats: "6"},
                {id: "8", seats: "6"},
                {id: "9", seats: "2"},
                {id: "10", seats: "8"},
                {id: "11", seats: "6"}
            ],
            tableSelected: '',
            registerPrompt: false,
            paymentChoice: '',
            isHoliday: false,
            formData: {
                firstname: '',
                lastname: '',
                phone: '',
                email: '',
                date: '',
                numGuest: '',
                num: '',
                exp: '',
                ccv: ''
            },
            tableSelectedArray: [],
            guessMode: false
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

    handleSubmit = () => {
        //alert(`Table ${this.state.tableSelectedArray} Picked`)
        if (!this.state.isLoggedIn && !this.state.registerPrompt && this.state.tableSelected !== '' && !this.state.guessMode) {this.setState(prev => ({...prev, registerPrompt: true, guessMode: true}))}
        this.setState(prev => ({...prev, tableSelectedArray: [...prev.tableSelectedArray, this.state.tableSelected]}))
    }

    submitForm = () => {
        //alert(`Table ${this.state.tableSelectedArray} Picked`)
        //alert(typeof(this.state.formData.date))
        var tableSelected = this.state.tableSelectedArray.toString()
        axios({
            method: "POST",
            data: {
                reFirstn: this.state.formData.firstname, //req.body in front
                reLastn: this.state.formData.lastname,
                rePhone: this.state.formData.phone,
                reEmail: this.state.formData.email,
                reDate: this.state.formData.date,
                reGuest: this.state.formData.numGuest,
                reTable: tableSelected,
                creditNum: this.state.formData.num,
                creditExp: this.state.formData.exp,
                creditCCV: this.state.formData.ccv,
            },
            withCredentials: true,
            url: "http://localhost:5000/api/reservation"
        }).then((res) => {
            if(res.data.error) {
                alert(res.data.error);
            }
            else {
                alert(res.data.msg);
            }
        })
    }

    paymentOptionList = Options.paymentOptions.map((opt, key) => (
        <option key={key} values={`${opt.code}`}>{opt.type}</option>
    ))

    render() {
        return (
            <div className='Reservation'>
                <Navbar loginState={true} transparentbg={true}/>
                <div className='tables-container'>
                    <div className='tables'>
                        {this.state.tables.map((t, i) => {
                            return <Table seatAmount={t.seats} id={t.id} key={i} selected={this.state.tableSelected} data={d => this.setState(prev => ({...prev, tableSelected: d}))}/>
                        })}
                    </div>
                    <button onClick={this.handleSubmit} className='btn1'>Book Selected Table</button>
                </div>
                {this.state.registerPrompt ? <div className='alert-register'>
                    <div className='alert-container'>
                        <div>You are currently booking a guest. Do you want to register?</div>
                        <div className='btn-group'>
                            <Link to={'/user'} ><button className='btn2'>Yes</button></Link>
                            <button className='btn2' onClick={() => this.setState(prev => ({...prev, registerPrompt: false}))}>No</button>
                        </div>
                    </div>
                </div> : <></>}
                <div className='holiday-charge-form'>
                    <form onSubmit={this.submitForm}>
                        {this.state.isLoggedIn ? <></> : <>
                            <Input label={'First Name'} type={'text'} placeholder={'First name'} data={d => this.setState(prev => ({...prev, formData: {...prev.formData, firstname: d}}))}/>
                            <Input label={'Last Name'} type={'text'} placeholder={'Last name'} data={d => this.setState(prev => ({...prev, formData: {...prev.formData, lastname: d}}))}/>
                        </>}
                        <Input label={'Phone Number'} type={'number'} placeholder={'Phone number'} data={d => this.setState(prev => ({...prev, formData: {...prev.formData, phone: d}}))}/>
                        <Input label={'Email'} type={'text'} placeholder={'Email address'} data={d => this.setState(prev => ({...prev, formData: {...prev.formData, email: d}}))}/>
                        <Input label={'Date'} type={'date'} placeholder={'Date to reserve for'} data={d => this.setState(prev => ({...prev, formData: {...prev.formData, date: d}}))}/>
                        <Input label={'Number of Guess'} type={'number'} placeholder={'Number of guess'} data={d => this.setState(prev => ({...prev, formData: {...prev.formData, numGuest: d}}))}/>
                        {this.state.isHoliday ?
                            <>
                                <h3 style={{marginTop: '3rem'}}>Due to high traffic, a hold fee of $10 will be required.</h3>
                                <Input label={'Card Number'} type={'number'} placeholder={'Card number'} data={d => this.setState(prev => ({...prev, formData: {...prev.formData, num: d}}))} />
                                <Input label={'Expiration'} type={'text'} placeholder={'MM/YY'} data={d => this.setState(prev => ({...prev, formData: {...prev.formData, exp: d}}))} />
                                <Input label={'CCV'} type={'number'} placeholder={'CCV'} data={d => this.setState(prev => ({...prev, formData: {...prev.formData, ccv: d}}))} />
                            </> : <></>
                        }
                        <button type='submit' className='btn1'>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Reservation

