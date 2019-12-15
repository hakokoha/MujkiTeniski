import React from 'react';
import { NavLink } from 'react-router-dom';

const LoggedLinks = (props) => {
    return (
        <ul className="right">
            <li><NavLink to='/'>Моят профил</NavLink></li>
            <li><NavLink to='/'>Количка</NavLink></li>
        </ul>
    )
}

export default LoggedLinks;