import React, { Component } from 'react'
import Navbar from './Navbar'

class Reservation extends Component {
    render() {
        return (
            <div className='Reservation'>
                <Navbar loginState={true}/>
            </div>
        )
    }
}

export default Reservation

