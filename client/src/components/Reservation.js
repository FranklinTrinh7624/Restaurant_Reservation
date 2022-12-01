import React, { Component } from 'react'
import Navbar from './Navbar'
import './styles/Reservation.css'
import axios from 'axios'
import Input from './Input'
import Table from './Table'
import { Link } from 'react-router-dom'

class Reservation extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            tables: [
                {id: "1", seats: "2"},
                {id: "2", seats: "4"},
                {id: "3", seats: "2"},
                {id: "4", seats: "6"},
                {id: "5", seats: "4"},
                {id: "6", seats: "2"},
                {id: "7", seats: "6"},
                {id: "8", seats: "2"},
                {id: "9", seats: "6"},
                {id: "10", seats: "2"},
                {id: "11", seats: "2"}
            ],
            tableSelected: '',
            registerPrompt: false
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
        //alert(`Table ${this.state.tableSelected} Picked`)
        if (!this.state.isLoggedIn && !this.state.registerPrompt && this.state.tableSelected !== '') {this.setState(prev => ({...prev, registerPrompt: true}))}
        // send to backend the table id of the selected table
    }

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
                <div>
                    <form>
                        
                    </form>
                </div>
            </div>
        )
    }
}

export default Reservation

