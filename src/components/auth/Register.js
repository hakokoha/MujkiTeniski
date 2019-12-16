import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../../store/actions/authActions'

class Register extends Component {
    state = {
        email: '',
        password: '',
        name: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.register(this.state);
    }
    render() {
        const { auth } = this.props;
        if (auth.uid) return <Redirect to='/' />

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p className="register-login-text">Register</p>
                    <div className="register-login-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" onChange={this.handleChange} />
                    </div>
                    <div className="register-login-field">
                        <label htmlFor="register-email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="register-login-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="register-login-field">
                        <button className="btn green lighten-1 register-login-btn">Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (userInfo) => dispatch(register(userInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
