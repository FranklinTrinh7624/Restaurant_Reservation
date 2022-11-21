import { Fragment, Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home';
import User from './components/User'

class App extends Component {
    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <Navbar />
                </header>
                <Routes>
                    <Fragment><Route path="/" element={<Home />} /></Fragment>
                    <Fragment><Route path="/user" element={<User />} /></Fragment>
                </Routes>
            </div>
        )
    }
}

export default App;
