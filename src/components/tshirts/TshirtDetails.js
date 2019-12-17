import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { cartAddRemove } from '../../store/actions/CartAddRemove';

const TshirtDetails = (props) => {
    const { auth, profile, tshirt, cartAddRemove } = props;
    if(!auth.uid) return <Redirect to='/login' />
    const currentTshirtId = props.history.location.pathname.toString().split('/')[2];
    const isTshirtInCart = profile.cart ? profile.cart.includes(currentTshirtId) : null;

    const handleRenewCart = (e) => {
        e.preventDefault();
        cartAddRemove(currentTshirtId);
    }

    if(tshirt === null)
        return <p></p>

    return (
        <div className="row tshirt-details">
            <div className="col s12 m6 offset-m5">
                <img src={tshirt.imgUrl} height="427" width="320"/>
                <div className="row">
                    <p className="tshirt-details-name col s4 m2">{tshirt.name}</p>
                    <p className="tshirt-details-price col s4 m2 offset-m1">{tshirt.price}лв</p>
                </div>
                <button className="btn green lighten-1 add-to-cart-btn" onClick={handleRenewCart}>{isTshirtInCart ? 'Премахни от количката' : 'Добави в количката'}</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const tshirts = state.firestore.data.tshirts;
    const tshirt = tshirts ? tshirts[id] : null
    return {
        tshirt: tshirt,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cartAddRemove: (tshirtId) => dispatch(cartAddRemove(tshirtId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'tshirts' }
    ])
)(TshirtDetails)
