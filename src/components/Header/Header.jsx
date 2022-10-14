import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div>
            <ul className="menu">
                <li className="munu-li">
                    <NavLink rel="noopener noreferrer" to='/login' className="menu-link">Login</NavLink>
                </li>
                <li className="munu-li">
                    <NavLink rel="noopener noreferrer" to='/forms' className="menu-link">Register</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Header;