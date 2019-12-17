import React from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/actions/authActions';
import { connect } from 'react-redux';

const LoggedLinks = (props) => {
    return (
        <ul className="right">
            <li><NavLink to='/'>Моят профил</NavLink></li>
            <li><NavLink to='/cart'>Количка{(props.profileCart && props.profileCart.length > 0) ? <span class="new badge" data-badge-caption="продукта">{props.profileCart.length}</span> : null}</NavLink></li>
            <li><a onClick={props.logout}>Отпиши се</a></li>
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        profileCart: state.firebase.profile.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoggedLinks);