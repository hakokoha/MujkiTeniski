import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const TshirtDetails = (props) => {
    const { auth, profile } = props;
    if(!auth.uid) return <Redirect to='/login' />

    return (
        <div className="container section project-details">
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(TshirtDetails)
