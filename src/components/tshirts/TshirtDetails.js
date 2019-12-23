import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { cartAddRemove } from '../../store/actions/CartAddRemove';

class TshirtDetails extends Component {
    state = {
        error: '',
        sizeSelected: ''
    }
    render() {
        const { auth, profile, tshirt, cartAddRemove } = this.props;
        if(!auth.uid) return <Redirect to='/login' />
        const currentTshirtId = this.props.history.location.pathname.toString().split('/')[2];
        let tshirtIdWithoutSize = currentTshirtId.substring(0, currentTshirtId.length - 1);
        //let sizeSelected = '';
        const isTshirtInCart = profile.cart ? profile.cart.includes(tshirtIdWithoutSize + this.state.sizeSelected) : null;

        const handleRenewCart = (e) => {
            e.preventDefault();
            if(this.state.sizeSelected === '') {
                console.log('No Size Selected');
            }
            else {
                console.log('idToAddRemove', tshirtIdWithoutSize + ' ' + this.state.sizeSelected);
                cartAddRemove(tshirtIdWithoutSize + this.state.sizeSelected);
            }
        }

        const handleSizeSelect = (e) => {
            e.preventDefault();
            console.log(e.target);
            var sizeButtons = e.target.parentNode.parentNode.children
            for (let btn of sizeButtons) {
                btn.className = "btn grey btn-secondary";
            }
            this.setState({
                ...this.state,
                sizeSelected: e.target.id
            }) 
            console.log('sizeSelected', this.state.sizeSelected)
            e.target.parentNode.className = "btn green lighten-1 btn-secondary";
        }

        if(tshirt === null)
            return <p></p>
        
        return (
            <div className="tshirt-details">
                <img src={tshirt.imgUrl} height="427" width="320"/>
                <div className="tshirt-details-text">
                    <p className="tshirt-details-name">{tshirt.name}</p>
                    <p className="tshirt-details-price">{tshirt.price}лв</p>
                </div>

                <form onChange={handleSizeSelect}>
                    <div className="btn-group btn-group-toggle size-buttons" data-toggle="buttons">
                        <label className="btn btn-secondary grey">
                            <input type="radio" name="group1" id="S" /> S
                        </label>
                        <label className="btn grey btn-secondary">
                            <input type="radio" name="group1" id="M" /> M
                        </label>
                        <label className="btn grey btn-secondary">
                            <input type="radio" name="group1" id="L" /> L
                        </label>
                        <label className="btn grey btn-secondary">
                            <input type="radio" name="group1" id="XL" /> XL
                        </label>
                    </div>
                </form>      
                
                <button className="btn green lighten-1 add-to-cart-btn" onClick={handleRenewCart}>{isTshirtInCart ? 'Премахни от количката' : 'Добави в количката'}</button>
            </div>
        )
    }
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
