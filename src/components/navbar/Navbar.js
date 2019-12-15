import React from 'react';
import { Link } from 'react-router-dom';
import LoggedLinks from './LoggedLinks';
import GuestLinks from './GuestLinks';
import { connect } from 'react-redux';

const Navbar = (props) => {
    const { auth } = props;
    const links = auth.uid ? <LoggedLinks /> : <GuestLinks />
    return (
        <nav className="nav-wrapper grey darken-4">
            <div className="container">
                <Link to='/' className="brand-logo">Мъжки Тениски</Link>
                { links }
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    console.log("redux bazata", state);
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(Navbar);