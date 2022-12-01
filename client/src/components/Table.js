import { Component } from 'react'
import PropTypes from 'prop-types'

class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: false
        }
    }

    handleOnChange = () => {
        this.setState(prev => ({...prev, input: !prev.input}), this.sendData)
    }

    sendData = () => {
        if (this.state.input) {this.props.data(this.props.id)}
    }

    render() {
        var classes = ['table']
        const seatID = this.props.id.toString()
        classes.push(`seats${seatID}`)
        return (
            <div className={classes.join(' ')} onClick={this.handleOnChange} style={{backgroundColor: this.state.input ? '#C8349B' : '#34CE9B'}}>
                <div>Table {this.props.id}<br />{this.props.seatAmount} seats</div>
            </div>
            // <label>{this.props.label}:<br />
            //     <input
            //         disabled={this.props.disabled}
            //         required={this.props.req}
            //         autoComplete='off'
            //         type={this.props.type}
            //         value={this.props.editmode ? this.props.profilevalue : this.state.input}
            //         onChange={this.handleOnChange}
            //         placeholder={this.props.placeholder}/>
            // </label>
        )
    }
}

Table.defaultProps = {
    key: 0,
    id: 0
}

Table.propTypes = {
    
}

export default Table