import { Fragment, Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import User from './components/User'
import Reservation from './components/Reservation'

class App extends Component {
    render() {
        return (
            <div className='App'>
                <header className='App-header'><img src={require("./components/assets/decoration.png")} alt="banner decoration" width="300" height="200" id='banner'/></header>
                <Routes>
                    <Fragment><Route path="/" element={<Home />} /></Fragment>
                    <Fragment><Route path="/reservation" element={<Reservation />} /></Fragment>
                    <Fragment><Route path="/user" element={<User />} /></Fragment>
                </Routes>
            </div>
        )
    }
}

export default App;
