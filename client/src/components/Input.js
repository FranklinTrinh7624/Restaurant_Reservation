import { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: ''
        }
    }

    handleOnChange = (e) => {
        this.setState(prev => ({...prev, input: e.target.value}), this.sendData)
    }

    sendData = () => {
        this.props.data(this.state.input)
    }

    render() {
        return (
            <label>{this.props.label}:<br />
                <input
                    required={this.props.req}
                    autoComplete='off'
                    type={this.props.type}
                    value={this.state.input}
                    onChange={this.handleOnChange}
                    placeholder={this.props.placeholder}/>
            </label>
        )
    }
}

Input.defaultProps = {
    label: '',
    type: '',
    placeholder: '',
    data: '',
    req: true
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    req: PropTypes.bool
}

export default Input