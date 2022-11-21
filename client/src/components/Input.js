import { useState } from 'react'

const Input = ({Label, Type, passData}) => {
    const [input, setInput] = useState('')
    return (
        <label>{Label}:<br />
            <input
                autoComplete='off'
                type={Type}
                value={input}
                onChange={(event) => {setInput(event.target.value); passData(input)}}
                placeholder={Label}/>
        </label>
    )
}

export default Input
