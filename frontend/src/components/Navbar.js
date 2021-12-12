import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import icone from '../imagesFrontend/icon.png'
import { UidContext } from './AppContext';
import login_icon from '../imagesFrontend/login_icon.svg'
import Logout from './Log/Logout';
import { useSelector } from "react-redux";


const Navbar = () => {
const uid = useContext(UidContext)
const userData = useSelector( state => state.userReducer )

    return (
        <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <NavLink exact to='/'>
                          <div className='logo'>
                              <img src= { icone } alt='icon'/>
                              <h3>DonkeyPost</h3>
                          </div>
                    </NavLink>
                </div>
                { uid ? (
                    <ul>
                        <li></li>
                        <li className='welcome'>
                            <NavLink exact to='/profil'>
                                <h5>Welcome { userData.pseudo }</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <NavLink exact to='/profil'>
                                <img src= { login_icon } alt='login'/>
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;