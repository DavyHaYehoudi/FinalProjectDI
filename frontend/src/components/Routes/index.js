import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Navbar from '../Navbar';

const index = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element = { <Home /> } />
                <Route path='/profil' element = { <Profil /> } />
                <Route path=':slug' element = { <Home /> } />
            </Routes>
        </Router>
    );
};

export default index; 