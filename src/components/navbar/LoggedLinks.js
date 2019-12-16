import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/actions/authActions';
import { connect } from 'react-redux';

const LoggedLinks = (props) => {
    return (
        <ul className="right">
            <li><NavLink to='/'>Моят профил</NavLink></li>
            <li><NavLink to='/'>Количка</NavLink></li>
            <li><a onClick={props.logout}>Отпиши се</a></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(LoggedLinks);