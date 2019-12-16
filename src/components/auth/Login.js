import React, { Component } from 'react'
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state);
    }
    render() {
        const { auth } = this.props;
        if(auth.uid) return <Redirect to='/' />

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p className="register-login-text">Login</p>
                    <div className="register-login-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="register-login-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="register-login-field">
                        <button className="btn green lighten-1 register-login-btn">Login</button>
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
        login: (creds) => dispatch(login(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
