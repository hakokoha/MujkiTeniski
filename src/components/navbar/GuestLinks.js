import React from 'react';
import { NavLink } from 'react-router-dom';

const GuestLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to='/'>Регистрирай се</NavLink></li>
            <li><NavLink to='/'>Влез в профила</NavLink></li>
        </ul>
    )
}

export default GuestLinks;