import React from 'react';
import { NavLink } from 'react-router-dom';

const GuestLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to='/register'>Регистрирай се</NavLink></li>
            <li><NavLink to='/login'>Влез в профила</NavLink></li>
        </ul>
    )
}

export default GuestLinks;