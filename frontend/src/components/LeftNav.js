import React from 'react';
import { NavLink }  from 'react-router-dom';
import home from '../imagesFrontend/home.svg';
import profil from '../imagesFrontend/profil.svg';


const LeftNav = () => {
    return (
        <div className='left-nav-container'>
            <div className='icons'>
                <div className='icons-bis'>
                    <NavLink   to='/' >
                        <img src= { home } alt='home' width='30px'/>
                    </NavLink>
                    <br/>
                    <NavLink  to='/profil'>
                        <img src={ profil } alt='profil' width='30px'/>
                    </NavLink>
                   
                    <br/>
                </div>
            </div>
        </div>
    );
};

export default LeftNav;